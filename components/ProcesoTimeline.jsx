"use client";

import { useEffect, useRef, useState } from "react";
import { 
  Compass, 
  FileText, 
  Video, 
  Sparkles, 
  Activity,
  ArrowRight
} from "lucide-react";

// Helper component for smooth scroll reveal
function RevealOnScroll({ children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once it has revealed to prevent flickering
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before it enters the viewport
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.21,0.6,0.35,1)] transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
}

const PHASES = [
  {
    number: "01",
    title: "Diagnóstico",
    subtitle: "1 llamada · 60 minutos",
    description: "Antes de escribir una línea de guión, entiendo tu negocio, tu cliente, y dónde está la fricción de venta. Salimos con una estrategia clara: qué tipos de video necesitas, en qué orden, y por qué.",
    deliverable: "Mapa de video strategy personalizado.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Estrategia y Guión",
    subtitle: "5 a 7 días",
    description: "Escribo los guiones con la estructura psicológica de cada tipo de video. Cada guión tiene un objetivo específico dentro del sistema — no son piezas sueltas, son eslabones de una cadena.",
    deliverable: "Guiones aprobados + pauta de producción.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Producción",
    subtitle: "1 a 2 días de rodaje",
    description: "Dirijo la producción en terreno. Multicámara, dirección de arte, sonido. El cliente no necesita saber de video — para eso estoy yo.",
    deliverable: "Material bruto organizado y listo para edición.",
    icon: Video,
  },
  {
    number: "04",
    title: "Post-Producción",
    subtitle: "7 a 14 días",
    description: "Edición, color, motion graphics, subtítulos, formatos para cada plataforma. Dos rondas de revisión incluidas.",
    deliverable: "Videos finales en todos los formatos requeridos.",
    icon: Sparkles,
  },
  {
    number: "05",
    title: "Activación y Seguimiento",
    subtitle: "Ongoing",
    description: "Los videos no sirven si nadie los ve. Defino dónde y cómo publicar cada pieza dentro del sistema para que los touchpoints se acumulen. Y mido qué está funcionando.",
    deliverable: "Sistema activo, no carpeta de archivos.",
    icon: Activity,
  }
];

export default function ProcesoTimeline() {
  return (
    <div className="relative max-w-6xl mx-auto px-6 py-12">
      {/* Central line of the timeline */}
      <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-zinc-800 to-zinc-900 transform md:-translate-x-1/2 pointer-events-none" />

      <div className="space-y-16 md:space-y-24">
        {PHASES.map((phase, index) => {
          const IconComponent = phase.icon;
          const isEven = index % 2 === 0;

          return (
            <RevealOnScroll 
              key={phase.number} 
              className="relative flex flex-col md:flex-row items-stretch w-full"
            >
              {/* Timeline Center Node (Number Badge) */}
              <div className="absolute left-[30px] md:left-1/2 top-0 md:top-8 transform -translate-x-1/2 z-10">
                <div className="w-[44px] h-[44px] md:w-14 md:h-14 rounded-full bg-s2 border-2 border-zinc-800 text-ink font-display text-lg md:text-2xl flex items-center justify-center transition-all duration-500 group-hover:border-accent hover:border-accent hover:text-accent shadow-lg shadow-black/80">
                  {phase.number}
                </div>
              </div>

              {/* Grid Layout for Desktop Alternating Content */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                
                {/* Left Side Content (Even indices display text here, Odd display empty on desktop) */}
                <div className={`pl-16 md:pl-0 flex flex-col justify-center ${
                  isEven ? "md:text-right md:items-end md:pr-12" : "md:order-last md:text-left md:items-start md:pl-12"
                }`}>
                  
                  {/* Card Container */}
                  <div className="w-full max-w-xl group bg-s1/30 hover:bg-s1/60 border border-zinc-900 hover:border-zinc-800 p-6 md:p-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-black/50">
                    
                    {/* Subtitle / Timeline Tag */}
                    <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block mb-2">
                      {phase.subtitle}
                    </span>

                    {/* Phase Title */}
                    <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-4 tracking-wide group-hover:text-white transition-colors">
                      {phase.title}
                    </h3>

                    {/* Phase Description */}
                    <p className="font-prose text-sm md:text-base text-mid group-hover:text-zinc-300 transition-colors leading-relaxed mb-6">
                      {phase.description}
                    </p>

                    {/* Deliverable Visual Highlight Block */}
                    <div className={`mt-4 border-l-2 border-accent bg-s2/65 p-4 rounded-r-xl text-left flex items-start gap-3 shadow-inner ${
                      isEven ? "md:items-start" : ""
                    }`}>
                      <div className="mt-0.5 p-1 bg-accent/10 rounded-md text-accent shrink-0">
                        <IconComponent size={16} strokeWidth={2.5} />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 block mb-1">
                          Entregable clave
                        </span>
                        <span className="font-body text-sm font-semibold text-ink leading-snug">
                          {phase.deliverable}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right Side Content (Placeholder on desktop to maintain alignment) */}
                <div className="hidden md:block pointer-events-none" />

              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
