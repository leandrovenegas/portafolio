'use client';

import { useState, useEffect } from 'react';

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
  
  if (styleObj.lineHeight !== undefined && styleObj.lineHeight !== '') {
    s.lineHeight = styleObj.lineHeight;
    if (Number(styleObj.lineHeight) < 0) {
      s.marginTop = `${styleObj.lineHeight}em`;
      s.lineHeight = 'normal';
    }
  }
  
  return s;
}

export default function EstrelasSection({
  rating = 5,
  reviewCount = 0,
  showLabel = true,
  title = '',
  description = '',
  alignment = 'center',
  backgroundColor = '',
  starSizes = { mobile: 28, tablet: 36, desktop: 48 },
  _styles,
  forceBp = null
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

  // Tamaños responsivos desde props o defaults
  const getStarSize = () => {
    if (starSizes && starSizes[bp]) return starSizes[bp];
    if (bp === 'mobile') return 28;
    if (bp === 'tablet') return 36;
    return 48;
  };

  const getSpacing = () => {
    const size = getStarSize();
    return Math.round(size * 0.25); // Espaciado proporcional al tamaño
  };

  const getTitleSize = () => {
    if (bp === 'mobile') return 20;
    if (bp === 'tablet') return 24;
    return 28;
  };

  const getTextSize = () => {
    if (bp === 'mobile') return 14;
    if (bp === 'tablet') return 16;
    return 18;
  };

  const starSize = getStarSize();
  const spacing = getSpacing();

  // Componente de estrella individual
  const Star = ({ filled }) => (
    <svg
      width={starSize}
      height={starSize}
      viewBox="0 0 24 24"
      fill={filled ? '#FCD34D' : '#E5E7EB'}
      stroke={filled ? '#FBBF24' : '#D1D5DB'}
      strokeWidth={0.5}
      style={{ transition: 'all 0.3s ease' }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  // Validar que rating esté entre 0 y 5
  const normalizedRating = Math.min(Math.max(Math.round(rating), 0), 5);

  const alignmentClass = alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center';
  const textAlignClass = alignment === 'left' ? 'text-left' : alignment === 'right' ? 'text-right' : 'text-center';

  return (
    <div 
      className={`w-full transition-colors duration-300 ${backgroundColor ? '' : 'bg-white'}`}
      style={{ backgroundColor: backgroundColor || 'white' }}
    >
      <div className={`px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20`}>
        <div className="mx-auto max-w-4xl">
          {/* Contenedor de estrellas */}
          <div className={`flex flex-col gap-6 sm:gap-8 ${textAlignClass}`}>
            {/* Estrellas */}
            <div className={`flex gap-${spacing === 6 ? '1' : spacing === 8 ? '2' : '3'} ${alignmentClass}`} style={{ gap: `${spacing}px` }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-shrink-0">
                  <Star filled={i < normalizedRating} />
                </div>
              ))}
            </div>

            {/* Título si existe */}
            {title && (
              <h3 
                data-field="title"
                className="font-bold tracking-tight text-gray-900 font-display"
                style={{ 
                  ...fieldStyle('title'),
                  fontSize: fieldStyle('title').fontSize || `${getTitleSize()}px`
                }}
              >
                {title}
              </h3>
            )}

            {/* Descripción si existe */}
            {description && (
              <p 
                data-field="description"
                className="text-gray-600 leading-relaxed font-body"
                style={{ 
                  ...fieldStyle('description'),
                  fontSize: fieldStyle('description').fontSize || `${getTextSize()}px`
                }}
              >
                {description}
              </p>
            )}

            {/* Rating con reseñas si está habilitado */}
            {showLabel && (
              <div className="flex flex-col gap-2 sm:gap-3">
                <p className="font-semibold text-gray-900" style={{ fontSize: `${getTextSize()}px` }}>
                  {normalizedRating.toFixed(1)} / 5
                </p>
                {reviewCount > 0 && (
                  <p className="text-sm sm:text-base text-gray-500">
                    {reviewCount} {reviewCount === 1 ? 'reseña' : 'reseñas'}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
