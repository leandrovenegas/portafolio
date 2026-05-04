'use client';

import { useState, useEffect } from 'react';
import HeroVideo from "@/components/HeroVideo";
import Link from "next/link";

// Converts a style config object into a React inline style object
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
  return s;
}

export default function HeroEditorialSection({ 
  pillText,
  headline,
  headlineKeyword,
  bodyText,
  tagline,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  mobileAV1, 
  mobileVP9, 
  mobileH264, 
  desktopAV1,
  desktopVP9,
  desktopH264,
  posterSrc,
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

  // Helper: get inline style for a field at current breakpoint
  const fieldStyle = (fieldName) => {
    if (!_styles || !_styles[fieldName]) return {};
    return toInlineStyle(_styles[fieldName][bp]);
  };

  // Procesamos el texto del cuerpo para buscar frases entre comillas y darles estilo
  const formatBodyText = (text) => {
    if (!text) return null;
    const parts = text.split(/(".*?")/g);
    return parts.map((part, index) => {
      if (part.startsWith('"') && part.endsWith('"')) {
        return <strong key={index} className="text-ink font-bold">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <HeroVideo
      mobileAV1={mobileAV1 || ""}
      mobileVP9={mobileVP9 || ""}
      mobileH264={mobileH264 || ""}
      desktopAV1={desktopAV1 || ""}
      desktopVP9={desktopVP9 || ""}
      desktopH264={desktopH264 || ""}
      posterSrc={posterSrc || ""}
    >
      <div className="flex flex-col items-start gap-6 w-full max-w-full md:max-w-3xl">
        
        {/* Pill Tag */}
        {pillText && (
          <div
            className="px-3 py-1 rounded-full border border-accent/30 text-accent text-[10px] tracking-[0.2em] uppercase mb-2 bg-accent/5"
            style={fieldStyle('pillText')}
          >
            {pillText}
          </div>
        )}

        {/* Headline */}
        {(headline || headlineKeyword) && (
          <h1 className="font-display font-bold leading-[0.95] text-ink max-w-full">
            <span style={fieldStyle('headline')}>{headline}</span>
            {headlineKeyword && (
              <span className="text-accent block md:inline" style={fieldStyle('headlineKeyword')}>
                {' '}{headlineKeyword}
              </span>
            )}
          </h1>
        )}

        {/* Body Text */}
        {bodyText && (
          <p
            className="font-body leading-relaxed text-ink/80 max-w-2xl mt-4"
            style={fieldStyle('bodyText')}
          >
            {formatBodyText(bodyText)}
          </p>
        )}

        {/* Tagline */}
        {tagline && (
          <div className="border-l-4 border-accent pl-4 py-1 mt-2">
            <p
              className="font-body font-medium text-ink"
              style={fieldStyle('tagline')}
            >
              {tagline}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-6 mt-8">
          {primaryButtonText && primaryButtonLink && (
            <Link 
              href={primaryButtonLink}
              className="bg-ink text-bg px-8 py-4 rounded-lg font-body font-medium hover:bg-accent hover:text-bg transition-colors shadow-lg"
            >
              {primaryButtonText}
            </Link>
          )}
          
          {secondaryButtonText && secondaryButtonLink && (
            <Link 
              href={secondaryButtonLink}
              className="flex items-center gap-2 text-ink/70 hover:text-accent transition-colors font-body font-medium"
            >
              {secondaryButtonText}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          )}
        </div>

      </div>
    </HeroVideo>
  );
}
