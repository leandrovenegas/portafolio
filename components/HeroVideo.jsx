'use client';

import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

const CDN_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net';

export default function HeroVideo({ 
  mobileVideoGuid,
  tabletVideoGuid,
  desktopVideoGuid,
  posterSrc = '',
  alt = 'Reel Audiovisual',
  title = '',
  description = '',
  children,
  forceBp = null,
  backgroundType = 'video',
  backgroundColor = '#121212',
  backgroundGradient = 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)'
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [device, setDevice] = useState(forceBp || 'mobile'); // mobile | tablet | desktop
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    if (forceBp) {
      setDevice(forceBp);
      return;
    }

    const checkOrientation = () => {
      const w = window.innerWidth;
      if (w < 768) setDevice('mobile');
      else if (w < 1024) setDevice('tablet');
      else setDevice('desktop');
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, [forceBp]);

  const activeGuid = 
    (device === 'mobile' ? mobileVideoGuid : 
     device === 'tablet' ? tabletVideoGuid : 
     desktopVideoGuid) || desktopVideoGuid || tabletVideoGuid || mobileVideoGuid;

  // Video Schema for SEO
  const videoSchema = (activeGuid && backgroundType === 'video') ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title || alt || "Video Portafolio",
    "description": description || alt || "Video producido por Leandro Venegas",
    "thumbnailUrl": posterSrc || `https://${CDN_HOSTNAME}/${activeGuid}/thumbnail.jpg`,
    "uploadDate": "2024-01-01T00:00:00Z",
    "contentUrl": `https://${CDN_HOSTNAME}/${activeGuid}/playlist.m3u8`,
    "embedUrl": `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/${activeGuid}`,
  } : null;

  // 1. Manejo de HLS (Carga y Configuración)
  useEffect(() => {
    if (!isMounted || !activeGuid || !videoRef.current || backgroundType !== 'video') return;

    const video = videoRef.current;
    video.muted = true; 
    const hlsUrl = `https://${CDN_HOSTNAME}/${activeGuid}/playlist.m3u8`;

    let hls;

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
      console.warn('HeroVideo: HLS not supported in this browser.');
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [isMounted, activeGuid, backgroundType]);

  // 2. Optimización de Recursos (Smart Play/Pause al hacer scroll)
  useEffect(() => {
    if (!isMounted || !videoRef.current || !containerRef.current || backgroundType !== 'video') return;

    const video = videoRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {}); // Play solo si está a la vista
        } else {
          video.pause(); // Pause si el usuario ya no lo ve
        }
      },
      { threshold: 0.4 } // Se activa cuando el 40% del video es visible
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMounted, backgroundType]);

  const getBackgroundStyle = () => {
    let styleVal = 'var(--ps-bg-panel, #121212)';
    if (backgroundType === 'solid') {
      styleVal = backgroundColor || '#121212';
    } else if (backgroundType === 'gradient') {
      styleVal = backgroundGradient || 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)';
    }
    if (typeof styleVal === 'string') {
      return styleVal.trim().replace(/;+$/, '');
    }
    return styleVal;
  };

  const showVisualBackground = backgroundType === 'video';

  const getHeroHeight = () => {
    if (forceBp) {
      if (forceBp === 'mobile') return '844px';
      if (forceBp === 'tablet') return '1024px';
    }
    return '100vh';
  };

  const getHeroMinHeight = () => {
    if (forceBp) {
      if (forceBp === 'mobile') return '844px';
      if (forceBp === 'tablet') return '1024px';
    }
    return '600px';
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full flex flex-col justify-center overflow-hidden"
      style={{
        background: getBackgroundStyle(),
        height: getHeroHeight(),
        minHeight: getHeroMinHeight()
      }}
    >
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}
      
      {/* 1. Prioridad Absoluta de Carga (Poster) */}
      {showVisualBackground && (posterSrc || activeGuid) && (
        <div className="absolute inset-0 w-full h-full z-0 bg-bg">
          <img 
            src={
              posterSrc 
                ? posterSrc 
                : activeGuid 
                  ? `https://${CDN_HOSTNAME}/${activeGuid}/thumbnail.jpg` 
                  : ''
            }
            alt={alt}
            className="w-full h-full object-cover opacity-60"
            fetchPriority="high"
          />
        </div>
      )}

      {/* 2. Video HLS Adaptive */}
      {isMounted && activeGuid && showVisualBackground && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
          onCanPlay={() => console.log('HeroVideo: Smart playing enabled')}
          onError={() => console.warn('HeroVideo: Failed to load HLS manifest.')}
        />
      )}

      {/* 3. Optimización Estética Invisible (Overlays) */}
      <div className="absolute inset-0 w-full h-full z-10 bg-black/50"></div>
      
      <div 
        className="absolute inset-0 w-full h-full z-10 opacity-[0.15] pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }}
      ></div>

      <div className="absolute inset-x-0 bottom-0 h-48 z-10 bg-gradient-to-t from-bg via-bg/80 to-transparent"></div>

      {/* 4. Contenido Principal */}
      <div className={`relative z-20 mx-auto max-w-7xl w-full ${
        device === 'mobile'
          ? 'px-6 pt-20 pb-12'
          : device === 'tablet'
            ? 'px-12 pt-20 pb-12'
            : 'px-4 pt-20 md:px-12 lg:px-24'
      }`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
        {children}
      </div>
    </section>
  );
}
