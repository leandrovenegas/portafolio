import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: 'Sobre Mí | Leandro Venegas',
  description: 'Conoce a Leandro Venegas, director creativo especializado en producción audiovisual con IA para empresas en Chile.',
};

export default function SobreMi() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20llegu%C3%A9%20al%20sitio%20y%20quiero%20conversar%20sobre%20un%20proyecto";

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <section className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenido */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* Encabezado llamativo */}
              <div>
                <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-4">
                  Hola, soy Leandro Venegas
                </h1>
                <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
Aumento la visibilidad en internet para diferentes empresas en Valparaíso, Viña del Mar y Santiago, diseño estrategias de marketing digital basadas en el formato preferido del Homo sapiens, videos cortos, videos largos, videos para todo el ciclo del producto, en definitiva soy un vendedor de productos y servicios potenciado por la IA, un Product Manager moderno.                </p>
              </div>

              {/* Propuesta de valor */}
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">¿Qué hago?</h2>
                <p className="font-body text-mid text-lg leading-relaxed mb-4">
                  Ayudo a pymes y emprendedores a comunicar su mensaje y productos de forma diferente pero efectiva. usando Landing Pages, videos, books, google ads y para los más diferentes y disruptivo, publicidad callejera en los tiempos sintéticos de IA y virtualidad.
                </p>
              </div>

              {/* Experiencia y logros */}
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">Mi experiencia</h2>
                <p className="font-body text-mid text-lg leading-relaxed mb-4">
                 Des pues de haber trabajado para  Dando la hora, Incoludido, Valook, Lan etc.. he descubierto que no solo vasta con lanzar un video bonito a internet Tambien es necesario una buena historia como le dicen ahora storytelling pero Tambien con una buena estrategia que tiene que ir a acompañada de los siguientes pasos 
                </p>
                <ul className="font-body text-mid text-lg leading-relaxed space-y-2">
                  <li>1. Diagnóstico y briefing estratégico</li>
                  <li>2. Definición de audiencia </li>
                  <li>3. Posicionamiento y propuesta de valor</li>
                  <li>4. Construcción del relato (Storytelling)</li>
                  <li>5. Estrategia de contenidos</li>
                  <li>6. Producción</li>
                  <li>7. Distribución y pauta</li>
                  <li>8. SEO y optimización de plataforma</li>
                  <li>9. Medición y análisis</li>
                  <li>10. Iteración</li>
                </ul>
              </div>

              {/* Toque personal */}
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">Mi pasión</h2>
                <p className="font-body text-mid text-lg leading-relaxed">
Vengo de la escuela de las Comunicaciones UNIACC donde me apasione por la comunicación audiovisual que es mi base, en el camino el mundo me abrió las puertas a lo digital y las estrategias y ahora todo este conocimiento se convirtió en mi passion que comparto con el mundo.                </p>
              </div>

              {/* Llamado a la acción */}
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">¡Hablemos!</h2>
                <p className="font-body text-mid text-lg leading-relaxed mb-6">
Si buscas elevar tu presencia digital con contenido audiovisual profesional y estrategia estoy aquí para ayudarte.                 </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={WA_LINK}
                    className="bg-accent text-black px-8 py-3 rounded-lg font-display text-lg hover:bg-accent/80 transition-colors duration-200 text-center"
                  >
                    Contactar por WhatsApp
                  </Link>
                  <Link
                    href="/portafolio"
                    className="border border-accent text-accent px-8 py-3 rounded-lg font-display text-lg hover:bg-accent hover:text-black transition-colors duration-200 text-center"
                  >
                    Ver mi trabajo
                  </Link>
                </div>
              </div>
            </div>

            {/* Espacio para fotografía */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="w-full max-w-sm h-80 bg-s2 rounded-lg flex items-center justify-center text-ink">
                <span className="text-lg">Leandro Venegas Foto</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}