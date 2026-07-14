'use client';

import React, { useState, useEffect, useRef } from 'react';

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface AnimationToken {
  text: string;
  isHighlighted: boolean;
}

interface TextosAnimadosProps {
  title?: string;
  subtitle?: string;
  titulo?: string;
  subtitulo?: string;
  titleAnimationType?: string;
  subtitleAnimationType?: string;
  titleConfig?: {
    durationSeconds?: number;
    wordDelay?: number;
    stiffness?: number;
    damping?: number;
    mass?: number;
    loopCount?: number | 'infinite';
    iterations?: number | 'Infinito';
  };
  subtitleConfig?: {
    durationSeconds?: number;
    wordDelay?: number;
    stiffness?: number;
    damping?: number;
    mass?: number;
    loopCount?: number | 'infinite';
    iterations?: number | 'Infinito';
    startDelayMs?: number;
  };
  backgroundType?: 'solid' | 'gradient' | 'video';
  backgroundColor?: string;
  backgroundGradient?: string;
  mobileVideoGuid?: string;
  tabletVideoGuid?: string;
  desktopVideoGuid?: string;
  posterSrc?: string;
  posterAlt?: string;
  forceBp?: 'mobile' | 'tablet' | 'desktop';
  _styles?: any;
}

// Converts a style config object into a React inline style object
function toInlineStyle(styleObj: any) {
  if (!styleObj) return {};
  const s: any = {};
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
  
  if (styleObj.textIndent !== undefined && styleObj.textIndent !== '') s.textIndent = `${styleObj.textIndent}px`;
  if (styleObj.paddingTop !== undefined && styleObj.paddingTop !== '') s.paddingTop = `${styleObj.paddingTop}px`;
  if (styleObj.paddingBottom !== undefined && styleObj.paddingBottom !== '') s.paddingBottom = `${styleObj.paddingBottom}px`;
  return s;
}

