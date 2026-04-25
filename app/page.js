import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Videos para Empresas en Valparaíso, Viña del Mar y Santiago con IA | Leandro Venegas',
  description: 'Producción de video para pymes en Valparaíso , Viña del Mar y Santiago. Contenido audiovisual con inteligencia artificial: más videos, menor costo, dirección creativa profesional.',
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
    title: 'Videos para Empresas en Valparaíso, Viña del Mar y Santiago con IA | Leandro Venegas',
    description: 'Producción de video para pymes en Valparaíso , Viña del Mar y Santiago. Contenido audiovisual con inteligencia artificial: más videos, menor costo, dirección creativa profesional.',
    url: 'https://www.leandrovenegas.cl/',
  },
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta producir un video para mi empresa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depende del formato y el objetivo. Trabajo con presupuestos reales de pymes — por eso la primera conversación es para entender qué necesitas y qué es posible con tu presupuesto. Sin compromiso."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué tipos de video puedo producir para mi negocio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Videos para redes sociales, video corporativo, animación con IA, y piezas para campañas digitales en Meta, Google o YouTube."
      }
    },
    {
      "@type": "Question",
      "name": "¿La inteligencia artificial reemplaza la dirección creativa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. La IA reduce tiempos y costos de producción, pero el concepto, el guión y la dirección creativa siguen siendo trabajo humano. Esa es la diferencia entre un video que funciona y uno genérico."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajas solo con empresas de Valparaíso y Viña del Mar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mi foco es la quinta región, pero trabajo con empresas de todo Chile según el proyecto."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo toma producir un video?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un video para redes sociales puede estar listo en menos de una semana. Un video corporativo o animación toma entre 2 y 4 semanas dependiendo de la complejidad."
      }
    }
  ]
};

