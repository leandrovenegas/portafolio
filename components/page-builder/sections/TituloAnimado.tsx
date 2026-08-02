'use client';

import React, { useState, useEffect, useRef } from 'react';

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface AnimationToken {
  text: string;
  isHighlighted: boolean;
}

interface TituloAnimadoProps {
  text: string;
  animationType?: string;
  loopCount?: number | 'infinite';
  config?: {
    durationSeconds?: number;
    wordDelay?: number;
    stiffness?: number;
    damping?: number;
    mass?: number;
    backgroundColor?: string;
    loopCount?: number | 'infinite';
    iterations?: number | 'Infinito';
  };
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

export default function TituloAnimado({
  text = 'Creamos **Resultados** de alto impacto',
  animationType = 'cascade_elegant_fade_up',
  loopCount: directLoopCount,
  config = {},
  forceBp,
  _styles
}: TituloAnimadoProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [bp, setBp] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const containerRef = useRef<HTMLDivElement>(null);

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

  const loopCount = directLoopCount ?? config.loopCount ?? 'infinite';
  
  // Safe parsing with strict fallbacks to prevent NaN or zero division crashes
  const rawDuration = config.durationSeconds ?? 3.5;
  const durationSeconds = isNaN(Number(rawDuration)) || Number(rawDuration) <= 0.1 ? 3.5 : Number(rawDuration);
  
  const rawWordDelay = config.wordDelay ?? 5;
  const wordDelay = isNaN(Number(rawWordDelay)) || Number(rawWordDelay) < 0 ? 5 : Number(rawWordDelay);
  
  const rawStiffness = config.stiffness ?? 100;
  const stiffness = isNaN(Number(rawStiffness)) || Number(rawStiffness) <= 1 ? 100 : Number(rawStiffness);
  
  const rawDamping = config.damping ?? 15;
  const damping = isNaN(Number(rawDamping)) || Number(rawDamping) <= 1 ? 15 : Number(rawDamping);
  
  const rawMass = config.mass ?? 1;
  const mass = isNaN(Number(rawMass)) || Number(rawMass) <= 0.1 ? 1 : Number(rawMass);

  const rawIterations = config.iterations !== undefined
    ? (config.iterations === 'Infinito' ? Infinity : Number(config.iterations))
    : (loopCount === 'infinite' ? Infinity : Number(loopCount));
  const iterationsVal = isNaN(Number(rawIterations)) || Number(rawIterations) < 0 ? Infinity : Number(rawIterations);

  const textStyles = (_styles && _styles.text) ? _styles.text : {
    mobile: { fontSize: 36, fontWeight: '900', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '0', lineHeight: '1' },
    tablet: { fontSize: 60, fontWeight: '900', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '0', lineHeight: '1' },
    desktop: { fontSize: 72, fontWeight: '900', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '0', lineHeight: '1' }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Parse text using asterisks for bold highlights
  const parseText = (rawText: string): AnimationToken[] => {
    if (!rawText) return [];
    const parts = rawText.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    const tokens: AnimationToken[] = [];

    parts.forEach(part => {
      const isHighlighted = part.startsWith('**') && part.endsWith('**');
      const cleanText = isHighlighted ? part.slice(2, -2) : part;
      // Split cleanText by spaces, keeping track of highlighted status
      const words = cleanText.split(/\s+/).filter(Boolean);
      words.forEach(word => {
        tokens.push({ text: word, isHighlighted });
      });
    });

    return tokens;
  };

  const tokens = parseText(text);

  useEffect(() => {
    if (!isMounted) return;
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.anim-word');
    if (words.length === 0) return;

    const activeAnimations: Animation[] = [];

    // Convert frame delays to ms (assumed 60fps reference for wordDelay config)
    const wordDelayMs = (wordDelay / 60) * 1000;
    const totalDurationMs = durationSeconds * 1000;

    // Convert stiffness/damping/mass to physical parameters
    const stiffnessVal = stiffness > 0 ? stiffness : 100;
    const massVal = mass > 0 ? mass : 1;
    const dampingVal = damping > 0 ? damping : 15;
    
    const omega0 = Math.sqrt(stiffnessVal / massVal);
    let zeta = dampingVal / (2 * Math.sqrt(stiffnessVal * massVal));
    if (isNaN(zeta)) zeta = 1;
    
    // wordDuration is inversely proportional to omega0
    const wordDurationMs = Math.round(8000 * Math.sqrt(massVal / stiffnessVal));

    // Map stiffness/damping to cubic-bezier easing
    const x1 = Math.min(0.9, Math.max(0.05, 0.15 + 0.1 * (zeta - 0.75)));
    const y1 = Math.min(0.95, Math.max(0.1, 0.85 - 0.2 * (zeta - 0.75)));
    const x2 = Math.min(0.9, Math.max(0.05, 0.35 + 0.15 * (zeta - 0.75)));
    const y2 = zeta < 1 ? Math.min(1.4, 1 + (1 - zeta) * 0.5) : 1.0;
    
    const x1Val = isNaN(x1) ? 0.25 : x1;
    const y1Val = isNaN(y1) ? 0.25 : y1;
    const x2Val = isNaN(x2) ? 0.75 : x2;
    const y2Val = isNaN(y2) ? 1.0 : y2;
    
    const easing = `cubic-bezier(${x1Val.toFixed(4)}, ${y1Val.toFixed(4)}, ${x2Val.toFixed(4)}, ${y2Val.toFixed(4)})`;

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

    words.forEach((wordEl, idx) => {
      const word = wordEl as HTMLElement;
      const delayMs = idx * wordDelayMs;

      // Reset style configurations to baseline
      word.style.opacity = '0';
      word.style.transform = '';
      word.style.filter = '';
      word.style.backgroundImage = '';
      word.style.backgroundSize = '';
      word.style.removeProperty('-webkit-background-clip');
      word.style.removeProperty('background-clip');
      word.style.removeProperty('-webkit-text-fill-color');

      const isHighlighted = word.getAttribute('data-highlighted') === 'true';
      word.style.color = isHighlighted ? '#FFCC00' : '#FFFFFF';

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

      if (animationType === 'cascade_elegant_fade_up') {
        keyframes = buildKeyframes(
          { opacity: 0, transform: 'translateY(35px)' },
          { opacity: 1, transform: 'translateY(0)' },
          pStart,
          pEnd,
          easing
        );
        const anim = word.animate(keyframes, options);
        activeAnimations.push(anim);

      } else if (animationType === 'soft_focus_in') {
        keyframes = buildKeyframes(
          { opacity: 0, filter: 'blur(18px)', transform: 'scale(0.9)' },
          { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' },
          pStart,
          pEnd,
          easing
        );
        const anim = word.animate(keyframes, options);
        activeAnimations.push(anim);

      } else if (animationType === 'metalic_sheen_sweep') {
        // Entry animation
        keyframes = buildKeyframes(
          { opacity: 0, transform: 'translateY(15px)' },
          { opacity: 1, transform: 'translateY(0)' },
          pStart,
          pEnd,
          easing
        );
        const entryAnim = word.animate(keyframes, options);
        activeAnimations.push(entryAnim);

        // Sheen sweep gradient properties
        const baseColor = isHighlighted ? '#FFCC00' : '#FFFFFF';
        const highlightColor = '#FFFFFF';

        word.style.backgroundImage = `linear-gradient(120deg, ${baseColor} 0%, ${baseColor} 35%, ${highlightColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`;
        word.style.backgroundSize = '300% auto';
        word.style.setProperty('-webkit-background-clip', 'text');
        word.style.setProperty('background-clip', 'text');
        word.style.setProperty('-webkit-text-fill-color', 'transparent');

        // Sweep offset start is delayed relative to entry
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
  }, [isMounted, text, animationType, iterationsVal, durationSeconds, wordDelay, stiffness, damping, mass, bp]);

  // Background visual styling matching Leandro Venegas's visual style
  const bgStyle = config.backgroundColor
    ? { backgroundColor: config.backgroundColor }
    : { background: 'radial-gradient(circle, #1c0e35 0%, #0a0416 100%)' };

  if (!isMounted) {
    // SSR Static Placeholder matching the theme layout
    return (
      <div 
        className="page-builder-block w-full rounded-2xl flex items-center justify-center min-h-[300px] select-none py-12 md:py-16 opacity-0"
        style={bgStyle}
      >
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 text-center font-display font-black tracking-tight text-4xl md:text-6xl lg:text-7xl uppercase max-w-5xl leading-none">
          {tokens.map((token, idx) => (
            <span
              key={idx}
              style={{ color: token.isHighlighted ? '#FFCC00' : '#FFFFFF' }}
            >
              {token.text}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section 
      className="page-builder-block w-full rounded-2xl overflow-hidden grid grid-cols-1 justify-items-center items-center min-h-[300px] py-12 md:py-16 shadow-2xl relative"
      style={bgStyle}
    >
      <div className="col-span-1 w-full max-w-5xl flex items-center justify-center p-4" ref={containerRef}>
        <div 
          className="flex flex-wrap justify-center gap-x-4 gap-y-3 text-center select-none font-display font-black tracking-tight text-4xl md:text-6xl lg:text-7xl uppercase max-w-5xl leading-none"
          style={toInlineStyle(textStyles[bp])}
        >
          {tokens.map((token, idx) => (
            <span
              key={idx}
              className="anim-word"
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
      </div>
    </section>
  );
}
