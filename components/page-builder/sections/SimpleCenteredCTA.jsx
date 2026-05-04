'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  if (styleObj.lineHeight)    s.lineHeight    = styleObj.lineHeight;
  if (styleObj.textIndent !== undefined && styleObj.textIndent !== '') s.textIndent = `${styleObj.textIndent}px`;
  if (styleObj.paddingTop !== undefined && styleObj.paddingTop !== '') s.paddingTop = `${styleObj.paddingTop}px`;
  if (styleObj.paddingBottom !== undefined && styleObj.paddingBottom !== '') s.paddingBottom = `${styleObj.paddingBottom}px`;
  return s;
}

export default function SimpleCenteredCTA({
  headline,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundColor,
  _styles
}) {
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

  const formatDescription = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div style={{ backgroundColor: backgroundColor || 'var(--accent, #3b82f6)' }} className="transition-colors duration-300">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          
          {headline && (
            <h2 
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display"
              style={fieldStyle('headline')}
            >
              {headline}
            </h2>
          )}
          
          {description && (
            <p 
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80 font-body"
              style={fieldStyle('description')}
            >
              {formatDescription(description)}
            </p>
          )}

          <div className="mt-10 flex items-center justify-center gap-x-6">
            {primaryButtonText && primaryButtonLink && (
              <Link
                href={primaryButtonLink}
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-ink shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {primaryButtonText}
              </Link>
            )}
            
            {secondaryButtonText && secondaryButtonLink && (
              <Link 
                href={secondaryButtonLink} 
                className="text-sm font-semibold leading-6 text-white hover:text-white/80 transition-colors"
              >
                {secondaryButtonText} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
