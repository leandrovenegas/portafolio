import Link from "next/link";

export const metadata = {
  title: 'Director Creativo por Proyecto en Chile — Sin cargo en planilla | Leandro Venegas',
  description: '¿Necesitas un director creativo en Chile pero no puedes pagar el sueldo? Dirección creativa estratégica por proyecto o retainer, sin contrato laboral. Valparaíso y todo Chile.',
  keywords: [
    'director creativo externo Chile',
    'director creativo freelance Chile',
    'director creativo Valparaíso',
    'director creativo por proyecto Chile',
    'contratar director creativo Chile',
    'director creativo PYME Chile',
    'dirección creativa externa Chile',
    'director creativo sin planilla Chile',
    'consultor creativo Chile',
    'director creativo Viña del Mar',
  ],
  openGraph: {
    title: 'Director Creativo por Proyecto — Sin cargo en planilla | Leandro Venegas',
    description: 'Dirección creativa estratégica para empresas en Chile, sin contrato laboral.',
    url: 'https://www.leandrovenegas.cl/servicios/director-creativo-externo',
  },
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/servicios/director-creativo-externo',
  },
};

export default function DirectorCreativoExternoPage() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20necesito%20direcci%C3%B3n%20creativa%20para%20mi%20empresa";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dirección Creativa por Proyecto",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Leandro Venegas - Productor Audiovisual"
    },
    "areaServed": [
      { "@type": "City", "name": "Valparaíso" },
      { "@type": "City", "name": "Viña del Mar" },
      { "@type": "City", "name": "Santiago" }
    ],
    "serviceType": "Dirección Creativa"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-24 md:gap-32">
          
          {/* HERO */}
          <section className="pt-12 md:pt-24 min-h-[60vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-sm md:text-base mb-6 tracking-wide">
              Dirección Creativa Externa · Chile · Valparaíso · Viña del Mar
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl">
              Director Creativo por proyecto — sin cargo en planilla
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-3xl leading-relaxed mb-6">
              Muchas empresas saben que necesitan un director creativo. Pocas pueden pagar el sueldo. Esta página existe para esas empresas: dirección creativa estratégica, activada por proyecto o en modalidad retainer, sin los costos de un cargo fijo.
            </p>
            <div className="bg-s1 border border-border p-6 mb-12 max-w-3xl">
              <p className="font-body text-mid text-base">
                <span className="font-semibold text-ink">Nota:</span> Esta página se enfoca en el modelo de contratación. Si buscas conocer mi trayectoria completa, portafolio y todos los servicios, visita el <Link href="/director-creativo-chile" className="text-accent hover:underline">hub de Director Creativo en Chile</Link>.
              </p>
            </div>
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

          {/* Qué hace un director creativo */}
          <section>
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              <div className="lg:w-1/2">
                <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">
                  No es solo alguien que diseña cosas bonitas
                </h2>
                <p className="font-body text-mid text-lg leading-relaxed">
                  Un director creativo define cómo tu marca se ve, suena y se comporta. Toma decisiones sobre qué comunicar, cómo comunicarlo y qué rechazar. Lidera equipos creativos, briefings, proveedores y agencias. Sin esa figura, cada pieza que produces es una apuesta — no una estrategia.
                </p>
              </div>
              <div className="lg:w-1/2 bg-s1 border border-border p-8">
                <ul className="flex flex-col gap-6 font-body text-ink">
                  {[
                    "Qué campañas lanzar y con qué mensaje",
                    "Si el video que hicieron refleja o traiciona la identidad de la marca",
                    "Qué proveedor audiovisual contratar y cómo briefearlo",
                    "Si el post de mañana es una oportunidad o un riesgo reputacional",
                    "Cómo se ve tu marca en tres años, no solo el mes que viene"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-accent">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Cómo funciona la modalidad externa */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">
              Tres formas de trabajar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
              
              <div className="bg-bg p-8 hover:bg-s1 transition-colors flex flex-col gap-4">
                <p className="font-mono text-[10px] text-accent tracking-widest uppercase">Modalidad 1</p>
                <h3 className="font-display text-3xl text-ink">Por proyecto</h3>
                <p className="font-body text-mid">
                  Un lanzamiento, una campaña, un rebranding. Alcance definido, entregables acordados, tarifa por proyecto. Sin compromisos más allá de lo acordado.
                </p>
              </div>

              <div className="bg-bg p-8 hover:bg-s1 transition-colors flex flex-col gap-4">
                <p className="font-mono text-[10px] text-accent tracking-widest uppercase">Modalidad 2</p>
                <h3 className="font-display text-3xl text-ink">Retainer mensual</h3>
                <p className="font-body text-mid">
                  Dirección creativa continua para empresas con flujo constante de decisiones y producción. Disponibilidad acordada, revisiones incluidas, presencia regular en el proceso.
                </p>
              </div>

              <div className="bg-bg p-8 hover:bg-s1 transition-colors flex flex-col gap-4">
                <p className="font-mono text-[10px] text-accent tracking-widest uppercase">Modalidad 3</p>
                <h3 className="font-display text-3xl text-ink">Consultoría puntual</h3>
                <p className="font-body text-mid">
                  Una sesión de diagnóstico, un brief revisado, una decisión difícil. Para cuando necesitas una segunda mirada experta sin un compromiso largo.
                </p>
              </div>

            </div>
          </section>

          {/* Por qué yo (Eliminado por canibalización) */}

          {/* CTA FINAL */}
          <section id="contacto">
            <div className="bg-s1 border border-border p-8 md:p-16 flex flex-col items-start gap-8 relative overflow-hidden">
              <h2 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">
                ¿Tu empresa necesita dirección creativa?
              </h2>
              <p className="font-body text-mid text-lg md:text-xl max-w-2xl">
                Hablemos. En 30 minutos puedo darte claridad sobre qué tipo de colaboración tiene sentido para tu situación.
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
                  Sin compromiso · Primera conversación gratuita · Valparaíso, Viña del Mar, Santiago y todo Chile
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
