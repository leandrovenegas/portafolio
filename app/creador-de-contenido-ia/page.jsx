import Link from "next/link";

export const metadata = {
  title: 'Creador de Contenido con IA | Producción Audiovisual + Automatización',
  description: 'Producción de video potenciada con herramientas de inteligencia artificial: más contenido, mismo nivel de calidad, menor tiempo de entrega.',
  openGraph: {
    title: 'Creador de Contenido con IA | Producción Audiovisual + Automatización',
    description: 'Producción de video potenciada con herramientas de inteligencia artificial: más contenido, mismo nivel de calidad, menor tiempo de entrega.',
    url: 'https://www.leandrovenegas.cl/creador-de-contenido-ia',
  },
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/creador-de-contenido-ia',
  },
};

export default function CreadorContenidoIAPage() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20quiero%20saber%20m%C3%A1s%20sobre%20creaci%C3%B3n%20de%20contenido%20con%20IA";

  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-24 md:gap-32">
          
          {/* HERO */}
          <section className="pt-12 md:pt-24 min-h-[60vh] flex flex-col justify-center">
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl">
              Creador de Contenido Audiovisual con IA
            </h1>
            
            <div className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12 flex flex-col gap-6">
              <p>La producción de video tradicional tiene un techo: el tiempo. Incorporar herramientas de inteligencia artificial en el flujo de trabajo permite producir más contenido de calidad sin sacrificar el criterio creativo que hace que un video realmente comunique.</p>
              
              {/* IMG: hero */}

              <p>Esto no reemplaza la dirección creativa ni el ojo narrativo que se construye con años de experiencia, la IA se usa donde aporta velocidad: en post-producción, generación de variaciones, y optimización de flujos de entrega, mientras la parte estratégica (guion, dirección, storytelling) sigue siendo trabajo humano.</p>

              <p>Ideal para empresas que necesitan contenido recurrente para redes sin escalar su presupuesto de producción al mismo ritmo.</p>
              
              <p>¿Quieres saber cómo se vería esto aplicado a tu marca? Hablemos.</p>
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
