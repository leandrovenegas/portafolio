import Link from "next/link";

export const metadata = {
  title: 'Editor de Video para Redes Sociales | Leandro Venegas',
  description: 'Edición profesional de Reels, TikTok y contenido para Instagram y YouTube. Videos optimizados para retención y conversión.',
  openGraph: {
    title: 'Editor de Video para Redes Sociales | Leandro Venegas',
    description: 'Edición profesional de Reels, TikTok y contenido para Instagram y YouTube. Videos optimizados para retención y conversión.',
    url: 'https://www.leandrovenegas.cl/editor-de-video-para-redes-sociales',
  },
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/editor-de-video-para-redes-sociales',
  },
};

export default function EditorVideoRedesPage() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20necesito%20un%20editor%20de%20video%20para%20redes%20sociales";

  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-24 md:gap-32">
          
          {/* HERO */}
          <section className="pt-12 md:pt-24 min-h-[60vh] flex flex-col justify-center">
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl">
              Editor de Video para Redes Sociales
            </h1>
            
            <div className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12 flex flex-col gap-6">
              <p>Cada plataforma tiene su propio lenguaje visual. Un video que funciona en YouTube no rinde igual en TikTok, y lo que capta atención en Instagram no siempre convierte en Reels. Por eso cada proyecto se edita pensando en el formato final: vertical, cuadrado o horizontal, con ritmo de corte adaptado a cada red.</p>
              
              {/* IMG: hero */}

              <p>Con 10 años de experiencia en producción audiovisual, incluyendo campañas para marcas como LAN y Valook (815K visualizaciones orgánicas), sé lo que hace que un video se detenga en el scroll: los primeros 3 segundos, el subtitulado dinámico, y una historia que se entiende sin sonido.</p>

              <p>Qué incluye el servicio: edición de ritmo rápido, subtítulos animados, corrección de color, diseño de sonido, y entrega en los formatos que cada plataforma exige.</p>
              
              <p>¿Buscas contenido constante para tus redes? Conversemos sobre tu proyecto.</p>
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

        </div>
      </main>
    </>
  );
}
