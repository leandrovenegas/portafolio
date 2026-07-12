import Link from "next/link";

export const metadata = {
  title: 'Contratar Editor de Video Freelance | Leandro Venegas',
  description: 'Cotiza tu proyecto de edición de video. Precios claros, portafolio verificable, entrega en los plazos acordados.',
  openGraph: {
    title: 'Contratar Editor de Video Freelance | Leandro Venegas',
    description: 'Cotiza tu proyecto de edición de video. Precios claros, portafolio verificable, entrega en los plazos acordados.',
    url: 'https://www.leandrovenegas.cl/contratar-editor-de-video',
  },
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/contratar-editor-de-video',
  },
};

export default function ContratarEditorPage() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20quiero%20cotizar%20un%20proyecto%20de%20edici%C3%B3n%20de%20video";

  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-24 md:gap-32">
          
          {/* HERO */}
          <section className="pt-12 md:pt-24 min-h-[60vh] flex flex-col justify-center">
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8 max-w-5xl">
              Contratar un Editor de Video Freelance
            </h1>
            
            <div className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12 flex flex-col gap-6">
              <p>Antes de contratar, es normal tener dudas: ¿cuánto cobra?, ¿qué incluye el servicio?, ¿cómo se maneja el proceso? Aquí las respuestas directas.</p>
              
              {/* IMG: hero */}

              <p>El proceso funciona así: primero conversamos sobre tu proyecto y objetivo, luego te envío una cotización clara con alcance y plazos definidos, y una vez aprobada comenzamos la producción o edición según corresponda.</p>

              <p>Trabajo con clientes en Valparaíso, Viña del Mar y Santiago, con experiencia que incluye dirección de campañas para marcas reconocidas y proyectos de crowdfunding con cobertura en TV nacional.</p>
              
              <p>Cotiza tu proyecto sin compromiso.</p>
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
