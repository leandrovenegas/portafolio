'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import supabase from '@/lib/supabase';

function toInlineStyle(styleObj) {
  if (!styleObj) return {};
  const s = {};
  if (styleObj.fontSize)       s.fontSize       = `${styleObj.fontSize}px`;
  if (styleObj.color)          s.color          = styleObj.color;
  if (styleObj.fontWeight)     s.fontWeight     = styleObj.fontWeight;
  if (styleObj.fontStyle)      s.fontStyle      = styleObj.fontStyle;
  if (styleObj.fontFamily)     s.fontFamily     = styleObj.fontFamily;
  if (styleObj.textAlign)      s.textAlign      = styleObj.textAlign;
  if (styleObj.textDecoration) s.textDecoration = styleObj.textDecoration;
  if (styleObj.textTransform && styleObj.textTransform !== 'none')
    s.textTransform = styleObj.textTransform;
  if (styleObj.letterSpacing !== undefined && styleObj.letterSpacing !== '')
    s.letterSpacing = `${styleObj.letterSpacing}em`;
  if (styleObj.lineHeight !== undefined && styleObj.lineHeight !== '') {
    s.lineHeight = styleObj.lineHeight;
    if (Number(styleObj.lineHeight) < 0) {
      s.marginTop  = `${styleObj.lineHeight}em`;
      s.lineHeight = 'normal';
    }
  }
  if (styleObj.textIndent !== undefined && styleObj.textIndent !== '')
    s.textIndent = `${styleObj.textIndent}px`;
  if (styleObj.paddingTop !== undefined && styleObj.paddingTop !== '')
    s.paddingTop = `${styleObj.paddingTop}px`;
  if (styleObj.paddingBottom !== undefined && styleObj.paddingBottom !== '')
    s.paddingBottom = `${styleObj.paddingBottom}px`;
  return s;
}

/**
 * AvatarTextSection
 *
 * Props visuales:
 *   title, avatarSrc, avatarAlt, paragraphs, description,
 *   showAccentBar, _styles, forceBp, elementOrder
 *
 * Props de edición (opcionales — solo en modo Editor Visual):
 *   onPropChange(field, value)  — callback del editor; su presencia activa
 *                                 el modo inline. Permite bidireccionalidad:
 *                                 panel lateral → canvas y canvas → panel.
 *   pageVersionId               — UUID de la fila en `page_versions`.
 *   componentId                 — ID del componente dentro del array.
 *   allComponents               — Array completo de componentes de la página.
 *
 * Bidireccionalidad:
 *   - Panel lateral → canvas: useEffect sincroniza innerText del DOM cuando
 *     el prop cambia desde afuera (panel) y el campo no está siendo editado.
 *   - Canvas → panel: onBlur llama a onPropChange y persiste en Supabase.
 */
