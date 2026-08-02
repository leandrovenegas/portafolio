'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroVideo from "@/components/HeroVideo";
import Link from "next/link";
import { useCart } from '@/components/carrito/CartContext';

// Converts a style config object into a React inline style object
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
  if (styleObj.textTransform && styleObj.textTransform !== 'none') s.textTransform = styleObj.textTransform;
  if (styleObj.letterSpacing !== undefined && styleObj.letterSpacing !== '') s.letterSpacing = `${styleObj.letterSpacing}em`;
  
  if (styleObj.lineHeight !== undefined && styleObj.lineHeight !== '') {
    s.lineHeight = styleObj.lineHeight;
    if (Number(styleObj.lineHeight) < 0) {
      s.marginTop = `${styleObj.lineHeight}em`;
      s.lineHeight = 'normal';
    }
  }
  
  if (styleObj.textIndent !== undefined && styleObj.textIndent !== '') s.textIndent = `${styleObj.textIndent}px`;
  if (styleObj.paddingTop !== undefined && styleObj.paddingTop !== '') s.paddingTop = `${styleObj.paddingTop}px`;
  if (styleObj.paddingBottom !== undefined && styleObj.paddingBottom !== '') s.paddingBottom = `${styleObj.paddingBottom}px`;
  return s;
}

