import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata = {
  title: 'Leandro Venegas | Director Creativo, Producción Audiovisual y SEO con Video',
  description: 'Dirección creativa, motion design y SEO con video para marcas exigentes. Capacidad creativa senior por proyecto u horas, sin contratos en planilla. Valparaíso, Chile.',
  keywords: [
    'Leandro Venegas',
    'director creativo Chile',
    'productor audiovisual Chile',
    'estudio creativo Valparaíso',
    'motion design Chile',
    'SEO video Chile',
    'freelance creativo Chile',
  ],
  openGraph: {
    title: 'Leandro Venegas | Capacidad Creativa Senior',
    description: 'Dirección creativa, producción audiovisual y SEO con video.',
    url: 'https://www.leandrovenegas.cl/',
  },
};

export default function Home() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20llegu%C3%A9%20al%20sitio%20y%20quiero%20conversar%20sobre%20un%20proyecto";

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        
        {/* HERO SECTION */}
        <section className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl min-h-[70vh] flex flex-col justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

          <p className="font-mono text-accent text-xs md:text-sm mb-6 tracking-wide uppercase">
            Leandro Venegas · Director Creativo
          </p>
          <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl">
            Capacidad creativa sénior. Activada cuando tu marca la necesita.
          </h1>
          <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Dirección creativa estratégica, producción audiovisual de alta calidad y posicionamiento orgánico con video. El músculo de una agencia, la agilidad de un experto independiente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/portafolio"
              className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors w-full sm:w-auto"
            >
              Explorar Portafolio
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors w-full sm:w-auto"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </section>

        {/* STRIP CLIENTES (Social Proof INMEDIATO para bajar rebote) */}
        <div className="border-y border-border bg-s1 py-6 px-4 overflow-hidden relative flex items-center">
          <p className="font-mono text-muted text-[10px] sm:text-xs uppercase tracking-widest whitespace-nowrap overflow-x-auto w-full text-center scrollbar-hide">
            CONFIARON EN ESTE TRABAJO: 
            <span className="inline-block px-4 ml-4 text-mid">LAN → LATAM</span> •  
            <span className="inline-block px-4 text-mid">Canal 13</span> • 
            <span className="inline-block px-4 text-mid">Dr. Patricio Andrade</span> • 
            <span className="inline-block px-4 text-mid">Dando la Hora</span> •  
            <span className="inline-block px-4 text-mid">Valook</span> •  
            <span className="inline-block px-4 text-mid">Incoludido</span>
          </p>
        </div>

        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-24 md:gap-32">
          
          {/* SECCIÓN DE SERVICIOS (SEO Internal Linking Hub) */}
          <section>
            <div className="mb-12">
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-[3px] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-6">
                Especialidades
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl">
                ¿Qué problema necesitas resolver hoy?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              
              <Link href="/servicios/director-creativo-externo" className="bg-bg p-8 md:p-12 hover:bg-s1 transition-colors group flex flex-col items-start">
                <div className="font-mono text-[10px] text-accent tracking-widest uppercase mb-4 border border-accent/30 bg-accent/5 px-2 py-1">Estrategia</div>
                <h3 className="font-display text-3xl md:text-4xl text-ink mb-4 group-hover:text-accent transition-colors">Dirección Creativa Externa</h3>
                <p className="font-body text-mid flex-1">
                  Liderazgo creativo por proyecto o retainer. Define cómo tu marca se ve y se comporta, sin cargar el costo de un rol ejecutivo fijo en planilla.
                </p>
                <span className="font-mono text-xs text-muted mt-8 group-hover:text-ink transition-colors">Conocer modalidad →</span>
              </Link>

              <Link href="/servicios/produccion-audiovisual-empresas" className="bg-bg p-8 md:p-12 hover:bg-s1 transition-colors group flex flex-col items-start">
                <div className="font-mono text-[10px] text-accent tracking-widest uppercase mb-4 border border-accent/30 bg-accent/5 px-2 py-1">Video Corporativo</div>
                <h3 className="font-display text-3xl md:text-4xl text-ink mb-4 group-hover:text-accent transition-colors">Producción Audiovisual</h3>
                <p className="font-body text-mid flex-1">
                  Spots, reels, casos de estudio y contenido digital para tu empresa. Tu propia productora audiovisual a un clic de distancia.
                </p>
                <span className="font-mono text-xs text-muted mt-8 group-hover:text-ink transition-colors">Ver qué producimos →</span>
              </Link>

              <Link href="/servicios/motion-design" className="bg-bg p-8 md:p-12 hover:bg-s1 transition-colors group flex flex-col items-start">
                <div className="font-mono text-[10px] text-accent tracking-widest uppercase mb-4 border border-accent/30 bg-accent/5 px-2 py-1">Animación & 2D</div>
                <h3 className="font-display text-3xl md:text-4xl text-ink mb-4 group-hover:text-accent transition-colors">Motion Design</h3>
                <p className="font-body text-mid flex-1">
                  Haz que tu marca se mueva. Motion graphics, postproducción y animación de sistemas visuales orientados a redes y campañas digitales.
                </p>
                <span className="font-mono text-xs text-muted mt-8 group-hover:text-ink transition-colors">Saber más →</span>
              </Link>

              <Link href="/servicios/seo-video" className="bg-bg p-8 md:p-12 hover:bg-s1 transition-colors group flex flex-col items-start">
                <div className="font-mono text-[10px] text-accent tracking-widest uppercase mb-4 border border-accent/30 bg-accent/5 px-2 py-1">Growth & Tráfico</div>
                <h3 className="font-display text-3xl md:text-4xl text-ink mb-4 group-hover:text-accent transition-colors">SEO con Video</h3>
                <p className="font-body text-mid flex-1">
                  Estrategia de posicionamiento en Google combinada con producción de video. Captura búsquedas orgánicas dominando los Video Rich Snippets.
                </p>
                <span className="font-mono text-xs text-muted mt-8 group-hover:text-ink transition-colors">Descubrir el método →</span>
              </Link>

            </div>
          </section>

          {/* CASO DESTACADO (Caso de éxito para Authority) */}
          <section className="bg-s1 border border-border p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 flex flex-col items-start">
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase mb-4 block">Caso de Éxito Destacado</span>
              <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">Valook: Dominando la búsqueda orgánica</h2>
              <p className="font-body text-mid text-lg mb-8 max-w-xl">
                Descubre cómo unificamos la investigación SEO clásica con la producción de contenidos en video para posicionar a Valook en la primera página de Google, venciendo al texto plano.
              </p>
              <Link
                href="/casos-de-exito/valook-seo-video"
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-ink text-bg px-6 py-3 hover:bg-white transition-colors"
              >
                Leer Caso de Estudio Completo
              </Link>
            </div>
            <div className="flex-1 w-full bg-border rounded-sm min-h-[300px] flex items-center justify-center border border-border2">
              <span className="font-display text-6xl text-s1 pointer-events-none select-none">VALOOK x DRAGON LAB</span>
            </div>
          </section>

          {/* ACERCA DE LEANDRO VELOZ (Generar confianza / Reducir bouncerate) */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              <div>
                <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">
                  15+ años creando desde Valparaíso para el mundo.
                </h2>
                <p className="font-body text-mid text-lg leading-relaxed">
                  He fundado 4 organizaciones creativas (incluyendo <em>Dragon Lab, Crazy Papa Studio, Rayandola e Incoludido</em>), diseñado campañas multimillonarias con plataformas de crowdfunding propias, y llevado piezas animadas al Museo de Arte Contemporáneo (MAC). Todo mi conocimiento acumulado está a tu disposición bajo un esquema flexible y externo, para que pagues únicamente por lo que tu marca realmente necesita.
                </p>
              </div>
              <div className="flex flex-col justify-center border-l-2 border-border pl-6 md:pl-12">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <span className="font-body text-ink text-lg">Proyectos Entregados</span>
                    <span className="font-mono text-accent">500+</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <span className="font-body text-ink text-lg">Fondos Crowdfunding</span>
                    <span className="font-mono text-accent">15M+ CLP</span>
                  </div>
                  <div className="flex justify-between items-center pb-4">
                    <span className="font-body text-ink text-lg">Disponibilidad Actual</span>
                    <span className="font-mono text-accent">Aceptando</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA FINAL (Home Footer Contact) */}
          <section id="contacto">
            <div className="border-t border-border pt-16 flex flex-col items-center text-center gap-8">
              <h2 className="font-display text-5xl md:text-6xl text-ink max-w-2xl">
                Desbloquea el crecimiento de tu marca
              </h2>
              <p className="font-body text-mid text-lg max-w-xl">
                Sin intermediarios, sin retenciones interminables. Cuéntame tu desafío hoy y comencemos a planificar el impacto.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <a 
                  href={WA_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-10 py-5 hover:bg-accent2 transition-colors w-full sm:w-auto"
                >
                  Hablar con Leandro →
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}