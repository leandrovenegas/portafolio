import React, { useState, useEffect } from 'react';

// Helper to convert style object into CSS inline styles
function toInlineStyle(styleObj) {
  if (!styleObj) return {};
  const s = {};
  if (styleObj.fontSize)      s.fontSize      = `${styleObj.fontSize}px`;
  if (styleObj.color)         s.color         = styleObj.color;
  if (styleObj.fontWeight)    s.fontWeight    = styleObj.fontWeight;
  if (styleObj.fontStyle)     s.fontStyle     = styleObj.fontStyle;
  if (styleObj.fontFamily)    s.fontFamily    = styleObj.fontFamily;
  if (styleObj.textAlign)     s.textAlign     = styleObj.textAlign;
  if (styleObj.textDecoration)s.textDecoration= styleObj.textDecoration;
  if (styleObj.textTransform && styleObj.textTransform !== 'none') s.textTransform = styleObj.textTransform;
  if (styleObj.letterSpacing !== undefined && styleObj.letterSpacing !== '') s.letterSpacing = `${styleObj.letterSpacing}em`;
  return s;
}

export default function Button({ 
  bg = 'var(--ps-bg-panel)', 
  borderColor = 'var(--ps-border)', 
  borderRadius = 'var(--ps-radius)',
  buttonText = 'Hacer clic aquí',
  buttonLink = '#',
  _styles,
  forceBp,
  onPropChange,
  activeGridId,
  id
}) {
  const [bp, setBp] = useState(forceBp || 'mobile');

  useEffect(() => {
    if (forceBp) {
      setBp(forceBp);
      return;
    }
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

  const isEditorActive = activeGridId !== null;
  const isEditable = isEditorActive;

  const editableOutline = isEditable
    ? {
        outline: '1.5px dashed rgba(250, 204, 21, 0.55)',
        outlineOffset: '3px',
        borderRadius: '2px',
        cursor: 'text',
        minWidth: '2rem',
      }
    : {};

  const content = (
    <>
      <span
        data-field="buttonText"
        contentEditable={isEditable}
        suppressContentEditableWarning
        onBlur={(e) => onPropChange?.('buttonText', e.currentTarget.innerText)}
        className="font-display font-bold tracking-widest uppercase"
        style={{ ...fieldStyle('buttonText'), ...(isEditable ? editableOutline : {}) }}
      >
        {buttonText}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </>
  );

  const containerClasses = "group inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent text-bg hover:bg-white hover:text-bg transition-colors duration-300 rounded-xl shadow-2xl shadow-accent/10";
  
  // Render en modo editor
  if (isEditorActive) {
    return (
      <div 
        className="w-full h-full relative group/buttoncontainer flex items-center justify-center"
        style={{ 
          background: bg, 
          border: `1px solid ${borderColor}`,
          borderRadius: borderRadius,
        }}
        data-field="bg"
      >
        {/* Etiqueta visual para identificar el componente */}
        <div className="absolute top-0 left-0 bg-border text-muted text-[10px] px-2 py-0.5 font-mono uppercase tracking-widest z-10 opacity-0 group-hover/buttoncontainer:opacity-100 transition-opacity pointer-events-none">
          Button
        </div>

        {/* Drag handle exclusivo para texto */}
        <div 
          className="drag-handle absolute top-2 right-2 p-1.5 bg-black/40 hover:bg-black/60 rounded cursor-move opacity-0 group-hover/buttoncontainer:opacity-100 transition-opacity z-[110] text-white"
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

        <div className={containerClasses}>
          {content}
        </div>
      </div>
    );
  }

  // Render modo público
  return (
    <div 
      className="w-full h-full flex items-center justify-center"
      style={{ 
        background: bg, 
        border: `1px solid ${borderColor}`,
        borderRadius: borderRadius,
      }}
    >
      <a
        href={buttonLink}
        target="_blank"
        rel="noopener noreferrer"
        className={containerClasses}
      >
        {content}
      </a>
    </div>
  );
}
