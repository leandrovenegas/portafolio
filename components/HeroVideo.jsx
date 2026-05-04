'use client';

import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

const CDN_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net';

export default function HeroVideo({ 
  mobileVideoGuid,
  desktopVideoGuid,
  posterSrc = '/images/og-portafolio.jpg',
  children 
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    const checkOrientation = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const activeGuid = (isMobile ? mobileVideoGuid : desktopVideoGuid) || desktopVideoGuid || mobileVideoGuid;

  // 1. Manejo de HLS (Carga y Configuración)
  useEffect(() => {
    if (!isMounted || !activeGuid || !videoRef.current) return;

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
  }, [isMounted, activeGuid]);

  // 2. Optimización de Recursos (Smart Play/Pause al hacer scroll)
  useEffect(() => {
    if (!isMounted || !videoRef.current || !containerRef.current) return;

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
  }, [isMounted]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-center overflow-hidden"
    >
      
      {/* 1. Prioridad Absoluta de Carga (Poster) */}
      <div className="absolute inset-0 w-full h-full z-0 bg-bg">
        <img 
          src={posterSrc}
          alt="Reel Audiovisual"
          className="w-full h-full object-cover opacity-60"
          fetchPriority="high"
        />
      </div>

      {/* 2. Video HLS Adaptive */}
      {isMounted && activeGuid && (
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
      <div className="relative z-20 px-4 pt-20 md:px-12 lg:px-24 mx-auto max-w-7xl w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
        {children}
      </div>
    </section>
  );
}
