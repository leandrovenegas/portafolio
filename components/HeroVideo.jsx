'use client';

import { useState, useEffect } from 'react';

const CDN_HOSTNAME = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net';

export default function HeroVideo({ 
  mobileAV1,
  mobileVP9,
  mobileH264,
  desktopAV1,
  desktopVP9,
  desktopH264,
  posterSrc = '/images/og-portafolio.jpg',
  children 
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Esto asegura que el componente se ha renderizado en el cliente (Carga Diferida)
    setIsMounted(true);
    
    // Adaptabilidad de Formato Inteligente
    const checkOrientation = () => {
      // 768px es el breakpoint típico para tablets en adelante
      setIsMobile(window.innerWidth < 768);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const activeAV1 = isMobile ? mobileAV1 : desktopAV1;
  const activeVP9 = isMobile ? mobileVP9 : desktopVP9;
  const activeH264 = isMobile ? mobileH264 : desktopH264;
  
  // Determinamos si hay algún video para renderizar
  const hasVideo = activeAV1 || activeVP9 || activeH264;

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-center overflow-hidden">
      
      {/* 1. Prioridad Absoluta de Carga (Poster) */}
      <div className="absolute inset-0 w-full h-full z-0 bg-bg">
        {/* fetchPriority="high" indica al navegador que debe descargar esto de inmediato */}
        <img 
          src={posterSrc}
          alt="Reel Audiovisual"
          className="w-full h-full object-cover opacity-60" // Opacidad ajustada para que el texto siempre sea legible
          fetchPriority="high"
        />
      </div>

      {/* 2. Carga Diferida y Fluidez (Video multiformato) */}
      {/* Solo intentamos renderizar el video si tenemos alguna fuente y estamos en el cliente */}
      {isMounted && hasVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        >
          {/* El Trío Dorado: El navegador intentará cargar en orden de arriba hacia abajo */}
          {activeAV1 && <source src={activeAV1} type={`video/${activeAV1.includes('.webm') ? 'webm' : 'mp4'}; codecs="av01.0.05M.08"`} />}
          {activeVP9 && <source src={activeVP9} type='video/webm; codecs="vp09.00.10.08"' />}
          {activeH264 && <source src={activeH264} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />}
        </video>
      )}

      {/* 3. Optimización Estética Invisible (Overlays) */}
      {/* Capa de oscurecimiento general para asegurar el contraste con la tipografía */}
      <div className="absolute inset-0 w-full h-full z-10 bg-black/50"></div>
      
      {/* Capa de textura (Dither/Ruido) generada por CSS para disimular compresión */}
      <div 
        className="absolute inset-0 w-full h-full z-10 opacity-[0.15] pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }}
      ></div>

      {/* Gradiente de difuminado hacia el fondo principal del sitio en la parte inferior */}
      <div className="absolute inset-x-0 bottom-0 h-48 z-10 bg-gradient-to-t from-bg via-bg/80 to-transparent"></div>

      {/* 4. Contenido Principal */}
      <div className="relative z-20 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl w-full">
        {/* Glow de acento (heredado del diseño original) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
        {children}
      </div>
    </section>
  );
}
