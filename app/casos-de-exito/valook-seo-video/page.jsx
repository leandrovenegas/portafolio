import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: 'Caso Valook — SEO con Video: Posicionamiento en Google con Producción Audiovisual | Leandro Venegas',
  description: 'Cómo usamos video como activo SEO para posicionar a Valook en Google. Estrategia de keywords, producción audiovisual e implementación técnica integradas. Dragon Lab.',
  keywords: [
    'caso de éxito SEO video Chile',
    'posicionamiento Google video Chile',
    'SEO audiovisual caso real Chile',
    'estrategia video SEO Chile',
    'Valook SEO video',
    'caso estudio producción audiovisual SEO',
    'video marketing SEO Chile',
    'posicionamiento web con video Chile',
  ],
  openGraph: {
    title: 'Caso Valook — SEO con Video | Leandro Venegas',
    description: 'Estrategia de posicionamiento en Google usando video como activo central.',
    url: 'https://www.leandrovenegas.cl/casos-de-exito/valook-seo-video',
  },
};

export default function ValookSeoVideoPage() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20vi%20el%20caso%20Valook%20y%20quiero%20saber%20m%C3%A1s";

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">
          
          {/* HEADER DEL CASO */}
          <header className="pt-12 md:pt-24 flex flex-col items-start gap-8 border-b border-border pb-16">
            <p className="font-mono text-accent text-sm md:text-base tracking-wide">
              Caso de Éxito · Dragon Lab para Valook
            </p>
            <h1 className="font-display text-display-sm md:text-display-md lg:text-display-lg text-ink leading-[0.9] max-w-4xl">
              Cómo posicionamos a Valook en Google usando video como activo central
            </h1>
            <p className="font-body text-mid text-xl md:text-2xl max-w-3xl leading-relaxed">
              Estrategia SEO + producción audiovisual integradas desde el inicio. Un proceso, un resultado.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-8 bg-s1 border border-border p-6 md:p-8 w-full">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-muted tracking-widest uppercase">Cliente</span>
                <span className="font-body text-ink font-medium">Valook</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-muted tracking-widest uppercase">Canal</span>
                <span className="font-body text-ink font-medium">Dragon Lab</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-muted tracking-widest uppercase">Servicio</span>
                <span className="font-body text-ink font-medium">SEO con Video</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-muted tracking-widest uppercase">Resultado</span>
                <span className="font-body text-accent font-medium leading-tight">Posicionamiento orgánico mediante video indexado</span>
              </div>
            </div>
          </header>

          {/* El contexto */}
          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-1/3">
              <h2 className="font-display text-3xl md:text-4xl text-ink sticky top-24">
                El punto de partida
              </h2>
            </div>
            <div className="md:w-2/3">
              <p className="font-body text-mid text-lg md:text-xl leading-relaxed">
                Valook necesitaba visibilidad en Google en un mercado con competidores establecidos. La estrategia convencional — optimizar texto y construir backlinks — tomaría meses. Identificamos una oportunidad diferente: Google estaba mostrando resultados de video en las búsquedas clave del sector, y ningún competidor los tenía. Era un territorio sin ocupar.
              </p>
            </div>
          </section>

          {/* La estrategia */}
          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-1/3">
              <h2 className="font-display text-3xl md:text-4xl text-ink sticky top-24">
                Lo que hicimos diferente
              </h2>
            </div>
            <div className="md:w-2/3 flex flex-col gap-12">
              <p className="font-body text-mid text-lg md:text-xl leading-relaxed">
                En lugar de tratar el video como contenido para redes sociales y el SEO como una tarea separada, integramos ambos desde el inicio. Cada decisión de producción — estructura del guión, duración, títulos en pantalla — respondía a una lógica de posicionamiento. Cada decisión de SEO — keywords, Schema markup, arquitectura de URLs — estaba informada por el contenido audiovisual que íbamos a producir.
              </p>

              <div className="flex flex-col gap-8">
                <div className="border-l-2 border-accent pl-6">
                  <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-2">Fase 1</span>
                  <h3 className="font-display text-2xl text-ink mb-3">Investigación</h3>
                  <p className="font-body text-mid text-lg">
                    Mapeamos las búsquedas donde Google priorizaba video en los resultados. Identificamos las keywords con mayor volumen y menor competencia audiovisual en el sector de Valook.
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-6">
                  <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-2">Fase 2</span>
                  <h3 className="font-display text-2xl text-ink mb-3">Producción estratégica</h3>
                  <p className="font-body text-mid text-lg">
                    Produjimos los videos con la estructura y duración óptimas para posicionamiento. Guión, grabación, edición y motion graphics alineados con los objetivos SEO definidos.
                  </p>
                </div>
                <div className="border-l-2 border-border2 pl-6">
                  <span className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">Fase 3</span>
                  <h3 className="font-display text-2xl text-ink mb-3">Implementación técnica</h3>
                  <p className="font-body text-mid text-lg">
                    Schema de VideoObject, sitemap de video, Open Graph y carga optimizada. Todo lo que Google necesita para indexar, entender y mostrar el video en los resultados de búsqueda.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* El aprendizaje */}
          <section className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-1/3">
              <h2 className="font-display text-3xl md:text-4xl text-ink sticky top-24">
                Lo que esto demuestra
              </h2>
            </div>
            <div className="md:w-2/3">
              <p className="font-body text-ink text-xl md:text-2xl leading-relaxed">
                El video, bien ejecutado y con estrategia SEO desde el origen, posiciona más rápido que el texto en sectores donde la competencia audiovisual es baja. En Chile, ese sector es casi cualquiera. Las empresas producen video para redes sociales. Casi ninguna lo usa como activo de posicionamiento en Google. Esa brecha es la oportunidad.
              </p>
            </div>
          </section>

          {/* Links internos relevantes */}
          <section className="bg-s1 border border-border p-8 md:p-12 mb-8">
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
              ¿Quieres esto para tu empresa?
            </h2>
            <p className="font-body text-mid text-lg md:text-xl mb-8 max-w-2xl">
              Este caso es la demostración de que el servicio funciona. Si tu empresa tiene búsquedas en Google que podrían capturarse con video, hablemos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/servicios/seo-video" 
                className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors"
              >
                Ver el servicio de SEO con Video →
              </Link>
              <a 
                href={WA_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center font-mono text-xs tracking-wide border border-border2 text-mid px-6 py-4 hover:border-mid hover:text-ink transition-colors"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </section>

          {/* FOOTER DEL CASO */}
          <footer className="border-t border-border pt-8 pb-12">
            <nav className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
              <Link href="/portafolio" className="font-mono text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors">
                ← Volver al portafolio
              </Link>
              <div className="flex gap-6">
                <Link href="/servicios/seo-video" className="font-mono text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors">
                  Ver servicio SEO con Video →
                </Link>
                <Link href="/director-creativo-chile" className="font-mono text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors">
                  Contratar a Leandro →
                </Link>
              </div>
            </nav>
          </footer>

        </div>
      </main>
    </>
  );
}
