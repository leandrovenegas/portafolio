'use client';

import { useState, useEffect } from 'react';
import Animacion from './Animacion';

export default function HeroPortafolioTexto({ 
  pillText = "Proyectos y Organizaciones",
  headline = "Portafolio de Dirección Creativa y Producción Audiovisual",
  descriptionHtml = null,
  className = ""
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-24 bg-black ${className}`}>
      {/* Solo renderizamos el contenido visual si estamos montados en el cliente */}
      {mounted && (
        <>
          {/* Background with Matrix Texture */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dx2rvpvwr/image/upload/v1771681241/matrix2_dol6z6_tdd65g.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.5
            }}
          />
          
          {/* Multi-layered Gradient for Maximum Legibility */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-black/20 to-black" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/40" />

          <div className="relative z-20 max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            {/* Mobile Animation: Full Width Top */}
            <div className="lg:hidden w-full flex justify-center mb-8 px-4">
              <Animacion width="100%" height="auto" frameRate={120} className="aspect-square max-w-[500px] drop-shadow-[0_0_40px_rgba(var(--accent-rgb),0.3)]" />
            </div>

            {/* Content Container with Glass Backplate */}
            <div className="flex-1 flex flex-col items-start text-left max-w-4xl bg-black/30 backdrop-blur-[2px] p-8 md:p-12 lg:p-16 rounded-3xl border border-white/5 shadow-2xl">
              
              {pillText && (
                <p className="font-mono text-accent text-sm md:text-base tracking-[0.2em] uppercase mb-6 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full">
                  {pillText}
                </p>
              )}
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-ink leading-[0.95] font-bold mb-8 drop-shadow-2xl">
                {headline}
              </h1>

              {descriptionHtml && (
                <div
                  className="font-body text-mid text-lg md:text-xl max-w-3xl leading-relaxed prose prose-invert prose-p:my-4 prose-a:text-accent prose-a:no-underline hover:prose-a:underline opacity-90 border-t border-white/10 pt-8"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              )}
            </div>

            {/* Desktop Animation: Side by Side */}
            <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
              <div className="relative">
                {/* Soft Glow behind animation */}
                <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />
                <Animacion width="520px" height="520px" frameRate={100} className="relative z-10 drop-shadow-[0_0_60px_rgba(var(--accent-rgb),0.4)]" />
              </div>
            </div>

          </div>
        </>
      )}
    </section>
  );
}