export default function HeroEditorialSection({ 
  headline = "GRABO Y EDITO TUS VIDEOS ",
  headlineKeyword = "DURANTE TODO UN MES",
  subtitle = "Partner Audiovisual para Marcas y Creadores",
  bodyText = "Soy Leandro Venegas. Me integro a tu equipo como un partner audiovisual, cubriendo grabación, edición y publicación según tu calendario, sin contratar full-time ni cambiar de freelancer cada vez.",
  tagline,
  roleText = "EDITOR DE VIDEO & DIRECTOR CREATIVO",
  statusText = "DISPONIBLE PARA PROYECTOS",
  statusColor = "#4caf50",
  primaryButtonText = "Contactar",
  primaryButtonLink = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20quiero%20contarte%20de%20mi%20proyecto.",
  primaryButtonIcon,
  secondaryButtonText,
  secondaryButtonLink,
  secondaryButtonIcon,
  mobileVideoGuid,
  tabletVideoGuid,
  desktopVideoGuid,
  posterSrc,
  posterAlt,
  productSlug,
  _styles,
  forceBp = null,
  backgroundType = 'video',
  backgroundColor = '#121212',
  backgroundGradient = 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)',
  avatarSrc = '/images/leandro-avatar.png',
  avatarAlt = 'Leandro Venegas'
}) {
  const [bp, setBp] = useState(forceBp || 'mobile');
  const { addItem, items } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  // Fetch product by slug when productSlug is set
  useEffect(() => {
    if (!productSlug) return;
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const found = data.find(p => p.slug === productSlug && p.is_active);
          if (found) setProduct(found);
        }
      })
      .catch(() => {});
  }, [productSlug]);

  const isAdded = product ? items.some(i => i.id === product.id) : false;

  const handleCartClick = () => {
    if (product && !isAdded) addItem(product);
    router.push('/carrito');
  };

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

  const IconRenderer = ({ icon }) => {
    if (!icon || icon === 'none') return null;
    switch (icon) {
      case 'cart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        );
      case 'arrow-right':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        );
      case 'play':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <HeroVideo
      mobileVideoGuid={mobileVideoGuid || ""}
      tabletVideoGuid={tabletVideoGuid || ""}
      desktopVideoGuid={desktopVideoGuid || ""}
      posterSrc={posterSrc || ""}
      alt={posterAlt || headline || "Reel Audiovisual"}
      title={headline}
      description={bodyText}
      forceBp={forceBp}
      backgroundType={backgroundType}
      backgroundColor={backgroundColor}
      backgroundGradient={backgroundGradient}
    >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Columna Izquierda: Información Principal (Headline, Subtitle, BodyText, Tagline) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {(headline || headlineKeyword) && (
              <h1 className="font-display font-bold leading-[0.95] text-ink max-w-full">
                <span data-field="headline" style={fieldStyle('headline')}>{headline}</span>
                {headlineKeyword && (
                  <span data-field="headlineKeyword" className={`text-accent ${bp === 'desktop' ? 'inline' : 'block'}`} style={fieldStyle('headlineKeyword')}>
                    {' '}{headlineKeyword}
                  </span>
                )}
              </h1>
            )}

            {subtitle && (
              <h2 data-field="subtitle" className="font-display font-medium text-ink/80 text-lg md:text-xl mt-4 max-w-2xl" style={fieldStyle('subtitle')}>
                {subtitle}
              </h2>
            )}

            {bodyText && (
              <p
                data-field="bodyText"
                className="font-body leading-relaxed text-ink/80 max-w-2xl mt-4"
                style={fieldStyle('bodyText')}
              >
                {formatBodyText(bodyText)}
              </p>
            )}

            {tagline && (
              <div className="border-l-4 border-accent pl-4 py-1 mt-4 max-w-2xl text-left">
                <p
                  data-field="tagline"
                  className="font-body font-medium text-ink"
                  style={fieldStyle('tagline')}
                >
                  {tagline}
                </p>
              </div>
            )}

            {/* Secundary CTA si existe fuera de la tarjeta */}
            {secondaryButtonText && secondaryButtonLink && (
              <div className="mt-6 flex justify-center lg:justify-start">
                <Link 
                  href={secondaryButtonLink}
                  className="inline-flex items-center gap-2 text-ink/80 hover:text-accent transition-colors font-body font-medium text-sm"
                >
                  <IconRenderer icon={secondaryButtonIcon || 'arrow-right'} />
                  {secondaryButtonText}
                </Link>
              </div>
            )}
          </div>

          {/* Columna Derecha: Credencial / Staff Pass Badge */}
          <div className="lg:col-span-5 flex justify-center w-full pt-8 lg:pt-0">
            <div 
              className="group w-full max-w-sm rounded-xl p-5 border shadow-2xl relative transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-accent/60"
              style={{
                backgroundColor: 'var(--ps-bg-panel, #2c2c2c)',
                borderColor: 'var(--ps-border, #444444)',
                boxShadow: 'var(--shadow-panel, 0 8px 32px rgba(0, 0, 0, 0.5))'
              }}
            >
              {/* Lanyard Cinta en Forma de V (Centrada horizontalmente en la tarjeta y cortada hacia arriba) */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-10 w-28 h-10 flex justify-center items-end overflow-hidden">
                <svg 
                  width="64" 
                  height="40" 
                  viewBox="0 0 64 40" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 ease-out origin-bottom group-hover:rotate-2 group-hover:-translate-y-0.5"
                >
                  {/* Cinta Izquierda en V */}
                  <path 
                    d="M4 0L32 34L28 36L0 0H4Z" 
                    fill="var(--ps-border-light, #555555)" 
                    fillOpacity="0.4"
                  />
                  {/* Cinta Derecha en V */}
                  <path 
                    d="M60 0L32 34L36 36L64 0H60Z" 
                    fill="var(--ps-border-light, #555555)" 
                    fillOpacity="0.4"
                  />
                  {/* Broche metálico de unión */}
                  <rect x="26" y="32" width="12" height="6" rx="1.5" fill="var(--ps-bg-toolbar, #3c3c3c)" stroke="var(--ps-border, #444444)" strokeWidth="1" />
                </svg>
              </div>

              {/* Tag Superior de la Credencial */}
              <div className="flex items-center justify-between pb-3 mb-4 pt-1 border-b border-[var(--ps-border-dark,#333333)] text-[10px] tracking-widest text-[var(--ps-text-dim,#888888)] font-mono uppercase">
                <span>STAFF PASS // ID-2026</span>
                <span className="text-[var(--ps-accent,#1473e6)] font-bold">VERIFIED</span>
              </div>

              {/* Grid de la Credencial usando CSS Grid nativo */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateAreas: bp === 'mobile' 
                    ? '"avatar" "info" "status" "cta"'
                    : '"avatar info" "status status" "cta cta"',
                  gridTemplateColumns: bp === 'mobile' ? '1fr' : '84px 1fr',
                  gap: '1rem',
                  alignItems: 'center'
                }}
              >
                {/* Area Avatar */}
                <div style={{ gridArea: 'avatar' }} className="flex justify-center items-center">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-[var(--ps-accent,#1473e6)] bg-[var(--ps-bg-input,#1a1a1a)] shadow-md">
                    {avatarSrc ? (
                      <img
                        src={avatarSrc}
                        alt={avatarAlt || 'Staff Avatar'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[var(--ps-text-dim,#888888)]">
                        PHOTO
                      </div>
                    )}
                  </div>
                </div>

                {/* Area Info: Nombre y Rol */}
                <div style={{ gridArea: 'info' }} className="flex flex-col justify-center text-center md:text-left">
                  <h3 
                    className="text-base md:text-lg font-bold font-display text-[var(--ps-text,#d4d4d4)] leading-tight"
                    data-field="avatarAlt"
                  >
                    {avatarAlt || 'Leandro Venegas'}
                  </h3>
                  {roleText && (
                    <p 
                      data-field="roleText" 
                      className="text-[11px] font-mono text-[var(--ps-text-dim,#888888)] mt-1 uppercase leading-snug"
                      style={fieldStyle('roleText')}
                    >
                      {roleText}
                    </p>
                  )}
                </div>

                {/* Area Status */}
                <div 
                  style={{ gridArea: 'status' }} 
                  className="flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded bg-[var(--ps-bg-input,#1a1a1a)] border border-[var(--ps-border-dark,#333333)] text-xs"
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse" 
                    style={{ backgroundColor: statusColor || 'var(--ps-success, #4caf50)' }}
                  />
                  {statusText && (
                    <span 
                      data-field="statusText" 
                      className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-[var(--ps-text,#d4d4d4)] truncate"
                      style={fieldStyle('statusText')}
                    >
                      {statusText}
                    </span>
                  )}
                </div>

                {/* Area CTA */}
                <div style={{ gridArea: 'cta' }} className="w-full pt-1">
                  {primaryButtonText && (primaryButtonLink || primaryButtonIcon === 'cart') && (
                    primaryButtonIcon === 'cart' ? (
                      <button
                        onClick={handleCartClick}
                        className="w-full flex items-center justify-center gap-2 bg-[var(--ps-accent,#1473e6)] text-white hover:bg-[var(--ps-accent-hover,#1a88ff)] px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
                      >
                        {isAdded ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M20 6L9 17l-5-5"/></svg>
                        ) : (
                          <IconRenderer icon="cart" />
                        )}
                        {isAdded ? 'En tu pedido →' : primaryButtonText}
                      </button>
                    ) : (
                      <Link 
                        href={primaryButtonLink}
                        className="w-full flex items-center justify-center gap-2 bg-[var(--ps-accent,#1473e6)] text-white hover:bg-[var(--ps-accent-hover,#1a88ff)] px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-md text-center"
                      >
                        <IconRenderer icon={primaryButtonIcon} />
                        {primaryButtonText}
                      </Link>
                    )
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </HeroVideo>
  );
}
