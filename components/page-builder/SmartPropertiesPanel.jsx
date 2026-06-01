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

function TextField({ fieldKey, label, long, value, onChange, styles, onStylesChange, hasTypography, onFocusField }) {
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
            className="w-full p-2.5 border border-border rounded-lg text-sm min-h-[100px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all resize-y"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => onFocusField && onFocusField(fieldKey)}
            className="w-full p-2.5 border border-border rounded-lg text-sm bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
          />
        )}
      </div>

      {hasTypography && showTypo && (
        <div className="px-3 pb-3">
          <TypographyPanel
            fieldKey={fieldKey}
            styles={styles}
            onStylesChange={onStylesChange}
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
            className="w-full p-2.5 border border-border rounded-lg text-sm min-h-[100px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all resize-y"
          />
        ) : (
          <input
            type="text"
            value={val}
            onChange={e => onChange(e.target.value)}
            onFocus={() => onFocusField && onFocusField(propKey)}
            className="w-full p-2.5 border border-border rounded-lg text-sm bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
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

export default function SmartPropertiesPanel({ comp, updateProp, onClose, onFocusField }) {
  const { props, type } = comp;
  const [videoDeviceMode, setVideoDeviceMode] = useState('mobile'); // mobile | tablet | desktop

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
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Hero Editorial — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex flex-col gap-3 p-3">

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
            />
          ))}

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
            <p className="text-[9px] text-muted">Slugs disponibles: video-autoridad, video-confianza, video-conversion, video-retencion, pack-sistema</p>
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
                  className="w-full p-2.5 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all cursor-pointer"
                >
                  <option value="none">Sin Icono</option>
                  <option value="cart">🛒 Carrito</option>
                  <option value="arrow-right">➔ Flecha Derecha</option>
                  <option value="play">▶ Play</option>
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
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Call to Action (Centrado) — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded">
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
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Hero Clásico — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 p-3">
          <SectionLabel>Contenido</SectionLabel>
          <TextField
            fieldKey="title"
            label="Título"
            value={props.title || ''}
            onChange={val => updateProp(comp.id, 'title', val)}
            onFocusField={onFocusField}
          />
          <TextField
            fieldKey="description1"
            label="Descripción 1"
            long
            value={props.description1 || ''}
            onChange={val => updateProp(comp.id, 'description1', val)}
            onFocusField={onFocusField}
          />
          <TextField
            fieldKey="description2"
            label="Descripción 2"
            long
            value={props.description2 || ''}
            onChange={val => updateProp(comp.id, 'description2', val)}
            onFocusField={onFocusField}
          />

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
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <h3 className="text-xs font-bold text-ink">Estrellas — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded">
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
          />
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
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="text-xs font-bold text-ink">Texto — Propiedades</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded">
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
          />
        </div>
      </div>
    );
  }



  // ── Generic fallback for all other component types ──
  return (
    <div className="bg-bg border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-s1">
        <h3 className="text-xs font-bold text-ink">Propiedades</h3>
        <button onClick={onClose} className="p-1 hover:text-red-400 text-muted transition-colors rounded">
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
