'use client';
import { useState, useEffect } from "react";
import HeroVideo from "@/components/HeroVideo";

export default function HeroVideoSection({ 
  title, 
  description1, 
  description2, 
  mobileVideoGuid, 
  tabletVideoGuid,
  desktopVideoGuid,
  posterSrc,
  posterAlt,
  forceBp = null,
  backgroundType = 'video',
  backgroundColor = '#121212',
  backgroundGradient = 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)'
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

  const titleSizeClass = bp === 'mobile'
    ? 'text-display-md'
    : bp === 'tablet'
      ? 'text-display-lg'
      : 'text-display-xl';

  const descSizeClass = bp === 'mobile'
    ? 'text-lg'
    : 'text-xl';

  return (
    <HeroVideo
      mobileVideoGuid={mobileVideoGuid || ""}
      tabletVideoGuid={tabletVideoGuid || ""}
      desktopVideoGuid={desktopVideoGuid || ""}
      posterSrc={posterSrc || ""}
      alt={posterAlt || title || "Reel Audiovisual"}
      title={title}
      description={description1}
      forceBp={forceBp}
      backgroundType={backgroundType}
      backgroundColor={backgroundColor}
      backgroundGradient={backgroundGradient}
    >
      <h1 data-field="title" className={`font-display ${titleSizeClass} text-ink leading-[0.9] mb-8 max-w-5xl font-bold`}>
        {title}
      </h1>
      {description1 && (
        <p data-field="description1" className={`font-body text-mid ${descSizeClass} max-w-2xl leading-relaxed mb-12 drop-shadow-md text-ink/90`}>
          {description1}
        </p>
      )}
      {description2 && (
        <p data-field="description2" className={`font-body text-mid ${descSizeClass} max-w-2xl leading-relaxed drop-shadow-md text-ink/90`}>
          {description2}
        </p>
      )}
    </HeroVideo>
  );
}
