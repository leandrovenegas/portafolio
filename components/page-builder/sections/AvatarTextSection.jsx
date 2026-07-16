'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// ─── Helpers ────────────────────────────────────────────────────────────────

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
  if (styleObj.lineHeight !== undefined && styleObj.lineHeight !== '')
    s.lineHeight = styleObj.lineHeight;
  if (styleObj.paddingTop !== undefined && styleObj.paddingTop !== '')
    s.paddingTop = `${styleObj.paddingTop}px`;
  if (styleObj.paddingBottom !== undefined && styleObj.paddingBottom !== '')
    s.paddingBottom = `${styleObj.paddingBottom}px`;
  return s;
}

// Layout inicial de los sub-elementos (12 columnas)
const DEFAULT_INNER_LAYOUT = {
  avatar:      { x: 0, y: 0, w: 4, h: 8 },
  title:       { x: 4, y: 0, w: 8, h: 4 },
  description: { x: 4, y: 4, w: 8, h: 4 },
};

// ─── InnerCanvas: mini react-grid-layout solo en modo editor ────────────────

function InnerCanvas({ slots, layout, onLayoutChange, selectedSubId, setSelectedSubId, isEditorActive }) {
  const { width, containerRef, mounted } = useContainerWidth();
  const [hoveredId, setHoveredId] = useState(null);

  const rglLayout = Object.keys(layout).map((key) => ({
    i: key,
    x: layout[key].x,
    y: layout[key].y,
    w: layout[key].w,
    h: layout[key].h,
    minW: 1,
    minH: 1,
  }));

  return (
    <div ref={containerRef} className="w-full relative" style={{ minHeight: '200px' }}>
      {mounted && (
        <ResponsiveGridLayout
          width={width}
          className="layout"
          layouts={{ desktop: rglLayout, tablet: rglLayout, mobile: rglLayout }}
          breakpoints={{ desktop: 1024, tablet: 768, mobile: 0 }}
          cols={{ desktop: 12, tablet: 12, mobile: 12 }}
          rowHeight={24}
          isDraggable={isEditorActive}
          isResizable={isEditorActive}
          useCSSTransforms
          compactType={null}
          preventCollision={false}
          onLayoutChange={(currentLayout) => {
            if (!onLayoutChange) return;
            const updated = {};
            currentLayout.forEach(({ i, x, y, w, h }) => {
              updated[i] = { x, y, w, h };
            });
            onLayoutChange(updated);
          }}
          draggableCancel=".no-drag, input, textarea, button, [contenteditable]"
        >
          {Object.keys(slots).map((key) => {
            const content = slots[key];
            if (!content) return null;
            const isSelected = selectedSubId === key;
            const isHovered = hoveredId === key && !isSelected;

            return (
              <div
                key={key}
                className="relative"
                style={{ cursor: isEditorActive ? 'grab' : 'default' }}
                onMouseEnter={() => isEditorActive && setHoveredId(key)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => {
                  if (!isEditorActive) return;
                  e.stopPropagation();
                  setSelectedSubId(isSelected ? null : key);
                }}
              >
                {/* ── Guías de margen en hover (estilo Figma) ────────────────── */}
                {isEditorActive && (isHovered || isSelected) && (
                  <>
                    {/* Borde principal */}
                    <div className={`absolute inset-0 pointer-events-none z-10 transition-all duration-100
                      ${isSelected
                        ? 'ring-2 ring-accent ring-inset'
                        : 'ring-1 ring-dashed ring-accent/60 ring-inset'
                      }`}
                    />
                    {/* Líneas de guía de margen — 4px desde cada borde */}
                    {isHovered && !isSelected && (
                      <>
                        {/* Línea superior */}
                        <div className="absolute top-1 left-0 right-0 h-px bg-accent/30 pointer-events-none z-10" />
                        {/* Línea inferior */}
                        <div className="absolute bottom-1 left-0 right-0 h-px bg-accent/30 pointer-events-none z-10" />
                        {/* Línea izquierda */}
                        <div className="absolute top-0 bottom-0 left-1 w-px bg-accent/30 pointer-events-none z-10" />
                        {/* Línea derecha */}
                        <div className="absolute top-0 bottom-0 right-1 w-px bg-accent/30 pointer-events-none z-10" />
                        {/* Esquinas — marca de esquina estilo Photoshop */}
                        <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border-t border-l border-accent/70 pointer-events-none z-10" />
                        <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 border-t border-r border-accent/70 pointer-events-none z-10" />
                        <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 border-b border-l border-accent/70 pointer-events-none z-10" />
                        <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-b border-r border-accent/70 pointer-events-none z-10" />
                      </>
                    )}
                  </>
                )}

                {/* Badge de nombre del sub-elemento seleccionado */}
                {isEditorActive && isSelected && (
                  <div className="absolute bottom-full left-0 mb-0.5 bg-accent text-bg text-[9px] font-bold px-2 py-0.5 rounded-t z-[100] pointer-events-none uppercase tracking-wider">
                    {key}
                  </div>
                )}

                {/* Contenido del sub-elemento */}
                <div className="w-full h-full overflow-hidden flex items-center justify-center">
                  {content}
                </div>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      )}
    </div>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────

/**
 * AvatarTextSection
 *
 * En modo editor: renderiza un InnerCanvas (react-grid-layout de 12 cols)
 * donde cada sub-elemento es un nodo drag & resize.
 *
 * En modo público: renderiza con CSS normal.
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
  // Layout interno guardado: { avatar: {x,y,w,h}, title: {x,y,w,h}, description: {x,y,w,h} }
  innerLayout,
  // ── CMS / Editor props ──
  onPropChange  = null,
  activeGridId  = null,
  id            = null,
}) {
  // ── Breakpoint ──────────────────────────────────────────────────────────
  const [bp, setBp] = useState(forceBp || 'desktop');
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

  // ── Modo editor ──────────────────────────────────────────────────────────
  const isEditorActive = typeof onPropChange === 'function' && activeGridId === id;
  const isEditable     = typeof onPropChange === 'function';

  // Sub-elemento seleccionado dentro del InnerCanvas
  const [selectedSubId, setSelectedSubId] = useState(null);

  // Layout interno del canvas
  const currentInnerLayout = innerLayout || DEFAULT_INNER_LAYOUT;

  const handleInnerLayoutChange = useCallback((updatedLayout) => {
    onPropChange?.('innerLayout', updatedLayout);
  }, [onPropChange]);

  // ── Datos ────────────────────────────────────────────────────────────────
  const bodyText = description !== undefined
    ? description
    : (paragraphs ? paragraphs.join('\n\n') : '');

  const editableOutline = isEditable
    ? {
        outline: '1.5px dashed rgba(250, 204, 21, 0.55)',
        outlineOffset: '3px',
        borderRadius: '2px',
        cursor: 'text',
        minWidth: '2rem',
      }
    : {};

  // ── Sub-elementos ────────────────────────────────────────────────────────

  const titleNode = title ? (
    <div className={`w-full h-full flex items-center ${showAccentBar ? 'border-l-[4px] border-accent pl-4' : ''}`}>
      <h2
        data-field="title"
        contentEditable={isEditable}
        suppressContentEditableWarning
        onBlur={(e) => onPropChange?.('title', e.currentTarget.innerText)}
        className="font-display font-bold leading-tight text-white w-full"
        style={{ textTransform: 'none', ...fieldStyle('title'), ...(isEditable ? editableOutline : {}) }}
      >
        {title}
      </h2>
    </div>
  ) : null;

  const avatarNode = avatarSrc ? (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative overflow-hidden rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,204,0,0.15)] w-full h-full max-w-[192px] max-h-[192px] mx-auto">
        <img
          src={avatarSrc}
          alt={avatarAlt || 'Avatar'}
          className="w-full h-full object-cover"
          data-field="avatarSrc"
        />
      </div>
    </div>
  ) : (
    isEditable ? (
        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-accent/30 rounded-lg text-muted text-xs">
          Sin imagen
        </div>
    ) : null
  );

  const descNode = bodyText ? (
    <div className="w-full h-full flex items-start">
      <p
        data-field="description"
        contentEditable={isEditable}
        suppressContentEditableWarning
        onBlur={(e) => onPropChange?.('description', e.currentTarget.innerText)}
        className="font-body text-white/80 text-base leading-relaxed w-full"
        style={{ whiteSpace: 'pre-wrap', ...fieldStyle('description'), ...(isEditable ? editableOutline : {}) }}
      >
        {bodyText}
      </p>
    </div>
  ) : null;

  // ── Render modo editor ───────────────────────────────────────────────────
  if (isEditable) {
    const slots = {
      avatar:      avatarNode,
      title:       titleNode,
      description: descNode,
    };

    return (
      <section className="w-full h-full relative group/avatartext">
        {/* Drag handle exclusivo para AvatarTextSection */}
        <div 
          className="drag-handle absolute top-2 right-2 p-1.5 bg-black/40 hover:bg-black/60 rounded cursor-move opacity-0 group-hover/avatartext:opacity-100 transition-opacity z-[110] text-white"
          title="Arrastrar componente"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5 9 2 12 5 15"></polyline>
            <polyline points="9 5 12 2 15 5"></polyline>
            <polyline points="19 9 22 12 19 15"></polyline>
            <polyline points="9 19 12 22 15 19"></polyline>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="12" y1="2" x2="12" y2="22"></line>
          </svg>
        </div>
        {/* Etiqueta visual para identificar el componente */}
        <div className="absolute top-0 left-0 bg-border text-muted text-[10px] px-2 py-0.5 font-mono uppercase tracking-widest z-10 opacity-0 group-hover/avatartext:opacity-100 transition-opacity pointer-events-none">
          Avatar y Texto
        </div>

        {/* Hint para activar edición interna */}
        {!isEditorActive && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent group-hover/cell:bg-black/5 pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 text-[10px] text-muted bg-s1/80 px-2 py-1 rounded border border-border transition-opacity">
              Doble clic para editar internamente
            </span>
          </div>
        )}
        <InnerCanvas
          slots={slots}
          layout={currentInnerLayout}
          onLayoutChange={handleInnerLayoutChange}
          selectedSubId={selectedSubId}
          setSelectedSubId={setSelectedSubId}
          isEditorActive={isEditorActive}
        />
      </section>
    );
  }

  // ── Render modo público ──────────────────────────────────────────────────
  return (
    <section className="w-full flex flex-col gap-6">
      {title && (
        <div className={showAccentBar ? 'border-l-[5px] border-accent pl-5' : ''}>
          <h2
            className="font-display font-bold leading-[1.1] text-white max-w-3xl whitespace-pre-line"
            style={{ textTransform: 'none', ...fieldStyle('title') }}
          >
            {title}
          </h2>
        </div>
      )}
      {avatarSrc && (
        <div className="flex justify-center my-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,204,0,0.15)] transition-all duration-300 hover:scale-105">
            <img src={avatarSrc} alt={avatarAlt || 'Avatar'} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      {bodyText && (
        <div className="w-full max-w-3xl">
          {bodyText.split('\n').map((p, i) => {
            if (!p.trim()) return <br key={i} />;
            return (
              <p key={i} className="font-body text-white/80 text-lg md:text-xl leading-relaxed mb-6 last:mb-0" style={fieldStyle('description')}>
                {p}
              </p>
            );
          })}
        </div>
      )}
    </section>
  );
}