export default function AvatarTextSection({
  title,
  avatarSrc,
  avatarAlt,
  paragraphs,
  description,
  showAccentBar = true,
  _styles,
  forceBp = null,
  elementOrder,
  // ── CMS / Editor props ──
  onPropChange  = null,
  pageVersionId = null,
  componentId   = null,
  allComponents = null,
}) {
  // ── Breakpoint ──────────────────────────────────────────────────────────
  const [bp, setBp] = useState(forceBp || 'mobile');

  useEffect(() => {
    if (forceBp) { setBp(forceBp); return; }
    const check = () => {
      const w = window.innerWidth;
      setBp(w >= 1024 ? 'desktop' : w >= 768 ? 'tablet' : 'mobile');
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [forceBp]);

  const fieldStyle = (fieldName) => {
    if (!_styles || !_styles[fieldName]) return {};
    return toInlineStyle(_styles[fieldName][bp]);
  };

  // ── Editor mode ──────────────────────────────────────────────────────────
  const isEditable = typeof onPropChange === 'function';

  // Refs para los elementos contentEditable
  const titleRef       = useRef(null);
  const descriptionRef = useRef(null);

  // Rastrear qué campo está siendo editado activamente para no sobrescribir
  // el DOM mientras el usuario escribe (el panel podría re-renderizar props)
  const editingField = useRef(null);

  /**
   * Sincronización Panel → Canvas
   * Cuando el prop cambia desde el panel lateral, actualiza el DOM del
   * elemento contentEditable SOLO si ese campo no está siendo editado.
   */
  useEffect(() => {
    if (!isEditable) return;
    if (titleRef.current && editingField.current !== 'title') {
      const domText = titleRef.current.innerText;
      const propText = title ?? '';
      if (domText !== propText) titleRef.current.innerText = propText;
    }
  }, [title, isEditable]);

  useEffect(() => {
    if (!isEditable) return;
    const propText = description !== undefined
      ? description
      : (paragraphs ? paragraphs.join('\n\n') : '');
    if (descriptionRef.current && editingField.current !== 'description') {
      const domText = descriptionRef.current.innerText;
      if (domText !== propText) descriptionRef.current.innerText = propText;
    }
  }, [description, paragraphs, isEditable]);

  // ── Persistencia Supabase ────────────────────────────────────────────────
  const [saving,     setSaving]     = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // null | 'ok' | 'error'
  const saveTimer = useRef(null);

  const persistToSupabase = useCallback(async (field, value) => {
    if (!pageVersionId || !componentId || !allComponents) return;

    setSaving(true);
    setSaveStatus(null);
    clearTimeout(saveTimer.current);

    try {
      const updatedComponents = allComponents.map((comp) => {
        if (comp.id !== componentId) return comp;
        return { ...comp, props: { ...comp.props, [field]: value } };
      });

      const { error } = await supabase
        .from('page_versions')
        .update({ components: updatedComponents })
        .eq('id', pageVersionId);

      if (error) throw error;
      setSaveStatus('ok');
    } catch (err) {
      console.error('[AvatarTextSection] Error al guardar en Supabase:', err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
      saveTimer.current = setTimeout(() => setSaveStatus(null), 2000);
    }
  }, [pageVersionId, componentId, allComponents]);

  /**
   * onFocus: marca qué campo está en edición para bloquear sincronización
   * externa (evita que el panel sobrescriba lo que el usuario está escribiendo).
   */
  const handleFocus = useCallback((field) => {
    editingField.current = field;
  }, []);

  /**
   * onBlur: Canvas → Panel + Supabase
   * Lee el innerText del DOM (fuente de verdad tras la edición inline),
   * notifica al panel lateral y persiste.
   */
  const handleBlur = useCallback((field, e) => {
    editingField.current = null;
    const newValue = e.currentTarget.innerText;
    onPropChange?.(field, newValue);
    persistToSupabase(field, newValue);
  }, [onPropChange, persistToSupabase]);

  /** Previene Enter que genere <br>/<div> en contentEditable */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') e.preventDefault();
  }, []);

  // ── Datos ────────────────────────────────────────────────────────────────
  const bodyText = description !== undefined
    ? description
    : (paragraphs ? paragraphs.join('\n\n') : '');
  const order = elementOrder || ['title', 'avatar', 'description'];

  // Estilo de borde para indicar que el campo es editable
  const editableOutline = isEditable
    ? {
        outline: '1.5px dashed rgba(250, 204, 21, 0.55)',
        outlineOffset: '3px',
        borderRadius: '2px',
        cursor: 'text',
        minWidth: '2rem',
      }
    : {};

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <section className="w-full flex flex-col gap-6">

      {/* Indicador de guardado flotante — solo en modo editor */}
      {isEditable && saveStatus && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 9999,
            padding: '0.4rem 0.9rem',
            borderRadius: '0.4rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            background: saveStatus === 'ok' ? '#16a34a' : '#dc2626',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
          }}
        >
          {saving && '⏳ Guardando…'}
          {!saving && saveStatus === 'ok'    && '✓ Guardado'}
          {!saving && saveStatus === 'error' && '✗ Error al guardar'}
        </div>
      )}

      {order.map((key) => {

        // ── Título ──────────────────────────────────────────────────────
        if (key === 'title') {
          return title && (
            <div key="title" className={showAccentBar ? 'border-l-[5px] border-accent pl-5' : ''}>
              <h2
                ref={titleRef}
                data-field="title"
                className="font-display font-bold leading-[1.1] text-white max-w-3xl whitespace-pre-line"
                style={{ ...fieldStyle('title'), ...editableOutline }}
                contentEditable={isEditable}
                suppressContentEditableWarning
                onFocus={isEditable ? () => handleFocus('title') : undefined}
                onBlur={isEditable ? (e) => handleBlur('title', e) : undefined}
                onKeyDown={isEditable ? handleKeyDown : undefined}
              >
                {title}
              </h2>
            </div>
          );
        }

        // ── Avatar ──────────────────────────────────────────────────────
        if (key === 'avatar') {
          return avatarSrc && (
            <div key="avatar" className="flex justify-center my-8">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,204,0,0.15)] transition-all duration-300 hover:scale-105">
                <img
                  src={avatarSrc}
                  alt={avatarAlt || 'Avatar'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        }

        // ── Descripción ─────────────────────────────────────────────────
        if (key === 'description') {
          return bodyText && (
            <div key="description" className="w-full max-w-3xl">
              {isEditable ? (
                /*
                 * En modo editor: un único <p> con contentEditable que
                 * contiene el texto completo (con saltos de línea preservados).
                 * Esto evita el problema de tener múltiples <p> con
                 * contentEditable independientes que luego no se sincronizan.
                 */
                <p
                  ref={descriptionRef}
                  data-field="description"
                  className="font-body text-white/80 text-lg md:text-xl leading-relaxed"
                  style={{
                    ...fieldStyle('description'),
                    ...editableOutline,
                    whiteSpace: 'pre-wrap',
                  }}
                  contentEditable
                  suppressContentEditableWarning
                  onFocus={() => handleFocus('description')}
                  onBlur={(e) => handleBlur('description', e)}
                  onKeyDown={handleKeyDown}
                >
                  {bodyText}
                </p>
              ) : (
                /* Modo público: render normal con múltiples <p> */
                bodyText.split('\n').map((p, i) => {
                  if (!p.trim()) return <br key={i} />;
                  return (
                    <p
                      data-field="description"
                      key={i}
                      className="font-body text-white/80 text-lg md:text-xl leading-relaxed mb-6 last:mb-0"
                      style={fieldStyle('description')}
                    >
                      {p.includes('<Link')
                        ? (
                          <span dangerouslySetInnerHTML={{
                            __html: p.replace(
                              /<Link href='([^']+)' className='([^']+)'>([^<]+)<\/Link>/g,
                              "<a href='$1' class='$2'>$3</a>"
                            )
                          }} />
                        )
                        : p
                      }
                    </p>
                  );
                })
              )}
            </div>
          );
        }

        return null;
      })}
    </section>
  );
}
