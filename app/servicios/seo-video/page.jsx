import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: 'SEO con Video en Chile — Posicionamiento en Google con Producción Audiovisual | Leandro Venegas',
  description: 'Estrategia de posicionamiento en Google usando video como activo central. El único servicio en Chile que integra producción audiovisual y SEO. Caso real: Valook. Valparaíso.',
  keywords: [
    'SEO con video Chile',
    'posicionamiento Google con video Chile',
    'SEO audiovisual Chile',
    'video SEO Chile',
    'posicionamiento web video Chile',
    'SEO video marketing Chile',
    'estrategia video SEO Chile',
    'posicionamiento YouTube Chile',
    'video para SEO Chile',
    'SEO contenido audiovisual Chile',
  ],
  openGraph: {
    title: 'SEO con Video — Posicionamiento en Google con Producción Audiovisual | Leandro Venegas',
    description: 'El único servicio en Chile que integra producción de video y estrategia SEO.',
    url: 'https://www.leandrovenegas.cl/servicios/seo-video',
  },
};

export default function SeoVideoPage() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20quiero%20saber%20m%C3%A1s%20sobre%20SEO%20con%20video";

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-24 md:gap-32">
          
          {/* HERO */}
          <section className="pt-12 md:pt-24 min-h-[60vh] flex flex-col justify-center">
            <p className="font-mono text-accent text-sm md:text-base mb-6 tracking-wide">
              SEO con Video · Chile · Valparaíso · Viña del Mar · Santiago
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl">
              Posicionamiento en Google con Video — estrategia + producción
            </h1>
            <p className="font-body text-mid text-lg md:text-xl max-w-3xl leading-relaxed mb-12">
              Google prioriza el video. La mayoría de las empresas lo saben pero no lo usan estratégicamente. Este servicio integra lo que normalmente está separado: la estrategia de keywords y posicionamiento, y la producción del video que va a ejecutarla. Un servicio, un resultado.
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
                href="/casos-de-exito/valook-seo-video" 
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
              >
                Ver caso Valook →
              </Link>
            </div>
          </section>

          {/* Por qué el video... */}
          <section>
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              <div className="lg:w-1/2">
                <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">
                  Las agencias SEO no producen video. Las productoras no hacen SEO. Yo hago las dos cosas.
                </h2>
                <p className="font-body text-mid text-lg leading-relaxed">
                  Una agencia SEO te va a decir qué keywords trabajar. Una productora te va a grabar un video. Pero si el video no está optimizado para lo que busca tu cliente en Google, no va a posicionar. Y si la estrategia SEO no incluye video, estás perdiendo los resultados enriquecidos — los que más se ven y más se clican.
                </p>
              </div>
              <div className="lg:w-1/2 flex flex-col justify-center">
                <div className="flex flex-col gap-px bg-border border border-border">
                  {[
                    "Google muestra resultados de video en el 62% de las búsquedas universales (según Semrush)",
                    "Los snippets de video tienen CTR hasta 3× superior al resultado de texto",
                    "El 90% de las empresas en Chile no tiene Schema de video implementado — una oportunidad directa"
                  ].map((text, i) => (
                    <div key={i} className="bg-s1 p-6 flex gap-4 items-center">
                      <div className="w-2 h-2 rounded-full bg-accent shrink-0"></div>
                      <p className="font-body text-ink">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Cómo funciona el servicio */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-12">
              El proceso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              <div className="flex flex-col gap-4 border-l border-border pl-6">
                <h3 className="font-display text-3xl text-ink flex items-center gap-3">
                  <span className="text-accent text-xl">1</span> Investigación de keywords con intención de video
                </h3>
                <p className="font-body text-mid">
                  Identificamos búsquedas donde Google ya prioriza video en los resultados. Son las más fáciles de capturar y las más rentables.
                </p>
              </div>

              <div className="flex flex-col gap-4 border-l border-border pl-6">
                <h3 className="font-display text-3xl text-ink flex items-center gap-3">
                  <span className="text-accent text-xl">2</span> Estrategia de contenido audiovisual
                </h3>
                <p className="font-body text-mid">
                  Definimos qué videos producir, en qué orden, con qué estructura de guión para que posicionen. No es contenido por hacer contenido.
                </p>
              </div>

              <div className="flex flex-col gap-4 border-l border-border pl-6">
                <h3 className="font-display text-3xl text-ink flex items-center gap-3">
                  <span className="text-accent text-xl">3</span> Producción del video optimizado
                </h3>
                <p className="font-body text-mid">
                  Grabación, edición, motion graphics y entrega en formatos optimizados para web y para YouTube. Con títulos, descripciones y tags pensados para SEO.
                </p>
              </div>

              <div className="flex flex-col gap-4 border-l border-border pl-6">
                <h3 className="font-display text-3xl text-ink flex items-center gap-3">
                  <span className="text-accent text-xl">4</span> Implementación técnica
                </h3>
                <p className="font-body text-mid">
                  Schema markup de VideoObject, Open Graph, sitemap de video y carga optimizada en el sitio. Todo lo que Google necesita para indexar y mostrar el video correctamente.
                </p>
              </div>

            </div>
          </section>

          {/* Caso real */}
          <section className="bg-accent/5 border border-accent/20 p-8 md:p-16 text-center flex flex-col items-center">
            <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-4">Caso documentado</p>
            <h2 className="font-display text-5xl md:text-6xl text-ink mb-6">Valook</h2>
            <p className="font-body text-mid text-lg max-w-2xl mb-8">
              El proyecto con Valook a través de Dragon Lab es la demostración de concepto de este servicio. Estrategia de keywords, producción audiovisual y implementación técnica integradas en un solo proceso.
            </p>
            <Link 
              href="/casos-de-exito/valook-seo-video" 
              className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-ink text-bg px-8 py-3 hover:bg-white transition-colors"
            >
              Ver el caso completo →
            </Link>
          </section>

          {/* Para quién es esto */}
          <section>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-8">
              Tiene sentido si...
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Tienes un producto o servicio que la gente busca en Google y quieres aparecer primero",
                "Ya inviertes en SEO pero no estás usando video como activo de posicionamiento",
                "Produces video para redes pero no lo estás usando para posicionar en Google",
                "Quieres diferenciarte de competidores que solo usan texto",
                "Tu sector tiene pocas empresas con video indexado — hay espacio que tomar"
              ].map((item, i) => (
                <div key={i} className="bg-s1 border border-border p-6 flex items-start gap-4">
                  <div className="text-accent mt-1">✓</div>
                  <p className="font-body text-mid">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA FINAL */}
          <section id="contacto">
            <div className="bg-s1 border border-border p-8 md:p-16 flex flex-col items-start gap-8">
              <h2 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">
                ¿Quieres posicionar con video?
              </h2>
              <p className="font-body text-mid text-lg md:text-xl max-w-2xl">
                Hablemos de tu industria y tu sitio. En 30 minutos puedo decirte si hay oportunidad real de posicionamiento con video en tu sector.
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
                  Primera consulta sin costo · Chile · Proyectos remotos
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
