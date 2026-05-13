'use client';

import { useState, useEffect } from 'react';

/**
 * Componente de Estrellas responsivo
 * Idéntico al estilo de Google My Business
 * 
 * @param {number} rating - Número de estrellas (0-5)
 * @param {number} size - Tamaño base de las estrellas ('sm', 'md', 'lg')
 * @param {string} className - Clases CSS adicionales
 * @param {boolean} interactive - Permitir hover
 */
export default function Estrellas({ 
  rating = 5, 
  size = 'md',
  className = '',
  interactive = false,
  reviewCount = null
}) {
  const [isHovering, setIsHovering] = useState(-1);

  // Validar que rating esté entre 0 y 5
  const normalizedRating = Math.min(Math.max(Math.round(rating), 0), 5);

  // Tamaños responsivos
  const sizeMap = {
    sm: { star: 16, gap: 2 },
    md: { star: 24, gap: 4 },
    lg: { star: 32, gap: 6 }
  };

  const sizeConfig = sizeMap[size] || sizeMap.md;

  const Star = ({ filled, index }) => (
    <svg
      width={sizeConfig.star}
      height={sizeConfig.star}
      viewBox="0 0 24 24"
      fill={interactive && index <= isHovering ? '#FCD34D' : filled ? '#FCD34D' : '#E5E7EB'}
      stroke={interactive && index <= isHovering ? '#FBBF24' : filled ? '#FBBF24' : '#D1D5DB'}
      strokeWidth={0.5}
      style={{ 
        transition: 'all 0.2s ease',
        cursor: interactive ? 'pointer' : 'default'
      }}
      onMouseEnter={() => interactive && setIsHovering(index)}
      onMouseLeave={() => interactive && setIsHovering(-1)}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Estrellas */}
      <div className="flex" style={{ gap: `${sizeConfig.gap}px` }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0">
            <Star filled={i < normalizedRating} index={i} />
          </div>
        ))}
      </div>

      {/* Rating y reseñas */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-semibold text-gray-900" style={{ fontSize: `${sizeConfig.star * 0.8}px` }}>
          {normalizedRating.toFixed(1)} / 5
        </span>
        {reviewCount !== null && (
          <span className="text-xs sm:text-sm text-gray-500">
            {reviewCount} {reviewCount === 1 ? 'reseña' : 'reseñas'}
          </span>
        )}
      </div>
    </div>
  );
}
