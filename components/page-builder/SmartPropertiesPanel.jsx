'use client';

import { useState, useRef } from 'react';

// ─── Config ────────────────────────────────────────────────────────────────

const BREAKPOINTS = [
  { key: 'mobile',  label: '📱', title: 'Móvil (<768px)' },
  { key: 'tablet',  label: '💻', title: 'Tablet (768-1023px)' },
  { key: 'desktop', label: '🖥',  title: 'Desktop (≥1024px)' },
];

const VIDEO_FIELDS = {
  mobile: [
    { key: 'mobileAV1',  label: 'Móvil — AV1 (.mp4)' },
    { key: 'mobileVP9',  label: 'Móvil — VP9 (.webm)' },
    { key: 'mobileH264', label: 'Móvil — H.264 (.mp4)' },
  ],
  desktop: [
    { key: 'desktopAV1',  label: 'Desktop — AV1 (.mp4)' },
    { key: 'desktopVP9',  label: 'Desktop — VP9 (.webm)' },
    { key: 'desktopH264', label: 'Desktop — H.264 (.mp4)' },
  ],
};

// Field definitions per component type
const HERO_EDITORIAL_TEXT_FIELDS = [
  { key: 'pillText',        label: 'Pill / Etiqueta',         long: false },
  { key: 'headline',        label: 'Título Principal',         long: false },
  { key: 'headlineKeyword', label: 'Palabra Clave (acento)',   long: false },
  { key: 'bodyText',        label: 'Cuerpo de Texto',          long: true  },
  { key: 'tagline',         label: 'Tagline (cita lateral)',   long: false },
];

const HERO_EDITORIAL_BUTTON_FIELDS = [
  { key: 'primaryButtonText',   label: 'Botón 1 — Texto' },
  { key: 'primaryButtonLink',   label: 'Botón 1 — Enlace' },
  { key: 'secondaryButtonText', label: 'Botón 2 — Texto' },
  { key: 'secondaryButtonLink', label: 'Botón 2 — Enlace' },
];

// ─── Typography Controls ───────────────────────────────────────────────────

