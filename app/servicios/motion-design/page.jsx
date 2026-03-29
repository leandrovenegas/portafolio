import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: 'Motion Design para Marcas en Chile — Sin contratar un equipo | Leandro Venegas',
  description: '¿Necesitas motion design o animación para tu marca en Chile? Servicio externo de motion graphics y animación 2D para empresas. Valparaíso, Viña del Mar y todo Chile.',
  keywords: [
    'motion design Chile',
    'motion designer Chile',
    'motion graphics Chile',
    'motion design Valparaíso',
    'motion design Viña del Mar',
    'motion design empresas Chile',
    'animación 2D marcas Chile',
    'motion graphics Santiago',
    'servicio motion design externo Chile',
    'animación para marcas Chile',
  ],
  openGraph: {
    title: 'Motion Design para Marcas — Sin contratar un equipo | Leandro Venegas',
    description: 'Servicio externo de motion design y animación para empresas en Chile.',
    url: 'https://www.leandrovenegas.cl/servicios/motion-design',
  },
};

export default function MotionDesignPage() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20necesito%20motion%20design%20para%20mi%20marca";

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-24 md:gap-32">
          
          {/* HERO */}
          <section className="pt-12 md:pt-24 min-h-[60vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-sm md:text-base mb-6 tracking-wide">
              Servicio de Motion Design · Valparaíso y todo Chile
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-4xl">
              Motion Design para Marcas — sin contratar un equipo
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
              Tu marca necesita moverse. Animación, motion graphics y producción audiovisual como servicio externo — sin sueldos, sin oficina, sin equipo que gestionar. Activado cuando lo necesitas, entregado con criterio estratégico.
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

          {/* El problema que resuelvo */}
          <section>
            <div className="border border-border p-8 md:p-16 bg-s1">
              <h2 className="font-display text-4xl md:text-5xl text-ink mb-6 max-w-3xl leading-tight">
                Las empresas publican avisos de trabajo. Deberían estar llamando a alguien como yo.
              </h2>
              <p className="font-body text-mid text-lg leading-relaxed mb-8 max-w-3xl">
                Cada semana, empresas en Chile publican cargos de &quot;motion designer&quot; o &quot;animador digital&quot;. Contratan a alguien, lo onboardean, y tres meses después descubren que no era lo que necesitaban. Existe una forma mejor: externalizar el motion design a alguien con 15 años de práctica, que entrega sin fricción y no aparece en tu planilla.
              </p>
              <div className="inline-block border border-accent/20 bg-accent/5 px-4 py-2 mt-2">
                <p className="font-mono text-xs md:text-sm text-accent tracking-widest uppercase">
                  Sin AFP. Sin seguro. Sin contrato indefinido. Solo entregables.
                </p>
              </div>
            </div>
          </section>

          {/* Lo que entrego */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">
              Qué incluye el servicio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              
              <div className="bg-bg p-8 hover:bg-s1 transition-colors flex flex-col gap-4">
                <span className="font-mono text-muted text-sm">01</span>
                <h3 className="font-display text-3xl md:text-4xl text-ink">Motion Graphics para campañas</h3>
                <p className="font-body text-mid">
                  Animación de piezas para redes sociales, publicidad digital y presentaciones corporativas. After Effects, sistemas de animación y coherencia visual de marca.
                </p>
              </div>

              <div className="bg-bg p-8 hover:bg-s1 transition-colors flex flex-col gap-4">
                <span className="font-mono text-muted text-sm">02</span>
                <h3 className="font-display text-3xl md:text-4xl text-ink">Identidad Audiovisual de Marca</h3>
                <p className="font-body text-mid">
                  El movimiento también es parte de tu identidad. Diseño de sistemas de animación que funcionan como lenguaje visual consistente en todos los canales.
                </p>
              </div>

              <div className="bg-bg p-8 hover:bg-s1 transition-colors flex flex-col gap-4">
                <span className="font-mono text-muted text-sm">03</span>
                <h3 className="font-display text-3xl md:text-4xl text-ink">Animación 2D</h3>
                <p className="font-body text-mid">
                  Personajes, explainers, contenido narrativo animado. Desde el storyboard hasta la entrega final en los formatos que necesitas.
                </p>
              </div>

              <div className="bg-bg p-8 hover:bg-s1 transition-colors flex flex-col gap-4">
                <span className="font-mono text-muted text-sm">04</span>
                <h3 className="font-display text-3xl md:text-4xl text-ink">Postproducción y Motion para Spots</h3>
                <p className="font-body text-mid">
                  Títulos, transiciones, overlays y motion aplicado a producción de video. Integrado con el proceso audiovisual o como capa sobre material existente.
                </p>
              </div>

            </div>
          </section>

          {/* Para quién es esto */}
          <section className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/3">
              <h2 className="font-display text-4xl md:text-5xl text-ink sticky top-24">
                Tu empresa lo necesita si...
              </h2>
            </div>
            <div className="md:w-2/3 flex flex-col gap-6">
              {[
                "Tienes contenido que necesita moverse pero no sabes cómo hacerlo",
                "Publicaste un aviso de motion designer y no encontraste a nadie adecuado",
                "Tu competencia ya usa animación y tú todavía no",
                "Necesitas una pieza animada puntual y no quieres contratar a nadie permanente",
                "Tienes un spot que necesita motion, títulos o postproducción"
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start border-b border-border pb-6">
                  <span className="text-accent mt-1">→</span>
                  <p className="font-body text-lg md:text-xl text-ink">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Prueba social */}
          <section>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[3px] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-12">
              Prueba social
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
              
              <div className="bg-s1 p-8 hover:bg-s2 transition-colors flex flex-col gap-2">
                <h4 className="font-display text-5xl md:text-6xl text-accent mb-2">15+</h4>
                <p className="font-body text-mid text-sm">Años produciendo piezas audiovisuales y motion para marcas en Chile</p>
              </div>

              <div className="bg-s1 p-8 hover:bg-s2 transition-colors flex flex-col gap-2">
                <h4 className="font-display text-5xl md:text-6xl text-accent mb-2">MAC</h4>
                <p className="font-body text-mid text-sm">Animación experimental expuesta en el Museo de Arte Contemporáneo de Chile</p>
              </div>

              <div className="bg-s1 p-8 hover:bg-s2 transition-colors flex flex-col gap-2">
                <h4 className="font-display text-5xl md:text-6xl text-accent mb-2 tracking-tighter leading-tight" style={{fontSize: "clamp(24px, 4vw, 42px)"}}>LAN · Canal 13 · Dando la Hora</h4>
                <p className="font-body text-mid text-sm">Marcas reales con producción audiovisual entregada</p>
              </div>

            </div>
          </section>

          {/* CTA FINAL */}
          <section id="contacto">
            <div className="bg-s1 border border-border p-8 md:p-16 flex flex-col items-start gap-8">
              <h2 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">
                ¿Necesitas motion design para tu marca?
              </h2>
              <p className="font-body text-mid text-lg md:text-xl max-w-2xl">
                Cuéntame qué necesitas. Primera conversación sin costo — evaluamos si tiene sentido trabajar juntos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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

              <div className="mt-8">
                <p className="font-mono text-[10px] text-muted tracking-widest uppercase">
                  Valparaíso, Viña del Mar, Santiago y todo Chile · Proyectos remotos y presenciales
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
