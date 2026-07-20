'use client';

import { useState, useRef } from 'react';

// ─── Config ────────────────────────────────────────────────────────────────

const CDN_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net';

const BREAKPOINTS = [
  { key: 'mobile',  label: '📱', title: 'Móvil (<768px)' },
  { key: 'tablet',  label: '💻', title: 'Tablet (768-1023px)' },
  { key: 'desktop', label: '🖥',  title: 'Desktop (≥1024px)' },
];

// Field definitions per component type
const HERO_EDITORIAL_TEXT_FIELDS = [
  { key: 'pillText',        label: 'Pill / Etiqueta',         long: false },
  { key: 'headline',        label: 'Título Principal',         long: false },
  { key: 'headlineKeyword', label: 'Palabra Clave (acento)',   long: false },
  { key: 'bodyText',        label: 'Cuerpo de Texto',          long: true  },
  { key: 'tagline',         label: 'Tagline (cita lateral)',   long: false },
];

import TypographyPanel from './TypographyPanel';

// ─── Text Field with optional Typography ───────────────────────────────────

function TextField({ fieldKey, label, long, value, onChange, styles, onStylesChange, hasTypography, onFocusField, activeBp, onActiveBpChange }) {
  const [showTypo, setShowTypo] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-bg overflow-hidden">
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">{label}</label>
          {hasTypography && (
            <button
              onClick={() => setShowTypo(v => !v)}
              className={`flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border transition-colors ${
                showTypo
                  ? 'bg-accent text-bg border-accent'
                  : 'border-border text-muted hover:text-ink'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
              Tipografía
            </button>
          )}
        </div>

        {long ? (
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => onFocusField && onFocusField(fieldKey)}
            className="w-full p-2.5 border border-border rounded-lg text-sm min-h-[100px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all resize-y text-white"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => onFocusField && onFocusField(fieldKey)}
            className="w-full p-2.5 border border-border rounded-lg text-sm bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all text-white"
          />
        )}
      </div>

      {hasTypography && showTypo && (
        <div className="px-3 pb-3">
          <TypographyPanel
            fieldKey={fieldKey}
            styles={styles}
            onStylesChange={onStylesChange}
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />
        </div>
      )}
    </div>
  );
}

// ─── Poster Src with Image Upload ──────────────────────────────────────────

function PosterSrcField({ value, onChange, thumbnail }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload-image', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error subiendo imagen');
      onChange(data.url);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-bg overflow-hidden">
      <div className="px-3 pt-3 pb-3">
        <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-2">
          Poster / Imagen de fondo
        </label>

        {/* Preview */}
        {(value || thumbnail) && (
          <div className="mb-2 relative rounded-lg overflow-hidden border border-border h-28 bg-s1">
            <img src={value || thumbnail} alt="poster" className="w-full h-full object-cover" />
            {!value && thumbnail && (
              <div className="absolute top-2 right-2 bg-accent/90 text-bg text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                Auto Bunny.net
              </div>
            )}
          </div>
        )}

        {/* URL input */}
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Dejar vacío para miniatura de Bunny.net automática"
          className="w-full p-2.5 border border-border rounded-lg text-sm bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all mb-2"
        />

        {/* Upload button */}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-accent/40 text-accent text-xs font-medium hover:bg-accent/5 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Subiendo...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Subir imagen
            </>
          )}
        </button>
        {uploadError && <p className="text-red-500 text-[10px] mt-1">{uploadError}</p>}
      </div>
    </div>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────

function GenericField({ propKey, val, onChange, onFocusField }) {
  if (typeof val === 'string') {
    return (
      <div className="rounded-xl border border-border bg-bg px-3 py-3">
        <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">{propKey}</label>
        {val.length > 50 ? (
          <textarea
            value={val}
            onChange={e => onChange(e.target.value)}
            onFocus={() => onFocusField && onFocusField(propKey)}
            className="w-full p-2.5 border border-border rounded-lg text-sm min-h-[100px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all resize-y text-white"
          />
        ) : (
          <input
            type="text"
            value={val}
            onChange={e => onChange(e.target.value)}
            onFocus={() => onFocusField && onFocusField(propKey)}
            className="w-full p-2.5 border border-border rounded-lg text-sm bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all text-white"
          />
        )}
      </div>
    );
  }
  if (Array.isArray(val)) {
    return (
      <div className="rounded-xl border border-border bg-bg px-3 py-3">
        <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">{propKey} (JSON)</label>
        <textarea
          value={JSON.stringify(val, null, 2)}
          onChange={e => {
            try { onChange(JSON.parse(e.target.value)); } catch {}
          }}
          className="w-full p-2.5 font-mono text-xs border border-border rounded-lg min-h-[160px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all resize-y"
        />
      </div>
    );
  }
  return null;
}

// ─── Section Divider ──────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[9px] font-bold text-muted uppercase tracking-widest px-1">{children}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────────────────

export default function SmartPropertiesPanel({ comp, updateProp, onClose, onFocusField, activeBp, onActiveBpChange }) {
  const { props, type } = comp;
  const [videoDeviceMode, setVideoDeviceMode] = useState('mobile'); // mobile | tablet | desktop
  const [showTitleTypo, setShowTitleTypo] = useState(false);
  const [showSubtitleTypo, setShowSubtitleTypo] = useState(false);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const handleElementDragStart = (e, key) => {
    setDraggedItem(key);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleElementDragOver = (e, key) => {
    e.preventDefault();
    if (key !== draggedItem) {
      setDragOverItem(key);
    }
  };

  const handleElementDrop = (e, targetKey) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === targetKey) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }
    const currentOrder = [...(props.elementOrder || ['title', 'avatar', 'description'])];
    const fromIndex = currentOrder.indexOf(draggedItem);
    const toIndex = currentOrder.indexOf(targetKey);
    
    if (fromIndex !== -1 && toIndex !== -1) {
      currentOrder.splice(fromIndex, 1);
      currentOrder.splice(toIndex, 0, draggedItem);
      updateProp(comp.id, 'elementOrder', currentOrder);
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleStylesChange = (newStyles) => {
    updateProp(comp.id, '_styles', newStyles);
  };

  // ── HeroEditorialSection layout ──
  if (type === 'HeroEditorialSection') {
    return (
      <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
              title="Volver a la estructura"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Hero Editorial — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex flex-col gap-3 p-3">

          <SectionLabel>Fondo</SectionLabel>
          <div className="rounded-xl border border-border bg-bg px-3 py-3 flex flex-col gap-2">
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Tipo de Fondo</label>
            <select
              value={props.backgroundType || 'video'}
              onChange={e => updateProp(comp.id, 'backgroundType', e.target.value)}
              className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink hover:bg-s2 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none cursor-pointer font-medium"
            >
              <option value="video" className="bg-s1 text-ink">🎞 Video o Imagen (Bunny.net)</option>
              <option value="solid" className="bg-s1 text-ink">🎨 Color Sólido</option>
              <option value="gradient" className="bg-s1 text-ink">🌈 Degradado CSS</option>
            </select>
            
            {props.backgroundType === 'solid' && (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={props.backgroundColor || '#121212'}
                  onChange={e => updateProp(comp.id, 'backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={props.backgroundColor || '#121212'}
                  onChange={e => updateProp(comp.id, 'backgroundColor', e.target.value)}
                  className="flex-1 p-2 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none uppercase font-mono"
                />
              </div>
            )}

            {props.backgroundType === 'gradient' && (
              <div className="flex flex-col gap-1 mt-1">
                <input
                  type="text"
                  placeholder="linear-gradient(135deg, #1e1b4b 0%, #311042 100%)"
                  value={props.backgroundGradient || 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)'}
                  onChange={e => updateProp(comp.id, 'backgroundGradient', e.target.value)}
                  className="w-full p-2.5 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none font-mono"
                />
                <span className="text-[9px] text-muted/60 leading-tight">Usa una sintaxis CSS válida de gradient (ej: linear-gradient).</span>
              </div>
            )}
          </div>

          <SectionLabel>Contenido de Texto</SectionLabel>

          {/* Ordered text fields with typography */}
          {HERO_EDITORIAL_TEXT_FIELDS.map(({ key, label, long }) => (
            <TextField
              key={key}
              fieldKey={key}
              label={label}
              long={long}
              value={props[key] || ''}
              onChange={val => updateProp(comp.id, key, val)}
              styles={props._styles}
              onStylesChange={handleStylesChange}
              onFocusField={onFocusField}
              hasTypography
              activeBp={activeBp}
              onActiveBpChange={onActiveBpChange}
            />
          ))}

          {(props.backgroundType === 'video' || !props.backgroundType) && (
            <>
              <SectionLabel>Imagen Poster</SectionLabel>

              {/* posterSrc with upload */}
              <PosterSrcField
                value={props.posterSrc || ''}
                onChange={val => updateProp(comp.id, 'posterSrc', val)}
                thumbnail={props[`${videoDeviceMode}VideoGuid`] ? `https://${CDN_HOSTNAME}/${props[`${videoDeviceMode}VideoGuid`]}/thumbnail.jpg` : null}
              />
              <div className="px-1 mt-1">
                <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-1">Texto Alternativo (SEO)</label>
                <input
                  type="text"
                  placeholder="Descripción de la imagen"
                  value={props.posterAlt || ''}
                  onChange={e => updateProp(comp.id, 'posterAlt', e.target.value)}
                  className="w-full p-2 border border-border rounded-lg text-[11px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
                />
              </div>

              <SectionLabel>Video (Bunny Stream)</SectionLabel>

              <div className="rounded-xl border border-border bg-bg overflow-hidden shadow-sm">
                {/* Device Tabs */}
                <div className="flex bg-s1 p-1 gap-1 border-b border-border">
                  {[
                    { id: 'mobile', label: 'Móvil', icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
                    { id: 'tablet', label: 'Tablet', icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
                    { id: 'desktop', label: 'Desktop', icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setVideoDeviceMode(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-medium transition-all ${
                        videoDeviceMode === tab.id 
                          ? 'bg-accent text-bg shadow-sm' 
                          : 'text-muted hover:text-ink hover:bg-s2'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                      GUID {videoDeviceMode === 'mobile' ? 'Móvil' : videoDeviceMode === 'tablet' ? 'Tablet' : 'Desktop'}
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Ej: 6859587c-3f26-444e-a131-026852c00325"
                    value={props[videoDeviceMode === 'mobile' ? 'mobileVideoGuid' : videoDeviceMode === 'tablet' ? 'tabletVideoGuid' : 'desktopVideoGuid'] || ''}
                    onChange={e => updateProp(comp.id, videoDeviceMode === 'mobile' ? 'mobileVideoGuid' : videoDeviceMode === 'tablet' ? 'tabletVideoGuid' : 'desktopVideoGuid', e.target.value)}
                    className="w-full p-2.5 border border-border rounded-lg text-[11px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all font-mono"
                  />
                  <p className="text-[9px] text-muted/60 px-1 leading-tight">
                    Usa un GUID diferente si quieres un encuadre distinto para {videoDeviceMode === 'mobile' ? 'celulares' : videoDeviceMode === 'tablet' ? 'tablets' : 'escritorio'}.
                  </p>
                </div>
              </div>
            </>
          )}

          <SectionLabel>Producto vinculado (Carrito)</SectionLabel>
          <div className="rounded-xl border border-border bg-bg px-3 py-3 flex flex-col gap-2">
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Slug del Producto</label>
            <input
              type="text"
              placeholder="Ej: video-autoridad"
              value={props.productSlug || ''}
              onChange={e => updateProp(comp.id, 'productSlug', e.target.value)}
              className="w-full p-2.5 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all font-mono"
            />
            <p className="text-[9px] text-muted">Slugs disponibles: video-autoridad, video-confianza, video-conversion, video-post-venta, pack-sistema</p>
          </div>

          <SectionLabel>Botones</SectionLabel>

          {/* Button fields */}

          {[
            { prefix: 'primaryButton', label: 'Botón Primario' },
            { prefix: 'secondaryButton', label: 'Botón Secundario' }
          ].map(({ prefix, label }) => (
            <div key={prefix} className="rounded-xl border border-border bg-bg px-3 py-3 flex flex-col gap-2">
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">{label}</label>
              
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Texto del botón"
                  value={props[`${prefix}Text`] || ''}
                  onChange={e => updateProp(comp.id, `${prefix}Text`, e.target.value)}
                  className="w-full p-2.5 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
                />
                <select
                  value={props[`${prefix}Icon`] || 'none'}
                  onChange={e => updateProp(comp.id, `${prefix}Icon`, e.target.value)}
                  className="w-full p-2.5 border border-border rounded-lg text-xs bg-s1 text-ink hover:bg-s2 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all cursor-pointer font-medium"
                >
                  <option value="none font-medium" className="bg-s1 text-ink">Sin Icono</option>
                  <option value="cart font-medium" className="bg-s1 text-ink">🛒 Carrito</option>
                  <option value="arrow-right font-medium" className="bg-s1 text-ink">➔ Flecha Derecha</option>
                  <option value="play font-medium" className="bg-s1 text-ink">▶ Play</option>
                </select>
              </div>
              
              <input
                type="text"
                placeholder="Enlace (URL)"
                value={props[`${prefix}Link`] || ''}
                onChange={e => updateProp(comp.id, `${prefix}Link`, e.target.value)}
                className="w-full p-2.5 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── SimpleCenteredCTA layout ──
  if (type === 'SimpleCenteredCTA') {
    return (
      <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
              title="Volver a la estructura"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">CTA Centrado — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 p-3 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <SectionLabel>Fondo</SectionLabel>
          <div className="flex flex-col gap-1 px-1">
            <label className="text-[10px] text-muted font-medium uppercase tracking-wide">Color de Fondo</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={props.backgroundColor || '#3b82f6'}
                onChange={e => updateProp(comp.id, 'backgroundColor', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={props.backgroundColor || '#3b82f6'}
                onChange={e => updateProp(comp.id, 'backgroundColor', e.target.value)}
                className="flex-1 p-2 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none uppercase font-mono"
              />
            </div>
          </div>

          <SectionLabel>Textos</SectionLabel>
          <TextField
            fieldKey="headline"
            label="Título Principal"
            long={true}
            value={props.headline || ''}
            onChange={val => updateProp(comp.id, 'headline', val)}
            styles={props._styles}
            onStylesChange={handleStylesChange}
            onFocusField={onFocusField}
            hasTypography
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />
          <TextField
            fieldKey="description"
            label="Descripción"
            long={true}
            value={props.description || ''}
            onChange={val => updateProp(comp.id, 'description', val)}
            styles={props._styles}
            onStylesChange={handleStylesChange}
            onFocusField={onFocusField}
            hasTypography
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />

          <SectionLabel>Botones</SectionLabel>
          {['primaryButton', 'secondaryButton'].map((prefix) => (
            <div key={prefix} className="rounded-xl border border-border bg-bg px-3 py-3 flex flex-col gap-2">
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
                {prefix === 'primaryButton' ? 'Botón Primario' : 'Botón Secundario'}
              </label>
              <input
                type="text"
                placeholder="Texto"
                value={props[`${prefix}Text`] || ''}
                onChange={e => updateProp(comp.id, `${prefix}Text`, e.target.value)}
                className="w-full p-2.5 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
              />
              <input
                type="text"
                placeholder="URL"
                value={props[`${prefix}Link`] || ''}
                onChange={e => updateProp(comp.id, `${prefix}Link`, e.target.value)}
                className="w-full p-2.5 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── HeroVideoSection layout (Classic Hero) ──
  if (type === 'HeroVideoSection') {
    return (
      <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
              title="Volver a la estructura"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Hero Clásico — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 p-3">
          <SectionLabel>Fondo</SectionLabel>
          <div className="rounded-xl border border-border bg-bg px-3 py-3 flex flex-col gap-2">
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Tipo de Fondo</label>
            <select
              value={props.backgroundType || 'video'}
              onChange={e => updateProp(comp.id, 'backgroundType', e.target.value)}
              className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink hover:bg-s2 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none cursor-pointer font-medium"
            >
              <option value="video" className="bg-s1 text-ink">🎞 Video o Imagen (Bunny.net)</option>
              <option value="solid" className="bg-s1 text-ink">🎨 Color Sólido</option>
              <option value="gradient" className="bg-s1 text-ink">🌈 Degradado CSS</option>
            </select>
            
            {props.backgroundType === 'solid' && (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={props.backgroundColor || '#121212'}
                  onChange={e => updateProp(comp.id, 'backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={props.backgroundColor || '#121212'}
                  onChange={e => updateProp(comp.id, 'backgroundColor', e.target.value)}
                  className="flex-1 p-2 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none uppercase font-mono"
                />
              </div>
            )}

            {props.backgroundType === 'gradient' && (
              <div className="flex flex-col gap-1 mt-1">
                <input
                  type="text"
                  placeholder="linear-gradient(135deg, #1e1b4b 0%, #311042 100%)"
                  value={props.backgroundGradient || 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)'}
                  onChange={e => updateProp(comp.id, 'backgroundGradient', e.target.value)}
                  className="w-full p-2.5 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none font-mono"
                />
              </div>
            )}
          </div>

          <SectionLabel>Contenido</SectionLabel>
          <TextField
            fieldKey="title"
            label="Título"
            value={props.title || ''}
            onChange={val => updateProp(comp.id, 'title', val)}
            onFocusField={onFocusField}
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />
          <TextField
            fieldKey="description1"
            label="Descripción 1"
            long
            value={props.description1 || ''}
            onChange={val => updateProp(comp.id, 'description1', val)}
            onFocusField={onFocusField}
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />
          <TextField
            fieldKey="description2"
            label="Descripción 2"
            long
            value={props.description2 || ''}
            onChange={val => updateProp(comp.id, 'description2', val)}
            onFocusField={onFocusField}
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />

          {(props.backgroundType === 'video' || !props.backgroundType) && (
            <>
              <SectionLabel>Video (Bunny Stream)</SectionLabel>
              <div className="rounded-xl border border-border bg-bg overflow-hidden shadow-sm">
                <div className="flex bg-s1 p-1 gap-1 border-b border-border">
                  {BREAKPOINTS.map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setVideoDeviceMode(tab.key)}
                      className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-medium transition-all ${
                        videoDeviceMode === tab.key ? 'bg-accent text-bg shadow-sm' : 'text-muted hover:text-ink hover:bg-s2'
                      }`}
                    >
                      {tab.label} {tab.key === 'mobile' ? 'Móvil' : tab.key === 'tablet' ? 'Tablet' : 'Desktop'}
                    </button>
                  ))}
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Pegar GUID de Bunny Stream"
                    value={props[videoDeviceMode === 'mobile' ? 'mobileVideoGuid' : videoDeviceMode === 'tablet' ? 'tabletVideoGuid' : 'desktopVideoGuid'] || ''}
                    onChange={e => updateProp(comp.id, videoDeviceMode === 'mobile' ? 'mobileVideoGuid' : videoDeviceMode === 'tablet' ? 'tabletVideoGuid' : 'desktopVideoGuid', e.target.value)}
                    className="w-full p-2.5 border border-border rounded-lg text-[11px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all font-mono"
                  />
                </div>
              </div>

              <SectionLabel>Imagen Poster</SectionLabel>
              <PosterSrcField
                value={props.posterSrc || ''}
                onChange={val => updateProp(comp.id, 'posterSrc', val)}
                thumbnail={props[`${videoDeviceMode}VideoGuid`] ? `https://${CDN_HOSTNAME}/${props[`${videoDeviceMode}VideoGuid`]}/thumbnail.jpg` : null}
              />
              <div className="px-1 mt-1">
                <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-1">Texto Alternativo (SEO)</label>
                <input
                  type="text"
                  placeholder="Descripción de la imagen"
                  value={props.posterAlt || ''}
                  onChange={e => updateProp(comp.id, 'posterAlt', e.target.value)}
                  className="w-full p-2 border border-border rounded-lg text-[11px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── EstrelasSection layout ──
  if (type === 'EstrelasSection') {
    return (
      <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
              title="Volver a la estructura"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <h3 className="text-xs font-bold text-ink">Estrellas — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        
        <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[70vh] custom-scrollbar">
          
          <SectionLabel>Calificación y Visibilidad</SectionLabel>
          
          <div className="rounded-xl border border-border bg-bg p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Mostrar Etiqueta (Pestillo)</label>
              <button
                onClick={() => updateProp(comp.id, 'showLabel', !props.showLabel)}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${props.showLabel ? 'bg-accent' : 'bg-gray-700'}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${props.showLabel ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Calificación ({props.rating || 5})</label>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={props.rating || 5}
                onChange={e => updateProp(comp.id, 'rating', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>

          <SectionLabel>Tamaño de Estrellas (Responsivo)</SectionLabel>
          
          <div className="rounded-xl border border-border bg-bg overflow-hidden shadow-sm">
            <div className="flex bg-s1 p-1 gap-1 border-b border-border">
              {BREAKPOINTS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setVideoDeviceMode(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-medium transition-all ${
                    videoDeviceMode === tab.key ? 'bg-accent text-bg shadow-sm' : 'text-muted hover:text-ink hover:bg-s2'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Tamaño (px)</span>
                <span className="text-xs font-mono text-accent">{(props.starSizes?.[videoDeviceMode]) || (videoDeviceMode === 'mobile' ? 28 : videoDeviceMode === 'tablet' ? 36 : 48)}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="120"
                step="1"
                value={(props.starSizes?.[videoDeviceMode]) || (videoDeviceMode === 'mobile' ? 28 : videoDeviceMode === 'tablet' ? 36 : 48)}
                onChange={e => {
                  const currentSizes = props.starSizes || { mobile: 28, tablet: 36, desktop: 48 };
                  updateProp(comp.id, 'starSizes', { ...currentSizes, [videoDeviceMode]: parseInt(e.target.value) });
                }}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>

          <SectionLabel>Contenido Adicional</SectionLabel>
          <TextField
            fieldKey="title"
            label="Título"
            value={props.title || ''}
            onChange={val => updateProp(comp.id, 'title', val)}
            styles={props._styles}
            onStylesChange={handleStylesChange}
            onFocusField={onFocusField}
            hasTypography
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />
          <TextField
            fieldKey="description"
            label="Descripción"
            long
            value={props.description || ''}
            onChange={val => updateProp(comp.id, 'description', val)}
            styles={props._styles}
            onStylesChange={handleStylesChange}
            onFocusField={onFocusField}
            hasTypography
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />
        </div>
      </div>
    );
  }

  // ── AvatarTextSection layout ──
  if (type === 'AvatarTextSection') {
    return (
      <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
              title="Volver a la estructura"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Avatar y Texto — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 p-3 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <SectionLabel>Orden de los Elementos</SectionLabel>
          <div className="flex flex-col gap-1.5 p-1.5 bg-s1 rounded-xl border border-border">
            {(props.elementOrder || ['title', 'avatar', 'description']).map((key, idx) => {
              const label = key === 'title' ? 'Título de Sección' : key === 'avatar' ? 'Foto de Avatar / Perfil' : 'Descripción (Párrafos)';
              return (
                <div
                  key={key}
                  draggable
                  onDragStart={(e) => handleElementDragStart(e, key)}
                  onDragOver={(e) => handleElementDragOver(e, key)}
                  onDrop={(e) => handleElementDrop(e, key)}
                  className={`relative flex items-center gap-2 p-2 border rounded-lg cursor-grab active:cursor-grabbing select-none transition-all
                    ${draggedItem === key ? 'opacity-40 bg-s2 border-dashed' : 'border-border bg-bg hover:border-accent/30'}
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-muted/50 flex-shrink-0"
                  >
                    <circle cx="8" cy="6" r="1.5"/>
                    <circle cx="16" cy="6" r="1.5"/>
                    <circle cx="8" cy="12" r="1.5"/>
                    <circle cx="16" cy="12" r="1.5"/>
                    <circle cx="8" cy="18" r="1.5"/>
                    <circle cx="16" cy="18" r="1.5"/>
                  </svg>
                  <span className="text-[11px] font-semibold text-ink">{label}</span>
                </div>
              );
            })}
          </div>

          <SectionLabel>Contenido</SectionLabel>
          <TextField
            fieldKey="title"
            label="Título de la sección"
            long={false}
            value={props.title || ''}
            onChange={val => updateProp(comp.id, 'title', val)}
            styles={props._styles}
            onStylesChange={handleStylesChange}
            onFocusField={onFocusField}
            hasTypography
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />
          <TextField
            fieldKey="description"
            label="Párrafos"
            long={true}
            value={props.description !== undefined ? props.description : (props.paragraphs ? props.paragraphs.join('\n\n') : '')}
            onChange={val => {
              updateProp(comp.id, 'description', val);
              if (props.paragraphs !== undefined) updateProp(comp.id, 'paragraphs', undefined);
            }}
            styles={props._styles}
            onStylesChange={handleStylesChange}
            onFocusField={onFocusField}
            hasTypography
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />

          <SectionLabel>Avatar / Perfil</SectionLabel>
          <PosterSrcField
            value={props.avatarSrc || ''}
            onChange={val => updateProp(comp.id, 'avatarSrc', val)}
          />
          <div className="px-1 mt-1">
            <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-1">Texto Alternativo (SEO)</label>
            <input
              type="text"
              placeholder="Ej: Leandro Venegas"
              value={props.avatarAlt || ''}
              onChange={e => updateProp(comp.id, 'avatarAlt', e.target.value)}
              className="w-full p-2 border border-border rounded-lg text-[11px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>

          <div className="flex items-center justify-between px-1 mt-2">
            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Mostrar Barra de Acento Izquierda</label>
            <button
              onClick={() => updateProp(comp.id, 'showAccentBar', !props.showAccentBar)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${props.showAccentBar ? 'bg-accent' : 'bg-gray-700'}`}
            >
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${props.showAccentBar ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── AvatarSection layout ──
  if (type === 'AvatarSection') {
    return (
      <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
              title="Volver a la estructura"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Avatar (Solo Imagen) — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 p-3 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <SectionLabel>Avatar / Perfil</SectionLabel>
          <PosterSrcField
            value={props.avatarSrc || ''}
            onChange={val => updateProp(comp.id, 'avatarSrc', val)}
          />
          <div className="px-1 mt-1">
            <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-1">Texto Alternativo (SEO)</label>
            <input
              type="text"
              placeholder="Ej: Leandro Venegas"
              value={props.avatarAlt || ''}
              onChange={e => updateProp(comp.id, 'avatarAlt', e.target.value)}
              className="w-full p-2 border border-border rounded-lg text-[11px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
        </div>
      </div>
    );
  }

  // ── LogosSection layout ──
  if (type === 'LogosSection') {
    const logos = props.logos || [];

    const updateLogoItem = (index, field, value) => {
      const newList = [...logos];
      newList[index] = { ...newList[index], [field]: value };
      updateProp(comp.id, 'logos', newList);
    };

    const addLogoItem = () => {
      const newList = [...logos, { id: Date.now().toString(), src: '', alt: '', link: '' }];
      updateProp(comp.id, 'logos', newList);
    };

    const removeLogoItem = (index) => {
      const newList = logos.filter((_, i) => i !== index);
      updateProp(comp.id, 'logos', newList);
    };

    const moveLogo = (index, direction) => {
      if (direction === 'up' && index === 0) return;
      if (direction === 'down' && index === logos.length - 1) return;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const newList = [...logos];
      const temp = newList[index];
      newList[index] = newList[targetIndex];
      newList[targetIndex] = temp;
      updateProp(comp.id, 'logos', newList);
    };

    return (
      <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
              title="Volver a la estructura"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Logos de Empresas — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex flex-col gap-3 p-3 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <SectionLabel>Ajustes de Diseño</SectionLabel>
          <div className="rounded-xl border border-border bg-bg p-3 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Modo de Visualización</label>
              <select
                value={props.layout || 'marquee'}
                onChange={e => updateProp(comp.id, 'layout', e.target.value)}
                className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink focus:ring-1 focus:ring-accent outline-none"
              >
                <option value="marquee">Carrusel Infinito (Marquee)</option>
                <option value="grid">Grilla Estática Centrada</option>
              </select>
            </div>

            {props.layout === 'marquee' && (
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider font-medium">Velocidad del Carrusel</label>
                <select
                  value={props.speed || 'medium'}
                  onChange={e => updateProp(comp.id, 'speed', e.target.value)}
                  className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink focus:ring-1 focus:ring-accent outline-none"
                >
                  <option value="slow">Lento</option>
                  <option value="medium">Medio</option>
                  <option value="fast">Rápido</option>
                </select>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-muted uppercase tracking-wider font-medium">Tema Visual de Logos</label>
              <select
                value={props.logoTheme || 'grayscale-dark'}
                onChange={e => updateProp(comp.id, 'logoTheme', e.target.value)}
                className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink focus:ring-1 focus:ring-accent outline-none"
              >
                <option value="grayscale-dark">Blanco Semitransparente (Hover: Blanco Sólido)</option>
                <option value="grayscale-light">Negro Semitransparente (Hover: Negro Sólido)</option>
                <option value="color">Escala de Grises (Hover: Color Original)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-muted uppercase tracking-wider font-medium">Color de Fondo del Bloque</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={props.backgroundColor || '#000000'}
                  onChange={e => updateProp(comp.id, 'backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={props.backgroundColor || '#000000'}
                  onChange={e => updateProp(comp.id, 'backgroundColor', e.target.value)}
                  className="flex-1 p-2 border border-border rounded-lg text-xs bg-s1 focus:ring-1 focus:ring-accent outline-none uppercase font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-muted uppercase tracking-wider font-medium">Altura Máxima Logo (px)</label>
              <input
                type="number"
                min="10"
                max="100"
                value={props.logoHeight || 35}
                onChange={e => updateProp(comp.id, 'logoHeight', parseInt(e.target.value) || 35)}
                className="w-full p-2 border border-border rounded-lg text-xs bg-s1 focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider font-medium">Espaciado Superior (Padding Top)</label>
                <span className="text-xs font-mono text-accent">{props.paddingTop !== undefined ? props.paddingTop : 32}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="4"
                value={props.paddingTop !== undefined ? props.paddingTop : 32}
                onChange={e => updateProp(comp.id, 'paddingTop', parseInt(e.target.value))}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider font-medium">Espaciado Inferior (Padding Bottom)</label>
                <span className="text-xs font-mono text-accent">{props.paddingBottom !== undefined ? props.paddingBottom : 32}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="4"
                value={props.paddingBottom !== undefined ? props.paddingBottom : 32}
                onChange={e => updateProp(comp.id, 'paddingBottom', parseInt(e.target.value))}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>

          <SectionLabel>Listado de Logos ({logos.length})</SectionLabel>
          <div className="flex flex-col gap-3">
            {logos.map((logo, index) => (
              <div key={logo.id || index} className="rounded-xl border border-border bg-s1 p-3 flex flex-col gap-2 relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-mono font-bold text-muted uppercase">Logo #{index + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveLogo(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-muted hover:text-ink disabled:opacity-30 transition-colors text-xs"
                      title="Subir"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveLogo(index, 'down')}
                      disabled={index === logos.length - 1}
                      className="p-1 text-muted hover:text-ink disabled:opacity-30 transition-colors text-xs"
                      title="Bajar"
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => removeLogoItem(index)}
                      className="p-1 text-red-500 hover:text-red-400 transition-colors ml-1 text-xs"
                      title="Eliminar"
                    >
                      🗑
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] font-bold text-muted uppercase mb-1">URL de Imagen (Cloudinary / CDN)</label>
                  <input
                    type="text"
                    placeholder="https://res.cloudinary.com/... o /images/..."
                    value={logo.src || ''}
                    onChange={e => updateLogoItem(index, 'src', e.target.value)}
                    className="w-full p-2 border border-border rounded-lg text-[11px] bg-bg focus:ring-1 focus:ring-accent outline-none font-mono"
                  />
                </div>

                {logo.src && (
                  <div className="flex justify-center p-2 rounded-lg bg-bg border border-border max-h-16 overflow-hidden">
                    <img
                      src={logo.src}
                      alt="preview"
                      className="object-contain h-8 opacity-75 grayscale invert"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[8px] font-bold text-muted uppercase mb-1">Nombre Alt (SEO)</label>
                    <input
                      type="text"
                      placeholder="Ej: Vercel"
                      value={logo.alt || ''}
                      onChange={e => updateLogoItem(index, 'alt', e.target.value)}
                      className="w-full p-2 border border-border rounded-lg text-[11px] bg-bg focus:ring-1 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-muted uppercase mb-1">Enlace Web (Opcional)</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={logo.link || ''}
                      onChange={e => updateLogoItem(index, 'link', e.target.value)}
                      className="w-full p-2 border border-border rounded-lg text-[11px] bg-bg focus:ring-1 focus:ring-accent outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addLogoItem}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-accent/40 text-accent text-xs font-semibold hover:bg-accent/5 transition-colors mt-2"
            >
              + Agregar Logo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── TituloAnimado layout ──
  if (type === 'TituloAnimado') {
    const currentConfig = props.config || {};
    return (
      <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
              title="Volver a la estructura"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Título Animado — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex flex-col gap-3 p-3 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <SectionLabel>Texto</SectionLabel>
          <TextField
            fieldKey="text"
            label="Texto a animar"
            long={true}
            value={props.text || ''}
            onChange={val => updateProp(comp.id, 'text', val)}
            styles={props._styles}
            onStylesChange={handleStylesChange}
            onFocusField={onFocusField}
            hasTypography
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />
          <p className="text-[10px] text-muted -mt-2 px-1">
            Usa <code className="text-accent">**texto**</code> para resaltar palabras en amarillo.
          </p>

          <SectionLabel>Animación</SectionLabel>
          <div className="rounded-xl border border-border bg-bg px-3 py-3 flex flex-col gap-2">
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Tipo de Animación</label>
            <select
              value={props.animationType || 'cascade_elegant_fade_up'}
              onChange={e => updateProp(comp.id, 'animationType', e.target.value)}
              className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink hover:bg-s2 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none cursor-pointer font-medium"
            >
              <option value="cascade_elegant_fade_up" className="bg-s1 text-ink">Cascade Elegant Fade Up</option>
              <option value="soft_focus_in" className="bg-s1 text-ink">Soft Focus In</option>
              <option value="metalic_sheen_sweep" className="bg-s1 text-ink">Metalic Sheen Sweep</option>
            </select>
          </div>

          <SectionLabel>Configuración de Animación</SectionLabel>
          <div className="rounded-xl border border-border bg-bg px-3 py-3 flex flex-col gap-3">
            {/* Duration */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Duración (segundos)</label>
                <span className="text-xs font-mono text-accent">{(currentConfig.durationSeconds) ?? 3.5}s</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="8"
                step="0.5"
                value={(currentConfig.durationSeconds) ?? 3.5}
                onChange={e => updateProp(comp.id, 'config', { ...currentConfig, durationSeconds: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Word Delay */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Retraso entre palabras (frames)</label>
                <span className="text-xs font-mono text-accent">{(currentConfig.wordDelay) ?? 5}f</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={(currentConfig.wordDelay) ?? 5}
                onChange={e => updateProp(comp.id, 'config', { ...currentConfig, wordDelay: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Spring Stiffness */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Stiffness (Rigidez)</label>
                <span className="text-xs font-mono text-accent">{(currentConfig.stiffness) ?? 100}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={(currentConfig.stiffness) ?? 100}
                onChange={e => updateProp(comp.id, 'config', { ...currentConfig, stiffness: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Spring Damping */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Damping (Amortiguación)</label>
                <span className="text-xs font-mono text-accent">{(currentConfig.damping) ?? 15}</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={(currentConfig.damping) ?? 15}
                onChange={e => updateProp(comp.id, 'config', { ...currentConfig, damping: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Loop Count */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Loop Infinito</label>
                <button
                  onClick={() => {
                    const isInfinite = currentConfig.loopCount === 'infinite' || currentConfig.loopCount === undefined;
                    updateProp(comp.id, 'config', { ...currentConfig, loopCount: isInfinite ? 3 : 'infinite' });
                  }}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${(currentConfig.loopCount === 'infinite' || currentConfig.loopCount === undefined) ? 'bg-accent' : 'bg-gray-700'}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${(currentConfig.loopCount === 'infinite' || currentConfig.loopCount === undefined) ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              {currentConfig.loopCount !== 'infinite' && currentConfig.loopCount !== undefined && (
                <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Repetir animación (veces)</label>
                    <span className="text-xs font-mono text-accent">{currentConfig.loopCount ?? 3} veces</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="99"
                    step="1"
                    value={currentConfig.loopCount ?? 3}
                    onChange={e => updateProp(comp.id, 'config', { ...currentConfig, loopCount: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              )}
            </div>

            {/* Iteraciones */}
            <div>
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Iteraciones</label>
              <div className="flex bg-s1 p-1 gap-1 border border-border rounded-lg">
                {[1, 2, 3, 'Infinito'].map((opt) => {
                  const isSelected = (currentConfig.iterations ?? 'Infinito') === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => updateProp(comp.id, 'config', { ...currentConfig, iterations: opt })}
                      className={`flex-1 py-1 rounded-md text-[11px] font-semibold transition-all ${
                        isSelected ? 'bg-accent text-bg shadow-sm' : 'text-muted hover:text-ink hover:bg-s2'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Color de Fondo (Opcional)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentConfig.backgroundColor || '#120924'}
                  onChange={e => updateProp(comp.id, 'config', { ...currentConfig, backgroundColor: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={currentConfig.backgroundColor || '#120924'}
                  onChange={e => updateProp(comp.id, 'config', { ...currentConfig, backgroundColor: e.target.value })}
                  className="flex-1 p-2 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none uppercase font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TextosAnimados layout ──
  if (type === 'TextosAnimados') {
    const currentTitleConfig = props.titleConfig || {};
    const currentSubtitleConfig = props.subtitleConfig || {};
    return (
      <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
              title="Volver a la estructura"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Textos Animados — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex flex-col gap-3 p-3 overflow-y-auto max-h-[70vh] custom-scrollbar">
          
          <SectionLabel>Título</SectionLabel>
          <div className="rounded-xl border border-border bg-bg p-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Texto del Título</label>
              <button
                type="button"
                onClick={() => setShowTitleTypo(v => !v)}
                className={`flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border transition-colors ${
                  showTitleTypo
                    ? 'bg-accent text-bg border-accent'
                    : 'border-border text-muted hover:text-ink'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
                Tipografía
              </button>
            </div>
            <textarea
              value={props.titulo !== undefined && props.titulo !== null ? props.titulo : (props.title !== undefined && props.title !== null ? props.title : '')}
              onChange={e => updateProp(comp.id, 'titulo', e.target.value)}
              onFocus={() => {
                setShowTitleTypo(true);
                onFocusField && onFocusField('titulo');
              }}
              style={{ minHeight: '140px', height: '140px', color: '#ffffff', backgroundColor: '#0a0a0a', display: 'block' }}
              className="w-full p-3 border border-border rounded-lg text-base outline-none transition-all resize-y font-medium leading-relaxed focus:ring-1 focus:ring-accent"
              placeholder="Usa **texto** para resaltar palabras en amarillo"
            />
            {showTitleTypo && (
              <div className="pt-2 border-t border-border mt-2">
                <TypographyPanel
                  fieldKey="titulo"
                  styles={props._styles}
                  onStylesChange={handleStylesChange}
                  activeBp={activeBp}
                  onActiveBpChange={onActiveBpChange}
                />
              </div>
            )}
          </div>
          <p className="text-[10px] text-muted -mt-2 px-1">
            Usa <code className="text-accent">**texto**</code> para resaltar palabras en amarillo.
          </p>

          <SectionLabel>Subtítulo</SectionLabel>
          <div className="rounded-xl border border-border bg-bg p-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Texto del Subtítulo</label>
              <button
                type="button"
                onClick={() => setShowSubtitleTypo(v => !v)}
                className={`flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border transition-colors ${
                  showSubtitleTypo
                    ? 'bg-accent text-bg border-accent'
                    : 'border-border text-muted hover:text-ink'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
                Tipografía
              </button>
            </div>
            <textarea
              value={props.subtitulo !== undefined && props.subtitulo !== null ? props.subtitulo : (props.subtitle !== undefined && props.subtitle !== null ? props.subtitle : '')}
              onChange={e => updateProp(comp.id, 'subtitulo', e.target.value)}
              onFocus={() => {
                setShowSubtitleTypo(true);
                onFocusField && onFocusField('subtitulo');
              }}
              style={{ minHeight: '140px', height: '140px', color: '#ffffff', backgroundColor: '#0a0a0a', display: 'block' }}
              className="w-full p-3 border border-border rounded-lg text-base outline-none transition-all resize-y font-medium leading-relaxed focus:ring-1 focus:ring-accent"
              placeholder="Usa **texto** para resaltar palabras en amarillo"
            />
            {showSubtitleTypo && (
              <div className="pt-2 border-t border-border mt-2">
                <TypographyPanel
                  fieldKey="subtitulo"
                  styles={props._styles}
                  onStylesChange={handleStylesChange}
                  activeBp={activeBp}
                  onActiveBpChange={onActiveBpChange}
                />
              </div>
            )}
          </div>
          <p className="text-[10px] text-muted -mt-2 px-1">
            Usa <code className="text-accent">**texto**</code> para resaltar palabras en amarillo.
          </p>

          <SectionLabel>Animación del Título</SectionLabel>
          <div className="rounded-xl border border-border bg-bg px-3 py-3 flex flex-col gap-3">
            <div>
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Tipo de Animación</label>
              <select
                value={props.titleAnimationType || 'cascade_elegant_fade_up'}
                onChange={e => updateProp(comp.id, 'titleAnimationType', e.target.value)}
                className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink hover:bg-s2 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none cursor-pointer font-medium"
              >
                <option value="cascade_elegant_fade_up" className="bg-s1 text-ink">Cascade Elegant Fade Up</option>
                <option value="soft_focus_in" className="bg-s1 text-ink">Soft Focus In</option>
                <option value="metalic_sheen_sweep" className="bg-s1 text-ink">Metalic Sheen Sweep</option>
              </select>
            </div>

            {/* Title Duration */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Duración (segundos)</label>
                <span className="text-xs font-mono text-accent">{(currentTitleConfig.durationSeconds) ?? 3.5}s</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="8"
                step="0.5"
                value={(currentTitleConfig.durationSeconds) ?? 3.5}
                onChange={e => updateProp(comp.id, 'titleConfig', { ...currentTitleConfig, durationSeconds: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Title Word Delay */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Retraso entre palabras (frames)</label>
                <span className="text-xs font-mono text-accent">{(currentTitleConfig.wordDelay) ?? 5}f</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={(currentTitleConfig.wordDelay) ?? 5}
                onChange={e => updateProp(comp.id, 'titleConfig', { ...currentTitleConfig, wordDelay: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Title Spring Stiffness */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Stiffness (Rigidez)</label>
                <span className="text-xs font-mono text-accent">{(currentTitleConfig.stiffness) ?? 100}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={(currentTitleConfig.stiffness) ?? 100}
                onChange={e => updateProp(comp.id, 'titleConfig', { ...currentTitleConfig, stiffness: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Title Spring Damping */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Damping (Amortiguación)</label>
                <span className="text-xs font-mono text-accent">{(currentTitleConfig.damping) ?? 15}</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={(currentTitleConfig.damping) ?? 15}
                onChange={e => updateProp(comp.id, 'titleConfig', { ...currentTitleConfig, damping: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Title Loop Count */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Loop Infinito</label>
                <button
                  onClick={() => {
                    const isInfinite = currentTitleConfig.loopCount === 'infinite' || currentTitleConfig.loopCount === undefined;
                    updateProp(comp.id, 'titleConfig', { ...currentTitleConfig, loopCount: isInfinite ? 3 : 'infinite' });
                  }}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${(currentTitleConfig.loopCount === 'infinite' || currentTitleConfig.loopCount === undefined) ? 'bg-accent' : 'bg-gray-700'}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${(currentTitleConfig.loopCount === 'infinite' || currentTitleConfig.loopCount === undefined) ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              {currentTitleConfig.loopCount !== 'infinite' && currentTitleConfig.loopCount !== undefined && (
                <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Repetir animación (veces)</label>
                    <span className="text-xs font-mono text-accent">{currentTitleConfig.loopCount ?? 3} veces</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="99"
                    step="1"
                    value={currentTitleConfig.loopCount ?? 3}
                    onChange={e => updateProp(comp.id, 'titleConfig', { ...currentTitleConfig, loopCount: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              )}
            </div>
          </div>

          <SectionLabel>Animación del Subtítulo</SectionLabel>
          <div className="rounded-xl border border-border bg-bg px-3 py-3 flex flex-col gap-3">
            <div>
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Tipo de Animación</label>
              <select
                value={props.subtitleAnimationType || 'cascade_elegant_fade_up'}
                onChange={e => updateProp(comp.id, 'subtitleAnimationType', e.target.value)}
                className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink hover:bg-s2 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none cursor-pointer font-medium"
              >
                <option value="cascade_elegant_fade_up" className="bg-s1 text-ink">Cascade Elegant Fade Up</option>
                <option value="soft_focus_in" className="bg-s1 text-ink">Soft Focus In</option>
                <option value="metalic_sheen_sweep" className="bg-s1 text-ink">Metalic Sheen Sweep</option>
              </select>
            </div>

            {/* Subtitle Start Delay */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Retraso de Inicio (segundos)</label>
                <span className="text-xs font-mono text-accent">{((currentSubtitleConfig.startDelayMs) ?? 1000) / 1000}s</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={((currentSubtitleConfig.startDelayMs) ?? 1000) / 1000}
                onChange={e => updateProp(comp.id, 'subtitleConfig', { ...currentSubtitleConfig, startDelayMs: Math.round(parseFloat(e.target.value) * 1000) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Subtitle Duration */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Duración (segundos)</label>
                <span className="text-xs font-mono text-accent">{(currentSubtitleConfig.durationSeconds) ?? 3.5}s</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="8"
                step="0.5"
                value={(currentSubtitleConfig.durationSeconds) ?? 3.5}
                onChange={e => updateProp(comp.id, 'subtitleConfig', { ...currentSubtitleConfig, durationSeconds: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Subtitle Word Delay */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Retraso entre palabras (frames)</label>
                <span className="text-xs font-mono text-accent">{(currentSubtitleConfig.wordDelay) ?? 4}f</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={(currentSubtitleConfig.wordDelay) ?? 4}
                onChange={e => updateProp(comp.id, 'subtitleConfig', { ...currentSubtitleConfig, wordDelay: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Subtitle Spring Stiffness */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Stiffness (Rigidez)</label>
                <span className="text-xs font-mono text-accent">{(currentSubtitleConfig.stiffness) ?? 100}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={(currentSubtitleConfig.stiffness) ?? 100}
                onChange={e => updateProp(comp.id, 'subtitleConfig', { ...currentSubtitleConfig, stiffness: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Subtitle Spring Damping */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Damping (Amortiguación)</label>
                <span className="text-xs font-mono text-accent">{(currentSubtitleConfig.damping) ?? 15}</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={(currentSubtitleConfig.damping) ?? 15}
                onChange={e => updateProp(comp.id, 'subtitleConfig', { ...currentSubtitleConfig, damping: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Subtitle Loop Count */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Loop Infinito</label>
                <button
                  onClick={() => {
                    const isInfinite = currentSubtitleConfig.loopCount === 'infinite' || currentSubtitleConfig.loopCount === undefined;
                    updateProp(comp.id, 'subtitleConfig', { ...currentSubtitleConfig, loopCount: isInfinite ? 3 : 'infinite' });
                  }}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${(currentSubtitleConfig.loopCount === 'infinite' || currentSubtitleConfig.loopCount === undefined) ? 'bg-accent' : 'bg-gray-700'}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${(currentSubtitleConfig.loopCount === 'infinite' || currentSubtitleConfig.loopCount === undefined) ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              {currentSubtitleConfig.loopCount !== 'infinite' && currentSubtitleConfig.loopCount !== undefined && (
                <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Repetir animación (veces)</label>
                    <span className="text-xs font-mono text-accent">{currentSubtitleConfig.loopCount ?? 3} veces</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="99"
                    step="1"
                    value={currentSubtitleConfig.loopCount ?? 3}
                    onChange={e => updateProp(comp.id, 'subtitleConfig', { ...currentSubtitleConfig, loopCount: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-s2 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              )}
            </div>
          </div>

          <SectionLabel>Fondo</SectionLabel>
          <div className="rounded-xl border border-border bg-bg px-3 py-3 flex flex-col gap-2 animate-in fade-in duration-200">
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Tipo de Fondo</label>
            <select
              value={props.backgroundType || 'video'}
              onChange={e => updateProp(comp.id, 'backgroundType', e.target.value)}
              className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink hover:bg-s2 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none cursor-pointer font-medium"
            >
              <option value="video" className="bg-s1 text-ink">🎞 Video o Imagen (Bunny.net)</option>
              <option value="solid" className="bg-s1 text-ink">🎨 Color Sólido</option>
              <option value="gradient" className="bg-s1 text-ink">🌈 Degradado CSS</option>
            </select>
            
            {props.backgroundType === 'solid' && (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={props.backgroundColor || '#120924'}
                  onChange={e => updateProp(comp.id, 'backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={props.backgroundColor || '#120924'}
                  onChange={e => updateProp(comp.id, 'backgroundColor', e.target.value)}
                  className="flex-1 p-2 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none uppercase font-mono text-white"
                />
              </div>
            )}

            {props.backgroundType === 'gradient' && (
              <div className="flex flex-col gap-2 mt-1">
                {/* Preset gradients */}
                <label className="block text-[9px] font-bold text-muted uppercase tracking-wider">Presets de Degradados</label>
                <div className="grid grid-cols-3 gap-1.5 mb-1">
                  {[
                    { name: 'Púrpura Cósmico', value: 'linear-gradient(135deg, #1c0e35 0%, #0a0416 100%)' },
                    { name: 'Aurora Azul', value: 'linear-gradient(135deg, #09203f 0%, #537895 100%)' },
                    { name: 'Atardecer Cyber', value: 'linear-gradient(135deg, #2b1055 0%, #7597de 100%)' },
                    { name: 'Abismo Marino', value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
                    { name: 'Magma Eléctrico', value: 'linear-gradient(135deg, #0f0c20 0%, #15102a 50%, #300808 100%)' },
                    { name: 'Gris Carbón', value: 'linear-gradient(135deg, #141414 0%, #282828 100%)' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => updateProp(comp.id, 'backgroundGradient', preset.value)}
                      style={{ background: preset.value }}
                      className={`h-7 rounded-md border text-[8px] font-semibold text-white/85 flex items-center justify-center shadow-sm hover:scale-[1.03] transition-transform active:scale-[0.98] cursor-pointer ${
                        props.backgroundGradient === preset.value ? 'border-accent ring-1 ring-accent' : 'border-border'
                      }`}
                      title={preset.name}
                    >
                      {preset.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <label className="block text-[9px] font-bold text-muted uppercase tracking-wider">Código de Degradado Personalizado</label>
                <input
                  type="text"
                  placeholder="linear-gradient(135deg, #1c0e35 0%, #0a0416 100%)"
                  value={props.backgroundGradient || 'linear-gradient(135deg, #1c0e35 0%, #0a0416 100%)'}
                  onChange={e => updateProp(comp.id, 'backgroundGradient', e.target.value)}
                  className="w-full p-2.5 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none font-mono text-white"
                />
                <span className="text-[9px] text-muted/60 leading-tight">Usa una sintaxis CSS válida de gradient (ej: linear-gradient).</span>
              </div>
            )}
          </div>

          {(props.backgroundType === 'video' || !props.backgroundType) && (
            <>
              <SectionLabel>Imagen Poster</SectionLabel>
              <PosterSrcField
                value={props.posterSrc || ''}
                onChange={val => updateProp(comp.id, 'posterSrc', val)}
                thumbnail={props[`${videoDeviceMode}VideoGuid`] ? `https://${CDN_HOSTNAME}/${props[`${videoDeviceMode}VideoGuid`]}/thumbnail.jpg` : null}
              />
              <div className="px-1 mt-1">
                <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-1">Texto Alternativo (SEO)</label>
                <input
                  type="text"
                  placeholder="Descripción de la imagen"
                  value={props.posterAlt || ''}
                  onChange={e => updateProp(comp.id, 'posterAlt', e.target.value)}
                  className="w-full p-2 border border-border rounded-lg text-[11px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all text-white"
                />
              </div>

              <SectionLabel>Video (Bunny Stream)</SectionLabel>
              <div className="rounded-xl border border-border bg-bg overflow-hidden shadow-sm">
                <div className="flex bg-s1 p-1 gap-1 border-b border-border">
                  {[
                    { id: 'mobile', label: 'Móvil', icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
                    { id: 'tablet', label: 'Tablet', icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
                    { id: 'desktop', label: 'Desktop', icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setVideoDeviceMode(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-medium transition-all ${
                        videoDeviceMode === tab.id 
                          ? 'bg-accent text-bg shadow-sm' 
                          : 'text-muted hover:text-ink hover:bg-s2'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                      GUID {videoDeviceMode === 'mobile' ? 'Móvil' : videoDeviceMode === 'tablet' ? 'Tablet' : 'Desktop'}
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Ej: 6859587c-3f26-444e-a131-026852c00325"
                    value={props[videoDeviceMode === 'mobile' ? 'mobileVideoGuid' : videoDeviceMode === 'tablet' ? 'tabletVideoGuid' : 'desktopVideoGuid'] || ''}
                    onChange={e => updateProp(comp.id, videoDeviceMode === 'mobile' ? 'mobileVideoGuid' : videoDeviceMode === 'tablet' ? 'tabletVideoGuid' : 'desktopVideoGuid', e.target.value)}
                    className="w-full p-2.5 border border-border rounded-lg text-[11px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all font-mono text-white"
                  />
                  <p className="text-[9px] text-muted/60 px-1 leading-tight">
                    Usa un GUID diferente si quieres un encuadre distinto para {videoDeviceMode === 'mobile' ? 'celulares' : videoDeviceMode === 'tablet' ? 'tablets' : 'escritorio'}.
                  </p>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    );
  }

  // ── TextSection layout ──
  if (type === 'TextSection') {
    return (
      <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
              title="Volver a la estructura"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Texto — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 p-3 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <SectionLabel>Contenido</SectionLabel>
          <TextField
            fieldKey="title"
            label="Título de la sección"
            long={false}
            value={props.title || ''}
            onChange={val => updateProp(comp.id, 'title', val)}
            styles={props._styles}
            onStylesChange={handleStylesChange}
            onFocusField={onFocusField}
            hasTypography
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />
          <TextField
            fieldKey="description"
            label="Párrafos"
            long={true}
            value={props.description !== undefined ? props.description : (props.paragraphs ? props.paragraphs.join('\n\n') : '')}
            onChange={val => {
              updateProp(comp.id, 'description', val);
              if (props.paragraphs !== undefined) updateProp(comp.id, 'paragraphs', undefined); // Migration
            }}
            styles={props._styles}
            onStylesChange={handleStylesChange}
            onFocusField={onFocusField}
            hasTypography
            activeBp={activeBp}
            onActiveBpChange={onActiveBpChange}
          />
        </div>
      </div>
    );
  }

  // ── Generic fallback for all other component types ──
  return (
    <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
        <div className="flex items-center gap-2">
          <button 
            onClick={onClose} 
            className="mr-1 p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors flex items-center justify-center"
            title="Volver a la estructura"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
          <h3 className="text-xs font-bold text-ink">Propiedades</h3>
        </div>
        <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded" title="Volver a la estructura">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div className="flex flex-col gap-3 p-3">
        {Object.entries(props).map(([key, val]) => {
          if (key === '_styles') return null;
          return (
            <GenericField
              key={key}
              propKey={key}
              val={val}
              onChange={newVal => updateProp(comp.id, key, newVal)}
              onFocusField={onFocusField}
            />
          );
        })}
      </div>
    </div>
  );
}