function TypographyControls({ fieldKey, styles, onStylesChange }) {
  const [activeBp, setActiveBp] = useState('mobile');

  const currentStyle = styles?.[fieldKey]?.[activeBp] || {
    fontSize: 16, color: '', fontWeight: '400', fontStyle: 'normal',
    textTransform: 'none', letterSpacing: '0', lineHeight: '1.5'
  };

  const updateStyle = (prop, value) => {
    const updated = {
      ...(styles || {}),
      [fieldKey]: {
        ...(styles?.[fieldKey] || {}),
        [activeBp]: {
          ...currentStyle,
          [prop]: value,
        }
      }
    };
    onStylesChange(updated);
  };

  return (
    <div className="mt-2 rounded-lg border border-border bg-s1 overflow-hidden">
      {/* Breakpoint tabs */}
      <div className="flex border-b border-border bg-s2">
        {BREAKPOINTS.map(bp => (
          <button
            key={bp.key}
            onClick={() => setActiveBp(bp.key)}
            title={bp.title}
            className={`flex-1 py-1.5 text-xs font-medium transition-colors ${
              activeBp === bp.key
                ? 'bg-accent text-bg'
                : 'text-muted hover:text-ink'
            }`}
          >
            {bp.label} {bp.key.charAt(0).toUpperCase() + bp.key.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-3 flex flex-col gap-3">
        {/* Font Size */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[9px] font-bold text-muted uppercase tracking-wider">Tamaño</label>
            <span className="text-[10px] font-mono text-accent">{currentStyle.fontSize}px</span>
          </div>
          <input
            type="range"
            min={8} max={120} step={1}
            value={currentStyle.fontSize || 16}
            onChange={e => updateStyle('fontSize', Number(e.target.value))}
            className="w-full h-1.5 accent-accent cursor-pointer"
          />
        </div>

        {/* Color */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-bold text-muted uppercase tracking-wider flex-1">Color</label>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={currentStyle.color || '#ffffff'}
              onChange={e => updateStyle('color', e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border border-border bg-transparent"
              title="Color del texto"
            />
            <input
              type="text"
              value={currentStyle.color || ''}
              onChange={e => updateStyle('color', e.target.value)}
              placeholder="auto"
              className="w-20 px-2 py-1 text-[10px] font-mono border border-border rounded bg-bg text-ink outline-none focus:ring-1 focus:ring-accent"
            />
            {currentStyle.color && (
              <button
                onClick={() => updateStyle('color', '')}
                className="text-muted hover:text-red-400 text-[10px]"
                title="Quitar color"
              >✕</button>
            )}
          </div>
        </div>

        {/* Font Weight */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-bold text-muted uppercase tracking-wider flex-1">Peso</label>
          <select
            value={currentStyle.fontWeight || '400'}
            onChange={e => updateStyle('fontWeight', e.target.value)}
            className="text-[10px] border border-border rounded px-2 py-1 bg-bg text-ink outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="100">Thin (100)</option>
            <option value="200">ExtraLight (200)</option>
            <option value="300">Light (300)</option>
            <option value="400">Regular (400)</option>
            <option value="500">Medium (500)</option>
            <option value="600">SemiBold (600)</option>
            <option value="700">Bold (700)</option>
            <option value="800">ExtraBold (800)</option>
            <option value="900">Black (900)</option>
          </select>
        </div>

        {/* Font Family */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-bold text-muted uppercase tracking-wider flex-1">Familia</label>
          <select
            value={currentStyle.fontFamily || ''}
            onChange={e => updateStyle('fontFamily', e.target.value)}
            className="text-[10px] border border-border rounded px-2 py-1 bg-bg text-ink outline-none focus:ring-1 focus:ring-accent w-24"
          >
            <option value="">Por Defecto</option>
            <option value="var(--font-display)">Display</option>
            <option value="var(--font-body)">Body</option>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Mono</option>
          </select>
        </div>

        {/* Text Align */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-bold text-muted uppercase tracking-wider flex-1">Alineación</label>
          <select
            value={currentStyle.textAlign || ''}
            onChange={e => updateStyle('textAlign', e.target.value)}
            className="text-[10px] border border-border rounded px-2 py-1 bg-bg text-ink outline-none focus:ring-1 focus:ring-accent w-24"
          >
            <option value="">Por Defecto</option>
            <option value="left">Izquierda</option>
            <option value="center">Centro</option>
            <option value="right">Derecha</option>
            <option value="justify">Justificado</option>
          </select>
        </div>

        {/* Font Style */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-bold text-muted uppercase tracking-wider flex-1">Estilo</label>
          <select
            value={currentStyle.fontStyle || 'normal'}
            onChange={e => updateStyle('fontStyle', e.target.value)}
            className="text-[10px] border border-border rounded px-2 py-1 bg-bg text-ink outline-none focus:ring-1 focus:ring-accent w-24"
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="oblique">Oblique</option>
          </select>
        </div>

        {/* Text Decoration */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-bold text-muted uppercase tracking-wider flex-1">Decoración</label>
          <select
            value={currentStyle.textDecoration || 'none'}
            onChange={e => updateStyle('textDecoration', e.target.value)}
            className="text-[10px] border border-border rounded px-2 py-1 bg-bg text-ink outline-none focus:ring-1 focus:ring-accent w-24"
          >
            <option value="none">None</option>
            <option value="underline">Subrayado</option>
            <option value="line-through">Tachado</option>
          </select>
        </div>

        {/* Text Transform */}
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-bold text-muted uppercase tracking-wider flex-1">Transformar</label>
          <select
            value={currentStyle.textTransform || 'none'}
            onChange={e => updateStyle('textTransform', e.target.value)}
            className="text-[10px] border border-border rounded px-2 py-1 bg-bg text-ink outline-none focus:ring-1 focus:ring-accent w-24"
          >
            <option value="none">None</option>
            <option value="uppercase">UPPERCASE</option>
            <option value="lowercase">lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </div>

        {/* Letter Spacing */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[9px] font-bold text-muted uppercase tracking-wider">Espaciado letras</label>
            <span className="text-[10px] font-mono text-accent">{currentStyle.letterSpacing}em</span>
          </div>
          <input
            type="range"
            min={-0.1} max={0.5} step={0.01}
            value={currentStyle.letterSpacing ?? 0}
            onChange={e => updateStyle('letterSpacing', parseFloat(e.target.value).toFixed(2))}
            className="w-full h-1.5 accent-accent cursor-pointer"
          />
        </div>

        {/* Line Height */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[9px] font-bold text-muted uppercase tracking-wider">Altura de línea</label>
            <span className="text-[10px] font-mono text-accent">{currentStyle.lineHeight}</span>
          </div>
          <input
            type="range"
            min={0.7} max={3} step={0.05}
            value={currentStyle.lineHeight ?? 1.5}
            onChange={e => updateStyle('lineHeight', parseFloat(e.target.value).toFixed(2))}
            className="w-full h-1.5 accent-accent cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Text Field with optional Typography ───────────────────────────────────

function TextField({ fieldKey, label, long, value, onChange, styles, onStylesChange, hasTypography }) {
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
            className="w-full p-2.5 border border-border rounded-lg text-sm min-h-[100px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all resize-y"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full p-2.5 border border-border rounded-lg text-sm bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
          />
        )}
      </div>

      {hasTypography && showTypo && (
        <div className="px-3 pb-3">
          <TypographyControls
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

function PosterSrcField({ value, onChange }) {
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
        {value && (
          <div className="mb-2 relative rounded-lg overflow-hidden border border-border h-28 bg-s1">
            <img src={value} alt="poster" className="w-full h-full object-cover" />
          </div>
        )}

        {/* URL input */}
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="/images/og-portafolio.jpg"
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

// ─── Video URLs Accordion ─────────────────────────────────────────────────

function VideoFieldsAccordion({ props, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeSide, setActiveSide] = useState('mobile');

  const fields = VIDEO_FIELDS[activeSide] || [];

  return (
    <div className="rounded-xl border border-border bg-bg overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">URLs de Video</span>
          <span className="text-[9px] text-muted/60">(AV1 · VP9 · H.264)</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div className="border-t border-border px-3 pb-3">
          {/* Side tabs */}
          <div className="flex gap-1 mt-3 mb-3">
            {['mobile', 'desktop'].map(side => (
              <button
                key={side}
                onClick={() => setActiveSide(side)}
                className={`flex-1 py-1 text-[10px] font-medium rounded-md transition-colors ${
                  activeSide === side ? 'bg-accent text-bg' : 'bg-s1 text-muted hover:text-ink border border-border'
                }`}
              >
                {side === 'mobile' ? '📱 Móvil' : '🖥 Desktop'}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {fields.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-1">{label}</label>
                <input
                  type="text"
                  value={props[key] || ''}
                  onChange={e => onChange(key, e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2 border border-border rounded-lg text-xs bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all font-mono"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Generic Field (for other component types) ────────────────────────────

function GenericField({ propKey, val, onChange }) {
  if (typeof val === 'string') {
    return (
      <div className="rounded-xl border border-border bg-bg px-3 py-3">
        <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">{propKey}</label>
        {val.length > 60 ? (
          <textarea
            value={val}
            onChange={e => onChange(e.target.value)}
            className="w-full p-2.5 border border-border rounded-lg text-sm min-h-[100px] bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all resize-y"
          />
        ) : (
          <input
            type="text"
            value={val}
            onChange={e => onChange(e.target.value)}
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

export default function SmartPropertiesPanel({ comp, updateProp, onClose }) {
  const { props, type } = comp;

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
              hasTypography
            />
          ))}

          <SectionLabel>Imagen Poster</SectionLabel>

          {/* posterSrc with upload */}
          <PosterSrcField
            value={props.posterSrc || ''}
            onChange={val => updateProp(comp.id, 'posterSrc', val)}
          />

          <SectionLabel>Video</SectionLabel>

          {/* Video URLs accordion */}
          <VideoFieldsAccordion
            props={props}
            onChange={(key, val) => updateProp(comp.id, key, val)}
          />

          <SectionLabel>Botones</SectionLabel>

          {/* Button fields */}
          {HERO_EDITORIAL_BUTTON_FIELDS.map(({ key, label }) => (
            <div key={key} className="rounded-xl border border-border bg-bg px-3 py-3">
              <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">{label}</label>
              <input
                type="text"
                value={props[key] || ''}
                onChange={e => updateProp(comp.id, key, e.target.value)}
                className="w-full p-2.5 border border-border rounded-lg text-sm bg-s1 focus:bg-s2 focus:ring-1 focus:ring-accent outline-none transition-all"
              />
            </div>
          ))}
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
            />
          );
        })}
      </div>
    </div>
  );
}