export default function TextosAnimados({
  title = 'Título Animado **Impactante**',
  subtitle = 'Subtítulo animado por **separado** para mayor dinamismo.',
  titulo,
  subtitulo,
  titleAnimationType = 'cascade_elegant_fade_up',
  subtitleAnimationType = 'soft_focus_in',
  titleConfig = {},
  subtitleConfig = {},
  backgroundType = 'solid',
  backgroundColor = '#120924',
  backgroundGradient = 'linear-gradient(135deg, #1c0e35 0%, #0a0416 100%)',
  mobileVideoGuid = '',
  tabletVideoGuid = '',
  desktopVideoGuid = '',
  posterSrc = '',
  posterAlt = 'Fondo animado',
  forceBp,
  _styles
}: TextosAnimadosProps) {
  const displayTitle = titulo !== undefined && titulo !== null ? titulo : title;
  const displaySubtitle = subtitulo !== undefined && subtitulo !== null ? subtitulo : subtitle;
  const [isMounted, setIsMounted] = useState(false);
  const [bp, setBp] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeGuid = 
    (bp === 'mobile' ? mobileVideoGuid : 
     bp === 'tablet' ? tabletVideoGuid : 
     desktopVideoGuid) || desktopVideoGuid || tabletVideoGuid || mobileVideoGuid;

  // 1. Manejo de HLS para reproducción adaptativa en video de fondo
  useEffect(() => {
    if (!isMounted || !activeGuid || !videoRef.current || backgroundType !== 'video') return;

    const video = videoRef.current;
    video.muted = true;
    const hlsUrl = `https://vz-a158839f-ce6.b-cdn.net/${activeGuid}/playlist.m3u8`;

    let hls: any;

    // Importación dinámica de Hls para compatibilidad con SSR
    import('hls.js').then((HlsModule) => {
      const Hls = HlsModule.default;
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = hlsUrl;
      } else if (Hls.isSupported()) {
        hls = new Hls({
          capLevelToPlayerSize: true,
          autoStartLoad: true
        });
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
      } else {
        console.warn('TextosAnimados: HLS no es compatible con este navegador.');
      }
    });

    return () => {
      if (hls) hls.destroy();
    };
  }, [isMounted, activeGuid, backgroundType]);

  // 1.2. Smart Play/Pause when scrolling (similar to HeroVideo)
  useEffect(() => {
    if (!isMounted || !videoRef.current || !containerRef.current || backgroundType !== 'video') return;

    const video = videoRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMounted, backgroundType]);

  // Parse text using asterisks for bold highlights
  const parseText = (rawText: string): AnimationToken[] => {
    if (!rawText) return [];
    const parts = rawText.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    const tokens: AnimationToken[] = [];

    parts.forEach(part => {
      const isHighlighted = part.startsWith('**') && part.endsWith('**');
      const cleanText = isHighlighted ? part.slice(2, -2) : part;
      const words = cleanText.split(/\s+/).filter(Boolean);
      words.forEach(word => {
        tokens.push({ text: word, isHighlighted });
      });
    });

    return tokens;
  };

  const titleTokens = parseText(displayTitle);
  const subtitleTokens = parseText(displaySubtitle);

  // Styling defaults
  const titleStyles = (_styles && (_styles.titulo || _styles.title)) ? (_styles.titulo || _styles.title) : {
    mobile: { fontSize: 36, fontWeight: '900', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '0', lineHeight: '1', color: '#FFFFFF' },
    tablet: { fontSize: 60, fontWeight: '900', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '0', lineHeight: '1', color: '#FFFFFF' },
    desktop: { fontSize: 72, fontWeight: '900', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '0', lineHeight: '1', color: '#FFFFFF' }
  };

  const subtitleStyles = (_styles && (_styles.subtitulo || _styles.subtitle)) ? (_styles.subtitulo || _styles.subtitle) : {
    mobile: { fontSize: 18, fontWeight: '500', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.4', color: '#A3A3A3' },
    tablet: { fontSize: 24, fontWeight: '500', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.4', color: '#A3A3A3' },
    desktop: { fontSize: 28, fontWeight: '500', fontStyle: 'normal', textTransform: 'none', letterSpacing: '0', lineHeight: '1.4', color: '#A3A3A3' }
  };

  // Helper to construct keyframes with embedded delay to make loops repeat delay stagger correctly
  const buildKeyframes = (
    initialState: Keyframe,
    finalState: Keyframe,
    pStart: number,
    pEnd: number,
    transitionEasing: string
  ): Keyframe[] => {
    const keyframes: Keyframe[] = [];

    if (pStart > 0.0001) {
      keyframes.push({
        offset: 0,
        ...initialState,
        easing: 'linear'
      });
      keyframes.push({
        offset: pStart,
        ...initialState,
        easing: transitionEasing
      });
    } else {
      keyframes.push({
        offset: 0,
        ...initialState,
        easing: transitionEasing
      });
    }

    keyframes.push({
      offset: pEnd,
      ...finalState,
      easing: 'linear'
    });

    keyframes.push({
      offset: 1.0,
      ...finalState
    });

    return keyframes;
  };

  // ─── Title Animation Effect ────────────────────────────────────────────────
  useEffect(() => {
    if (!isMounted) return;
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.anim-title-word');
    if (words.length === 0) return;

    const activeAnimations: Animation[] = [];

    const durationSeconds = isNaN(Number(titleConfig.durationSeconds)) || Number(titleConfig.durationSeconds) <= 0.1 ? 3.5 : Number(titleConfig.durationSeconds);
    const wordDelay = isNaN(Number(titleConfig.wordDelay)) || Number(titleConfig.wordDelay) < 0 ? 5 : Number(titleConfig.wordDelay);
    const stiffness = isNaN(Number(titleConfig.stiffness)) || Number(titleConfig.stiffness) <= 1 ? 100 : Number(titleConfig.stiffness);
    const damping = isNaN(Number(titleConfig.damping)) || Number(titleConfig.damping) <= 1 ? 15 : Number(titleConfig.damping);
    const mass = isNaN(Number(titleConfig.mass)) || Number(titleConfig.mass) <= 0.1 ? 1 : Number(titleConfig.mass);

    const loopCount = titleConfig.loopCount ?? 'infinite';
    const rawIterations = titleConfig.iterations !== undefined
      ? (titleConfig.iterations === 'Infinito' ? Infinity : Number(titleConfig.iterations))
      : (loopCount === 'infinite' ? Infinity : Number(loopCount));
    const iterationsVal = isNaN(Number(rawIterations)) || Number(rawIterations) < 0 ? Infinity : Number(rawIterations);

    const wordDelayMs = (wordDelay / 60) * 1000;
    const totalDurationMs = durationSeconds * 1000;

    const omega0 = Math.sqrt(stiffness / mass);
    let zeta = damping / (2 * Math.sqrt(stiffness * mass));
    if (isNaN(zeta)) zeta = 1;
    const wordDurationMs = Math.round(8000 * Math.sqrt(mass / stiffness));

    const x1 = Math.min(0.9, Math.max(0.05, 0.15 + 0.1 * (zeta - 0.75)));
    const y1 = Math.min(0.95, Math.max(0.1, 0.85 - 0.2 * (zeta - 0.75)));
    const x2 = Math.min(0.9, Math.max(0.05, 0.35 + 0.15 * (zeta - 0.75)));
    const y2 = zeta < 1 ? Math.min(1.4, 1 + (1 - zeta) * 0.5) : 1.0;
    
    const x1Val = isNaN(x1) ? 0.25 : x1;
    const y1Val = isNaN(y1) ? 0.25 : y1;
    const x2Val = isNaN(x2) ? 0.75 : x2;
    const y2Val = isNaN(y2) ? 1.0 : y2;
    const easing = `cubic-bezier(${x1Val.toFixed(4)}, ${y1Val.toFixed(4)}, ${x2Val.toFixed(4)}, ${y2Val.toFixed(4)})`;

    const titleColor = titleStyles[bp]?.color || '#FFFFFF';

    words.forEach((wordEl, idx) => {
      const word = wordEl as HTMLElement;
      const delayMs = idx * wordDelayMs;

      word.style.opacity = '0';
      word.style.transform = '';
      word.style.filter = '';
      word.style.backgroundImage = '';
      word.style.backgroundSize = '';
      word.style.removeProperty('-webkit-background-clip');
      word.style.removeProperty('background-clip');
      word.style.removeProperty('-webkit-text-fill-color');

      const isHighlighted = word.getAttribute('data-highlighted') === 'true';
      word.style.color = isHighlighted ? '#FFCC00' : titleColor;

      let pStart = totalDurationMs > 0 ? Math.min(0.9998, delayMs / totalDurationMs) : 0;
      let pEnd = totalDurationMs > 0 ? Math.min(0.9999, (delayMs + wordDurationMs) / totalDurationMs) : 0.9999;
      if (isNaN(pStart)) pStart = 0;
      if (isNaN(pEnd)) pEnd = 0.9999;

      let keyframes: Keyframe[] = [];
      let options: KeyframeAnimationOptions = {
        duration: totalDurationMs,
        iterations: iterationsVal,
        fill: 'both',
      };

      if (titleAnimationType === 'cascade_elegant_fade_up') {
        keyframes = buildKeyframes(
          { opacity: 0, transform: 'translateY(35px)' },
          { opacity: 1, transform: 'translateY(0)' },
          pStart,
          pEnd,
          easing
        );
        const anim = word.animate(keyframes, options);
        activeAnimations.push(anim);

      } else if (titleAnimationType === 'soft_focus_in') {
        keyframes = buildKeyframes(
          { opacity: 0, filter: 'blur(18px)', transform: 'scale(0.9)' },
          { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' },
          pStart,
          pEnd,
          easing
        );
        const anim = word.animate(keyframes, options);
        activeAnimations.push(anim);

      } else if (titleAnimationType === 'metalic_sheen_sweep') {
        keyframes = buildKeyframes(
          { opacity: 0, transform: 'translateY(15px)' },
          { opacity: 1, transform: 'translateY(0)' },
          pStart,
          pEnd,
          easing
        );
        const entryAnim = word.animate(keyframes, options);
        activeAnimations.push(entryAnim);

        const baseColor = isHighlighted ? '#FFCC00' : titleColor;
        const highlightColor = '#FFFFFF';

        word.style.backgroundImage = `linear-gradient(120deg, ${baseColor} 0%, ${baseColor} 35%, ${highlightColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`;
        word.style.backgroundSize = '300% auto';
        word.style.setProperty('-webkit-background-clip', 'text');
        word.style.setProperty('background-clip', 'text');
        word.style.setProperty('-webkit-text-fill-color', 'transparent');

        const sweepDelayMs = ((15 + idx * 12) / 60) * 1000;
        const sweepDurationMs = Math.max(500, totalDurationMs * 0.45);
        let pStartSweep = totalDurationMs > 0 ? Math.min(0.9998, sweepDelayMs / totalDurationMs) : 0;
        let pEndSweep = totalDurationMs > 0 ? Math.min(0.9999, (sweepDelayMs + sweepDurationMs) / totalDurationMs) : 0.9999;
        if (isNaN(pStartSweep)) pStartSweep = 0;
        if (isNaN(pEndSweep)) pEndSweep = 0.9999;

        const sweepKeyframes = buildKeyframes(
          { backgroundPosition: '150% 0%' },
          { backgroundPosition: '-150% 0%' },
          pStartSweep,
          pEndSweep,
          'ease-in-out'
        );

        const sweepAnim = word.animate(sweepKeyframes, options);
        activeAnimations.push(sweepAnim);
      }
    });

    return () => {
      activeAnimations.forEach(anim => anim.cancel());
    };
  }, [isMounted, displayTitle, titleAnimationType, titleConfig, bp]);

  // ─── Subtitle Animation Effect ─────────────────────────────────────────────
  useEffect(() => {
    if (!isMounted) return;
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.anim-subtitle-word');
    if (words.length === 0) return;

    const activeAnimations: Animation[] = [];

    const durationSeconds = isNaN(Number(subtitleConfig.durationSeconds)) || Number(subtitleConfig.durationSeconds) <= 0.1 ? 3.5 : Number(subtitleConfig.durationSeconds);
    const wordDelay = isNaN(Number(subtitleConfig.wordDelay)) || Number(subtitleConfig.wordDelay) < 0 ? 4 : Number(subtitleConfig.wordDelay);
    const stiffness = isNaN(Number(subtitleConfig.stiffness)) || Number(subtitleConfig.stiffness) <= 1 ? 100 : Number(subtitleConfig.stiffness);
    const damping = isNaN(Number(subtitleConfig.damping)) || Number(subtitleConfig.damping) <= 1 ? 15 : Number(subtitleConfig.damping);
    const mass = isNaN(Number(subtitleConfig.mass)) || Number(subtitleConfig.mass) <= 0.1 ? 1 : Number(subtitleConfig.mass);
    const startDelayMs = isNaN(Number(subtitleConfig.startDelayMs)) || Number(subtitleConfig.startDelayMs) < 0 ? 1000 : Number(subtitleConfig.startDelayMs);

    const loopCount = subtitleConfig.loopCount ?? 'infinite';
    const rawIterations = subtitleConfig.iterations !== undefined
      ? (subtitleConfig.iterations === 'Infinito' ? Infinity : Number(subtitleConfig.iterations))
      : (loopCount === 'infinite' ? Infinity : Number(loopCount));
    const iterationsVal = isNaN(Number(rawIterations)) || Number(rawIterations) < 0 ? Infinity : Number(rawIterations);

    const wordDelayMs = (wordDelay / 60) * 1000;
    const totalDurationMs = durationSeconds * 1000;

    const omega0 = Math.sqrt(stiffness / mass);
    let zeta = damping / (2 * Math.sqrt(stiffness * mass));
    if (isNaN(zeta)) zeta = 1;
    const wordDurationMs = Math.round(8000 * Math.sqrt(mass / stiffness));

    const x1 = Math.min(0.9, Math.max(0.05, 0.15 + 0.1 * (zeta - 0.75)));
    const y1 = Math.min(0.95, Math.max(0.1, 0.85 - 0.2 * (zeta - 0.75)));
    const x2 = Math.min(0.9, Math.max(0.05, 0.35 + 0.15 * (zeta - 0.75)));
    const y2 = zeta < 1 ? Math.min(1.4, 1 + (1 - zeta) * 0.5) : 1.0;
    
    const x1Val = isNaN(x1) ? 0.25 : x1;
    const y1Val = isNaN(y1) ? 0.25 : y1;
    const x2Val = isNaN(x2) ? 0.75 : x2;
    const y2Val = isNaN(y2) ? 1.0 : y2;
    const easing = `cubic-bezier(${x1Val.toFixed(4)}, ${y1Val.toFixed(4)}, ${x2Val.toFixed(4)}, ${y2Val.toFixed(4)})`;

    const subtitleColor = subtitleStyles[bp]?.color || '#A3A3A3';

    // Total time frame for keyframes including startDelayMs
    const fullDurationMs = totalDurationMs + startDelayMs;

    words.forEach((wordEl, idx) => {
      const word = wordEl as HTMLElement;
      const delayMs = startDelayMs + idx * wordDelayMs;

      word.style.opacity = '0';
      word.style.transform = '';
      word.style.filter = '';
      word.style.backgroundImage = '';
      word.style.backgroundSize = '';
      word.style.removeProperty('-webkit-background-clip');
      word.style.removeProperty('background-clip');
      word.style.removeProperty('-webkit-text-fill-color');

      const isHighlighted = word.getAttribute('data-highlighted') === 'true';
      word.style.color = isHighlighted ? '#FFCC00' : subtitleColor;

      let pStart = fullDurationMs > 0 ? Math.min(0.9998, delayMs / fullDurationMs) : 0;
      let pEnd = fullDurationMs > 0 ? Math.min(0.9999, (delayMs + wordDurationMs) / fullDurationMs) : 0.9999;
      if (isNaN(pStart)) pStart = 0;
      if (isNaN(pEnd)) pEnd = 0.9999;

      let keyframes: Keyframe[] = [];
      let options: KeyframeAnimationOptions = {
        duration: fullDurationMs,
        iterations: iterationsVal,
        fill: 'both',
      };

      if (subtitleAnimationType === 'cascade_elegant_fade_up') {
        keyframes = buildKeyframes(
          { opacity: 0, transform: 'translateY(35px)' },
          { opacity: 1, transform: 'translateY(0)' },
          pStart,
          pEnd,
          easing
        );
        const anim = word.animate(keyframes, options);
        activeAnimations.push(anim);

      } else if (subtitleAnimationType === 'soft_focus_in') {
        keyframes = buildKeyframes(
          { opacity: 0, filter: 'blur(18px)', transform: 'scale(0.9)' },
          { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' },
          pStart,
          pEnd,
          easing
        );
        const anim = word.animate(keyframes, options);
        activeAnimations.push(anim);

      } else if (subtitleAnimationType === 'metalic_sheen_sweep') {
        keyframes = buildKeyframes(
          { opacity: 0, transform: 'translateY(15px)' },
          { opacity: 1, transform: 'translateY(0)' },
          pStart,
          pEnd,
          easing
        );
        const entryAnim = word.animate(keyframes, options);
        activeAnimations.push(entryAnim);

        const baseColor = isHighlighted ? '#FFCC00' : subtitleColor;
        const highlightColor = '#FFFFFF';

        word.style.backgroundImage = `linear-gradient(120deg, ${baseColor} 0%, ${baseColor} 35%, ${highlightColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`;
        word.style.backgroundSize = '300% auto';
        word.style.setProperty('-webkit-background-clip', 'text');
        word.style.setProperty('background-clip', 'text');
        word.style.setProperty('-webkit-text-fill-color', 'transparent');

        const sweepDelayMs = startDelayMs + ((15 + idx * 12) / 60) * 1000;
        const sweepDurationMs = Math.max(500, totalDurationMs * 0.45);
        let pStartSweep = fullDurationMs > 0 ? Math.min(0.9998, sweepDelayMs / fullDurationMs) : 0;
        let pEndSweep = fullDurationMs > 0 ? Math.min(0.9999, (sweepDelayMs + sweepDurationMs) / fullDurationMs) : 0.9999;
        if (isNaN(pStartSweep)) pStartSweep = 0;
        if (isNaN(pEndSweep)) pEndSweep = 0.9999;

        const sweepKeyframes = buildKeyframes(
          { backgroundPosition: '150% 0%' },
          { backgroundPosition: '-150% 0%' },
          pStartSweep,
          pEndSweep,
          'ease-in-out'
        );

        const sweepAnim = word.animate(sweepKeyframes, options);
        activeAnimations.push(sweepAnim);
      }
    });

    return () => {
      activeAnimations.forEach(anim => anim.cancel());
    };
  }, [isMounted, displaySubtitle, subtitleAnimationType, subtitleConfig, bp]);

  const getBackgroundStyle = () => {
    if (backgroundType === 'solid') {
      return { backgroundColor: backgroundColor || '#120924' };
    } else if (backgroundType === 'gradient') {
      return { background: backgroundGradient || 'linear-gradient(135deg, #1c0e35 0%, #0a0416 100%)' };
    } else if (backgroundType === 'video') {
      return { background: '#0a0416' };
    }
    return { background: 'radial-gradient(circle, #1c0e35 0%, #0a0416 100%)' };
  };

  if (!isMounted) {
    return (
      <div 
        className="page-builder-block w-full rounded-2xl flex flex-col items-center justify-center min-h-[400px] select-none py-16 md:py-24 gap-6 opacity-0 relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 w-full h-full z-0 pointer-events-none" 
          style={getBackgroundStyle()} 
        />
        <div 
          data-field="titulo"
          className="flex flex-wrap justify-center gap-x-4 gap-y-3 text-center font-display font-black tracking-tight text-4xl md:text-6xl lg:text-7xl uppercase max-w-5xl leading-none"
        >
          {titleTokens.map((token, idx) => (
            <span
              key={`t-${idx}`}
              style={{ color: token.isHighlighted ? '#FFCC00' : '#FFFFFF' }}
            >
              {token.text}
            </span>
          ))}
        </div>
        <div 
          data-field="subtitulo"
          className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-center font-display font-medium text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed"
        >
          {subtitleTokens.map((token, idx) => (
            <span
              key={`s-${idx}`}
              style={{ color: token.isHighlighted ? '#FFCC00' : '#A3A3A3' }}
            >
              {token.text}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="page-builder-block w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center min-h-[400px] py-16 md:py-24 shadow-2xl relative gap-6"
    >
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none" 
        style={getBackgroundStyle()} 
      />
      {/* 1. Fondo de Imagen / Poster */}
      {backgroundType === 'video' && (posterSrc || activeGuid) && (
        <div className="absolute inset-0 w-full h-full z-0 bg-black">
          <img 
            src={
              posterSrc 
                ? posterSrc 
                : activeGuid 
                  ? `https://vz-a158839f-ce6.b-cdn.net/${activeGuid}/thumbnail.jpg` 
                  : ''
            }
            alt={posterAlt || "Fondo"}
            className="w-full h-full object-cover opacity-35"
          />
        </div>
      )}

      {/* 2. Video Adaptativo Bunny Stream */}
      {activeGuid && backgroundType === 'video' && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-35"
        />
      )}

      {/* Overlay oscuro para legibilidad del texto */}
      {backgroundType === 'video' && (
        <div className="absolute inset-0 w-full h-full z-10 bg-black/40 pointer-events-none"></div>
      )}

      {/* 3. Contenido Principal */}
      <div className="relative z-20 w-full max-w-5xl flex flex-col items-center justify-center p-4 text-center gap-6" ref={containerRef}>
        {/* Title */}
        <div 
          data-field="titulo"
          className="flex flex-wrap justify-center gap-x-4 gap-y-3 text-center select-none font-display font-black tracking-tight text-4xl md:text-6xl lg:text-7xl uppercase max-w-5xl leading-none"
          style={toInlineStyle(titleStyles[bp])}
        >
          {titleTokens.map((token, idx) => (
            <span
              key={`t-${idx}`}
              className="anim-title-word"
              data-highlighted={token.isHighlighted ? 'true' : 'false'}
              style={{
                color: token.isHighlighted ? '#FFCC00' : '#FFFFFF',
                display: 'inline-block',
              }}
            >
              {token.text}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div 
          data-field="subtitulo"
          className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-center select-none font-display font-medium text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed"
          style={toInlineStyle(subtitleStyles[bp])}
        >
          {subtitleTokens.map((token, idx) => (
            <span
              key={`s-${idx}`}
              className="anim-subtitle-word"
              data-highlighted={token.isHighlighted ? 'true' : 'false'}
              style={{
                color: token.isHighlighted ? '#FFCC00' : '#A3A3A3',
                display: 'inline-block',
              }}
            >
              {token.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
