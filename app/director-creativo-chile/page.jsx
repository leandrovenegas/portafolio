import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: 'Director Creativo Chile — Leandro Venegas | Motion Design · Producción Audiovisual',
  description: '¿Necesitas un director creativo, motion designer o productor audiovisual en Chile? Capacidad creativa senior sin costo de planilla. Leandro Venegas, Valparaíso.',
  keywords: [
    'director creativo Chile',
    'director creativo Valparaíso',
    'motion designer Chile',
    'productor audiovisual Chile',
    'director creativo freelance Chile',
    'contratar director creativo Chile',
    'motion design Chile',
    'producción audiovisual empresas Chile',
  ],
  openGraph: {
    title: 'Director Creativo Chile — Leandro Venegas',
    description: 'Capacidad creativa senior sin costo de planilla.',
    url: 'https://www.leandrovenegas.cl/director-creativo-chile',
  },
};

const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20vi%20tu%20p%C3%A1gina%20y%20quiero%20conversar%20sobre%20un%20proyecto";

export default function DirectorCreativoPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        
        {/* Decoración de fondo */}
        <span
          className="absolute top-20 left-1/2 -translate-x-1/2 font-display pointer-events-none select-none opacity-[0.15] whitespace-nowrap z-0"
          style={{ fontSize: 'clamp(120px, 20vw, 280px)', WebkitTextStroke: '1px var(--border2)', color: 'transparent' }}
          aria-hidden="true"
        >
          CREAR
        </span>

        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-24 md:gap-32">
          
          {/* SECCIÓN 1 — Hero */}
          <section className="pt-12 md:pt-24 min-h-[60vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-sm md:text-base mb-6 tracking-wide">
              Director Creativo · Valparaíso, Chile
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl whitespace-pre-line">
              Necesitas talento creativo.<br />Aquí está.
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
              No un cargo más en tu planilla. Capacidad creativa senior, activada cuando la necesitas.<br />
              Dirección creativa, motion design y producción audiovisual — todo desde una sola fuente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={WA_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors"
              >
                Escribir por WhatsApp
              </a>
              <Link 
                href="/portafolio" 
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
              >
                Ver portafolio
              </Link>
            </div>
          </section>

          {/* SECCIÓN 2 — Intercepción de búsqueda */}
          <section>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[3px] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-12">
              ¿Estás buscando contratar a alguien así?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-8">
              
              <div className="bg-s1 p-8 md:p-12 hover:bg-s2 transition-colors flex flex-col gap-4">
                <span className="font-mono text-muted text-sm">01</span>
                <h3 className="font-display text-3xl md:text-4xl text-ink">Director Creativo</h3>
                <p className="font-body text-mid">
                  Alguien que lidere la estrategia visual, coordine equipos y entregue resultados medibles. Sin años de onboarding.
                </p>
              </div>
              
              <div className="bg-s1 p-8 md:p-12 hover:bg-s2 transition-colors flex flex-col gap-4">
                <span className="font-mono text-muted text-sm">02</span>
                <h3 className="font-display text-3xl md:text-4xl text-ink">Motion Designer</h3>
                <p className="font-body text-mid">
                  After Effects, animación 2D, motion graphics para campañas, redes y producción audiovisual de marca.
                </p>
              </div>

              <div className="bg-s1 p-8 md:p-12 hover:bg-s2 transition-colors flex flex-col gap-4">
                <span className="font-mono text-muted text-sm">03</span>
                <h3 className="font-display text-3xl md:text-4xl text-ink">Productor Audiovisual</h3>
                <p className="font-body text-mid">
                  Spots, videos institucionales, contenido para plataformas digitales. Desde el concepto hasta la entrega final.
                </p>
              </div>

              <div className="bg-s1 p-8 md:p-12 hover:bg-s2 transition-colors flex flex-col gap-4">
                <span className="font-mono text-muted text-sm">04</span>
                <h3 className="font-display text-3xl md:text-4xl text-ink">Estratega de Contenido</h3>
                <p className="font-body text-mid">
                  Posicionamiento con video, SEO audiovisual y flujos de contenido que generan visibilidad orgánica real.
                </p>
              </div>
              
            </div>
            <p className="font-body text-lg md:text-xl text-ink max-w-3xl leading-relaxed">
              Si estás buscando cualquiera de estos perfiles, ya lo encontraste — sin contrato laboral, sin costo fijo mensual, sin todas las complicaciones de contratar a alguien.
            </p>
          </section>

          {/* SECCIÓN 3 — Comparativa */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-8">
              Servicio externo vs. cargo interno
            </h2>
            <div className="overflow-x-auto border border-border bg-border">
              <table className="w-full text-left min-w-[600px] border-collapse bg-border gap-px">
                <thead className="bg-s1 border-b border-border">
                  <tr>
                    <th className="font-mono text-[10px] text-muted tracking-widest uppercase p-6 w-1/3"></th>
                    <th className="font-mono text-[10px] text-muted tracking-widest uppercase p-6 w-1/3 border-l border-border">Contratar empleado</th>
                    <th className="font-mono text-[10px] text-accent tracking-widest uppercase p-6 w-1/3 border-l border-border">Trabajar con Leandro</th>
                  </tr>
                </thead>
                <tbody className="bg-bg grid-gap-px">
                  <tr className="border-b border-border bg-s1 hover:bg-s2 transition-colors">
                    <td className="p-6 font-body text-ink">Disponibilidad</td>
                    <td className="p-6 font-body text-muted border-l border-border">2–4 meses para contratar</td>
                    <td className="p-6 font-body text-accent border-l border-border">Esta semana</td>
                  </tr>
                  <tr className="border-b border-border bg-s1 hover:bg-s2 transition-colors">
                    <td className="p-6 font-body text-ink">Costo fijo</td>
                    <td className="p-6 font-body text-muted border-l border-border">Sueldo + AFP + seguro</td>
                    <td className="p-6 font-body text-accent border-l border-border">Solo lo que uses</td>
                  </tr>
                  <tr className="border-b border-border bg-s1 hover:bg-s2 transition-colors">
                    <td className="p-6 font-body text-ink">Experiencia</td>
                    <td className="p-6 font-body text-muted border-l border-border">Variable, a descubrir</td>
                    <td className="p-6 font-body text-accent border-l border-border">15+ años, casos reales</td>
                  </tr>
                  <tr className="border-b border-border bg-s1 hover:bg-s2 transition-colors">
                    <td className="p-6 font-body text-ink">Flexibilidad</td>
                    <td className="p-6 font-body text-muted border-l border-border">Cargo fijo, horario fijo</td>
                    <td className="p-6 font-body text-accent border-l border-border">Proyecto a proyecto</td>
                  </tr>
                  <tr className="border-b border-border bg-s1 hover:bg-s2 transition-colors">
                    <td className="p-6 font-body text-ink">Portafolio</td>
                    <td className="p-6 font-body text-muted border-l border-border">PDF y referencias</td>
                    <td className="p-6 font-body text-accent border-l border-border">Casos medibles online</td>
                  </tr>
                  <tr className="bg-s1 hover:bg-s2 transition-colors">
                    <td className="p-6 font-body text-ink">Finiquito</td>
                    <td className="p-6 font-body text-muted border-l border-border">Proceso largo y costoso</td>
                    <td className="p-6 font-body text-accent border-l border-border">No aplica</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECCIÓN 4 — Servicios */}
          <section>
            <div className="mb-12 md:mb-16">
              <h2 className="font-display text-5xl md:text-6xl text-ink mb-4">
                Lo que entrego
              </h2>
              <p className="font-body text-mid text-lg md:text-xl max-w-2xl">
                Tres líneas de trabajo con trayectoria demostrada y casos documentados.
              </p>
            </div>
            
            <div className="flex flex-col gap-16 border-l border-border pl-6 md:pl-12">
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="font-mono text-[10px] tracking-widest text-[#99c010] border border-[#2a3800] bg-[#0d1200] px-3 py-1 uppercase">Estrategia</span>
                  <span className="font-mono text-[10px] tracking-widest text-[#99c010] border border-[#2a3800] bg-[#0d1200] px-3 py-1 uppercase">Liderazgo</span>
                  <span className="font-mono text-[10px] tracking-widest text-[#99c010] border border-[#2a3800] bg-[#0d1200] px-3 py-1 uppercase">Marca</span>
                </div>
                <h3 className="font-display text-4xl md:text-5xl text-ink">Dirección Creativa</h3>
                <p className="font-body text-mid text-lg max-w-3xl">
                  Liderazgo estratégico del proyecto desde el concepto hasta la entrega. Coordinación de equipo, definición de identidad audiovisual y supervisión de ejecución. He dirigido campañas para aerolíneas, clínicas y marcas culturales con resultados medibles.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="font-mono text-[10px] tracking-widest text-[#99c010] border border-[#2a3800] bg-[#0d1200] px-3 py-1 uppercase">Motion</span>
                  <span className="font-mono text-[10px] tracking-widest text-[#99c010] border border-[#2a3800] bg-[#0d1200] px-3 py-1 uppercase">Spots</span>
                  <span className="font-mono text-[10px] tracking-widest text-[#99c010] border border-[#2a3800] bg-[#0d1200] px-3 py-1 uppercase">Animación</span>
                </div>
                <h3 className="font-display text-4xl md:text-5xl text-ink">Motion Design & Producción Audiovisual</h3>
                <p className="font-body text-mid text-lg max-w-3xl">
                  Animación 2D, motion graphics, spots y producción de video para marcas. Desde piezas para redes sociales hasta campañas completas. Identidades audiovisuales que funcionan como sistema — no como piezas sueltas.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="font-mono text-[10px] tracking-widest text-[#99c010] border border-[#2a3800] bg-[#0d1200] px-3 py-1 uppercase">SEO</span>
                  <span className="font-mono text-[10px] tracking-widest text-[#99c010] border border-[#2a3800] bg-[#0d1200] px-3 py-1 uppercase">Contenido</span>
                  <span className="font-mono text-[10px] tracking-widest text-[#99c010] border border-[#2a3800] bg-[#0d1200] px-3 py-1 uppercase">Orgánico</span>
                </div>
                <h3 className="font-display text-4xl md:text-5xl text-ink">SEO con Video</h3>
                <p className="font-body text-mid text-lg max-w-3xl">
                  Estrategia de posicionamiento orgánico usando video como activo central. Producción de contenido optimizado, arquitectura de keywords audiovisuales y métricas de resultado. Caso documentado: proyecto Valook.
                </p>
              </div>

            </div>
          </section>

          {/* SECCIÓN 5 — Prueba social */}
          <section>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[3px] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-12">
              Trayectoria
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mb-8">
              
              <div className="bg-s1 p-8 hover:bg-s2 transition-colors flex flex-col gap-2">
                <h4 className="font-display text-6xl md:text-7xl text-accent mb-2">15+</h4>
                <p className="font-body text-ink font-semibold mb-1 relative z-10">Años de práctica</p>
                <p className="font-body text-mid text-sm relative z-10">Dirección creativa, producción y estrategia digital en Chile</p>
              </div>

              <div className="bg-s1 p-8 hover:bg-s2 transition-colors flex flex-col gap-2">
                <h4 className="font-display text-6xl md:text-7xl text-accent mb-2">4</h4>
                <p className="font-body text-ink font-semibold mb-1 relative z-10">Organizaciones fundadas</p>
                <p className="font-body text-mid text-sm relative z-10">Dragon Lab, Crazy Papa Studio, Incoludido y Rayandola</p>
              </div>

              <div className="bg-s1 p-8 hover:bg-s2 transition-colors flex flex-col gap-2">
                <h4 className="font-display text-6xl md:text-7xl text-accent mb-2 tracking-tighter">15M CLP</h4>
                <p className="font-body text-ink font-semibold mb-1 relative z-10">Recaudados</p>
                <p className="font-body text-mid text-sm relative z-10">Campaña de crowdfunding con plataforma y desarrollo tecnológico propios</p>
              </div>

              <div className="bg-s1 p-8 hover:bg-s2 transition-colors flex flex-col gap-2">
                <h4 className="font-display text-6xl md:text-7xl text-accent mb-2">MAC</h4>
                <p className="font-body text-ink font-semibold mb-1 relative z-10">Museo de Arte Contemporáneo</p>
                <p className="font-body text-mid text-sm relative z-10">Exposición de animación experimental en el circuito de artes visuales de Chile</p>
              </div>

            </div>

            {/* Strip de clientes */}
            <div className="border border-border bg-s1 py-6 px-4 overflow-hidden relative flex items-center">
              <p className="font-mono text-muted text-[10px] sm:text-xs uppercase tracking-widest whitespace-nowrap overflow-x-auto w-full text-center scrollbar-hide">
                <span className="inline-block px-4">LAN → LATAM</span> •  
                <span className="inline-block px-4">Canal 13</span> • 
                <span className="inline-block px-4">Dr. Patricio Andrade</span> • 
                <span className="inline-block px-4">Dando la Hora</span> •  
                <span className="inline-block px-4">Valook</span> •  
                <span className="inline-block px-4">Incoludido</span>
              </p>
            </div>
          </section>

          {/* SECCIÓN 6 — CTA final */}
          <section id="contacto">
            <div className="bg-s1 border border-border p-8 md:p-16 flex flex-col items-start gap-8 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 p-16 opacity-10 blur-3xl pointer-events-none">
                <div className="w-64 h-64 bg-accent rounded-full"></div>
              </div>

              <h2 className="font-display text-5xl md:text-6xl text-ink max-w-2xl relative z-10">
                ¿Tienes un proyecto en mente?
              </h2>
              <p className="font-body text-mid text-lg md:text-xl max-w-2xl relative z-10">
                Una conversación de 30 minutos es suficiente para saber si podemos trabajar juntos. Sin compromiso, sin presentación de ventas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
                <a 
                  href={WA_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors w-full sm:w-auto"
                >
                  Escribir por WhatsApp
                </a>
                <a 
                  href="mailto:leandrovenegas@live.com" 
                  className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors w-full sm:w-auto"
                >
                  leandrovenegas@live.com
                </a>
              </div>

              <div className="mt-8 relative z-10">
                <p className="font-mono text-[10px] text-muted tracking-widest uppercase">
                  Primera conversación sin costo · Valparaíso, Chile · Proyectos remotos y presenciales
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
