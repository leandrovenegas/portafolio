'use client';
import { useState, useEffect } from 'react';

export default function LogosSection({
  title = '',
  subtitle = '',
  logos = [],
  layout = 'marquee', // 'marquee' | 'grid'
  logoTheme = 'grayscale-dark', // 'grayscale-dark' | 'grayscale-light' | 'color'
  logoHeight = 35,
  speed = 'medium', // 'slow' | 'medium' | 'fast'
  backgroundColor = '',
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

  // Determine marquee speed duration
  const speedDuration = {
    slow: '40s',
    medium: '25s',
    fast: '12s'
  }[speed] || '25s';

  // Determine logo image CSS filter classes based on theme
  const getLogoClass = () => {
    switch (logoTheme) {
      case 'grayscale-dark':
        // Solid white on dark, brighter on hover
        return 'brightness-0 invert opacity-40 hover:opacity-100 transition-all duration-300 object-contain';
      case 'grayscale-light':
        // Solid black on light, darker on hover
        return 'brightness-0 opacity-40 hover:opacity-100 transition-all duration-300 object-contain';
      case 'color':
      default:
        // Grayscale normally, colors on hover
        return 'grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain';
    }
  };

  const logoList = (logos || []).filter(logo => logo && typeof logo.src === 'string' && logo.src.trim() !== '');

  // If layout is marquee, we repeat list to ensure overflow and seamless looping
  let listToRender = logoList;
  if (layout === 'marquee' && listToRender.length > 0 && listToRender.length < 10) {
    const repeats = Math.ceil(10 / listToRender.length);
    let repeated = [];
    for (let i = 0; i < repeats; i++) {
      repeated = [...repeated, ...listToRender];
    }
    listToRender = repeated;
  }

  // Section style
  const sectionStyle = {
    backgroundColor: backgroundColor || 'transparent',
    '--bg-color': backgroundColor || '#000000'
  };

  // Check if we have logos
  const hasLogos = logoList.length > 0;

  return (
    <section 
      className="w-full py-8 transition-colors duration-300"
      style={sectionStyle}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll linear infinite;
        }
      `}} />

      {/* Title & Subtitle - Hide if empty */}
      {((title && title.trim() !== '') || (subtitle && subtitle.trim() !== '')) && (
        <div className="text-center mb-8 px-4 max-w-3xl mx-auto">
          {title && title.trim() !== '' && (
            <h2 data-field="title" className="text-sm font-bold text-ink uppercase tracking-widest mb-2 font-display">
              {title}
            </h2>
          )}
          {subtitle && subtitle.trim() !== '' && (
            <p data-field="subtitle" className="text-xs text-muted font-body">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Logo Display Container */}
      {!hasLogos ? (
        <div className="flex items-center justify-center p-8 border border-dashed border-border rounded-xl bg-s1 text-muted text-xs">
          Aún no hay logos agregados. Edita las propiedades del componente para añadir logos.
        </div>
      ) : layout === 'marquee' ? (
        <div className="relative w-full overflow-hidden marquee-container py-4">
          {/* Edge Fade Gradients */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-[var(--bg-color)] to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-[var(--bg-color)] to-transparent" />

          {/* Scrolling wrappers */}
          <div className="flex w-max">
            {/* First sequence */}
            <div 
              className="flex items-center gap-16 px-8 animate-marquee-scroll flex-shrink-0"
              style={{ animationDuration: speedDuration }}
            >
              {listToRender.map((logo, idx) => (
                <div key={`logo-1-${logo.id || 'img'}-${idx}`} className="flex items-center justify-center flex-shrink-0">
                  {logo.link ? (
                    <a 
                      href={logo.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer block"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt || 'Logo'}
                        style={{ height: `${logoHeight}px` }}
                        className={getLogoClass()}
                      />
                    </a>
                  ) : (
                    <img
                      src={logo.src}
                      alt={logo.alt || 'Logo'}
                      style={{ height: `${logoHeight}px` }}
                      className={getLogoClass()}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Duplicated sequence for seamless loop */}
            <div 
              className="flex items-center gap-16 px-8 animate-marquee-scroll flex-shrink-0"
              style={{ animationDuration: speedDuration }}
              aria-hidden="true"
            >
              {listToRender.map((logo, idx) => (
                <div key={`logo-2-${logo.id || 'img'}-${idx}`} className="flex items-center justify-center flex-shrink-0">
                  {logo.link ? (
                    <a 
                      href={logo.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cursor-pointer block"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt || 'Logo'}
                        style={{ height: `${logoHeight}px` }}
                        className={getLogoClass()}
                      />
                    </a>
                  ) : (
                    <img
                      src={logo.src}
                      alt={logo.alt || 'Logo'}
                      style={{ height: `${logoHeight}px` }}
                      className={getLogoClass()}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Static Grid Layout */
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 py-4">
            {logoList.map((logo, idx) => (
              <div key={`logo-grid-${logo.id || 'img'}-${idx}`} className="flex items-center justify-center">
                {logo.link ? (
                  <a 
                    href={logo.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cursor-pointer block"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt || 'Logo'}
                      style={{ height: `${logoHeight}px` }}
                      className={getLogoClass()}
                    />
                  </a>
                ) : (
                  <img
                    src={logo.src}
                    alt={logo.alt || 'Logo'}
                    style={{ height: `${logoHeight}px` }}
                    className={getLogoClass()}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