export default function Home() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20llegu%C3%A9%20al%20sitio%20y%20quiero%20conversar%20sobre%20un%20proyecto";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        {/* BLOQUE 1 — HERO */}
        <section className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl min-h-[70vh] flex flex-col justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

          <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl">
            El video con IA cambió las reglas del juego.
          </h1>
          <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Producir contenido audiovisual ya no requiere presupuestos grandes. Con IA, el mismo dinero rinde más: más videos, más variedad, más velocidad — sin perder dirección creativa.
          </p>
          <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
            Es el momento de usarlo.
          </p>
        </section>

        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-24 md:gap-32">
          
          {/* BLOQUE 2 — H2 */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl mb-8">
              El momento que las pymes no pueden ignorar
            </h2>
            <p className="font-body text-mid text-lg leading-relaxed mb-6">
              Hasta hace poco, un video comercial de calidad en Chile costaba entre 3 y 10 millones de pesos. Equipo técnico, postproducción, animación, locución — cada ítem sumaba.
            </p>
            <p className="font-body text-mid text-lg leading-relaxed mb-6">
              Hoy, con inteligencia artificial integrada al proceso de producción, esa misma calidad se logra en una fracción del tiempo y del presupuesto. No es magia. Es que las herramientas cambiaron.
            </p>
            <p className="font-body text-mid text-lg leading-relaxed">
              Llevo años produciendo <Link href="/portafolio" className="text-accent hover:text-accent2 transition-colors">contenido audiovisual</Link> para empresas en Valparaíso y Viña del Mar. Integrar IA a ese proceso cambió lo que es posible entregar — en tiempo, en cantidad y en presupuesto.
            </p>
          </section>

          {/* BLOQUE 3 — H2 */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl mb-8">
              Por qué las empresas de Valparaíso están eligiendo el video como su principal formato de marketing
            </h2>
            <p className="font-body text-mid text-lg leading-relaxed mb-6">
              El video no es una tendencia. Es el formato que más tiempo retiene a una persona en una pantalla, el que más se comparte y el que mejor convierte visitas en clientes.
            </p>
            <p className="font-body text-mid text-lg leading-relaxed mb-6">
              Los números lo dicen hace años: una página con video convierte hasta 80% más que una sin él. Un mensaje en video se recuerda 6 veces más que uno escrito. Y en redes sociales — Instagram, TikTok, YouTube, LinkedIn — el algoritmo favorece el video por sobre cualquier otro formato.
            </p>
            <p className="font-body text-mid text-lg leading-relaxed">
              El problema hasta ahora era el costo. Producir video de calidad estaba fuera del alcance de la mayoría de las pymes en Valparaíso y Viña del Mar. Eso cambió.
            </p>
          </section>

          {/* BLOQUE 4 — H2 */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl mb-12">
              Qué puedo producir para tu empresa
            </h2>
            <p className="font-body text-mid text-lg leading-relaxed mb-12">
              Trabajo con pymes y marcas de Valparaíso y Viña del Mar que necesitan contenido audiovisual real — no stock, no plantillas genéricas. Cada video tiene dirección creativa, guión y producción adaptada a tu negocio y tu presupuesto.
            </p>
            <ul className="space-y-8">
              <li>
                <strong className="font-display text-xl text-ink">Videos para redes sociales</strong> — Reels, TikToks y contenido corto diseñado para retener y convertir. Formato optimizado para Instagram, TikTok y LinkedIn.
              </li>
              <li>
                <strong className="font-display text-xl text-ink">Video corporativo</strong> — Presentación de empresa, cultura organizacional, lanzamiento de producto. El formato que más credibilidad genera con clientes y socios.
              </li>
              <li>
                <strong className="font-display text-xl text-ink">Animación y motion graphics con IA</strong> — Explicación de servicios, procesos o productos complejos. Lo que antes costaba millones, hoy es accesible.
              </li>
              <li>
                <strong className="font-display text-xl text-ink">Video para campañas digitales</strong> — Piezas específicas para publicidad en Meta, Google o YouTube. Diseñadas para el objetivo de la campaña, no para ganar premios.
              </li>
            </ul>
          </section>

          {/* BLOQUE 5 — H2 */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl mb-8">
              Cuando el contenido audiovisual hace el trabajo de ventas
            </h2>
            <p className="font-body text-mid text-lg leading-relaxed mb-6">
              Incoludido es una marca chilena. Cuando lanzaron su campaña de crowdfunding, necesitaban que personas que no los conocían confiaran en ellos y pusieran dinero.
            </p>
            <p className="font-body text-mid text-lg leading-relaxed mb-6">
              Desarrollé la identidad audiovisual completa — concepto, dirección y producción. La campaña tenía una meta de 15 millones de pesos. Recaudó 23 millones.
            </p>
            <p className="font-body text-mid text-lg leading-relaxed">
              Eso es lo que hace el video bien producido: convierte desconocidos en clientes.
            </p>
          </section>

          {/* BLOQUE 6 — CTA */}
          <section id="contacto">
            <div className="border-t border-border pt-16 flex flex-col items-center text-center gap-8">
              <h2 className="font-display text-5xl md:text-6xl text-ink max-w-2xl">
                El mejor momento para hacer tu primer video era hace un año. El segundo mejor momento es ahora.
              </h2>
              <p className="font-body text-mid text-lg max-w-xl">
                Conversamos 20 minutos. Te cuento qué es posible con tu presupuesto real y diseñamos juntos un primer video que tenga sentido para tu negocio en Valparaíso o Viña del Mar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <a 
                  href={WA_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-10 py-5 hover:bg-accent2 transition-colors w-full sm:w-auto"
                >
                  Agendar conversación →
                </a>
              </div>
            </div>
          </section>

          {/* BLOQUE 7 — FAQ */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl mb-12">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl text-ink mb-4">¿Cuánto cuesta producir un video para mi empresa?</h3>
                <p className="font-body text-mid text-lg leading-relaxed">Depende del formato y el objetivo. Trabajo con presupuestos reales de pymes — por eso la primera conversación es para entender qué necesitas y qué es posible con tu presupuesto. Sin compromiso.</p>
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink mb-4">¿Qué tipos de video puedo producir para mi negocio?</h3>
                <p className="font-body text-mid text-lg leading-relaxed">Videos para redes sociales, video corporativo, animación con IA, y piezas para campañas digitales en Meta, Google o YouTube.</p>
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink mb-4">¿La inteligencia artificial reemplaza la dirección creativa?</h3>
                <p className="font-body text-mid text-lg leading-relaxed">No. La IA reduce tiempos y costos de producción, pero el concepto, el guión y la dirección creativa siguen siendo trabajo humano. Esa es la diferencia entre un video que funciona y uno genérico.</p>
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink mb-4">¿Trabajas solo con empresas de Valparaíso y Viña del Mar?</h3>
                <p className="font-body text-mid text-lg leading-relaxed">Mi foco es la quinta región, pero trabajo con empresas de todo Chile según el proyecto.</p>
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink mb-4">¿Cuánto tiempo toma producir un video?</h3>
                <p className="font-body text-mid text-lg leading-relaxed">Un video para redes sociales puede estar listo en menos de una semana. Un video corporativo o animación toma entre 2 y 4 semanas dependiendo de la complejidad.</p>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}