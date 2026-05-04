'use client';
import { useState, useEffect } from 'react';

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
  if (styleObj.lineHeight)    s.lineHeight    = styleObj.lineHeight;
  if (styleObj.textIndent !== undefined && styleObj.textIndent !== '') s.textIndent = `${styleObj.textIndent}px`;
  if (styleObj.paddingTop !== undefined && styleObj.paddingTop !== '') s.paddingTop = `${styleObj.paddingTop}px`;
  if (styleObj.paddingBottom !== undefined && styleObj.paddingBottom !== '') s.paddingBottom = `${styleObj.paddingBottom}px`;
  return s;
}

export default function TextSection({ title, paragraphs, description, _styles }) {
  const [bp, setBp] = useState('mobile');

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBp(w >= 1024 ? 'desktop' : w >= 768 ? 'tablet' : 'mobile');
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const fieldStyle = (fieldName) => {
    if (!_styles || !_styles[fieldName]) return {};
    return toInlineStyle(_styles[fieldName][bp]);
  };

  const renderText = (p) => {
    if (p.includes("<Link")) {
      return (
        <span dangerouslySetInnerHTML={{
          __html: p.replace(
            /<Link href='([^']+)' className='([^']+)'>([^<]+)<\/Link>/g, 
            "<a href='$1' class='$2'>$3</a>"
          )
        }} />
      );
    }
    return p;
  };

  const bodyText = description !== undefined ? description : (paragraphs ? paragraphs.join('\n\n') : '');

  return (
    <section>
      {title && (
        <h2 
          className="font-display text-4xl md:text-5xl text-ink max-w-3xl mb-8"
          style={fieldStyle('title')}
        >
          {title}
        </h2>
      )}
      {bodyText && bodyText.split('\n').map((p, i) => {
        if (!p.trim()) return <br key={i} />;
        return (
          <p 
            key={i} 
            className="font-body text-mid text-lg leading-relaxed mb-6 last:mb-0"
            style={fieldStyle('description')}
          >
            {renderText(p)}
          </p>
        );
      })}
    </section>
  );
}
