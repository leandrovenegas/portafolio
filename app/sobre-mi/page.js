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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Espacio para fotografía */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-80 h-80 bg-s2 rounded-lg flex items-center justify-center text-ink">
                <span className="text-lg">Foto de Leandro</span>
              </div>
            </div>

            {/* Contenido */}
            <div className="space-y-8">
              {/* Encabezado llamativo */}
              <div>
                <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-4">
                  Hola, soy Leandro Venegas
                </h1>
                <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed">
                  Director creativo especializado en producción audiovisual con inteligencia artificial para empresas en Valparaíso, Viña del Mar y Santiago.
                </p>
              </div>

              {/* Propuesta de valor */}
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">¿Qué hago?</h2>
                <p className="font-body text-mid text-lg leading-relaxed mb-4">
                  Ayudo a pymes y emprendedores a comunicar su mensaje de manera efectiva mediante contenido audiovisual de alta calidad. Con la inteligencia artificial, democratizo el acceso a producciones profesionales, reduciendo tiempos y costos sin sacrificar la dirección creativa.
                </p>
                <p className="font-body text-mid text-lg leading-relaxed">
                  Resuelvo el problema de presupuestos limitados para marketing visual, permitiendo que más negocios puedan competir en el mundo digital con videos que generan engagement y conversiones.
                </p>
              </div>

              {/* Experiencia y logros */}
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">Mi experiencia</h2>
                <p className="font-body text-mid text-lg leading-relaxed mb-4">
                  Con más de 5 años en el mundo creativo, me he especializado en motion design, producción audiovisual y SEO para video. He trabajado con empresas locales en Valparaíso y la región, creando contenido que no solo se ve bien, sino que funciona.
                </p>
                <ul className="font-body text-mid text-lg leading-relaxed space-y-2">
                  <li>• Producción de videos institucionales y comerciales</li>
                  <li>• Desarrollo de estrategias de contenido con IA</li>
                  <li>• Optimización SEO para plataformas como YouTube y Meta</li>
                  <li>• Fotografía corporativa y de producto</li>
                  <li>• Creación de sitios web y contenido digital</li>
                </ul>
              </div>

              {/* Toque personal */}
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">Mi pasión</h2>
                <p className="font-body text-mid text-lg leading-relaxed">
                  Apasionado por la creatividad y la tecnología, creo que la IA no reemplaza al ser humano, sino que lo potencia. Mi objetivo es ayudar a que cada negocio tenga voz en el mundo digital, especialmente en la quinta región de Chile. Cuando no estoy creando contenido, me encuentras explorando nuevos lugares o probando técnicas de edición innovadoras.
                </p>
              </div>

              {/* Llamado a la acción */}
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">¡Hablemos!</h2>
                <p className="font-body text-mid text-lg leading-relaxed mb-6">
                  Si buscas elevar tu presencia digital con contenido audiovisual profesional, estoy aquí para ayudarte. Revisemos juntos cómo podemos hacer que tu marca destaque.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={WA_LINK}
                    className="bg-accent text-ink px-8 py-3 rounded-lg font-display text-lg hover:bg-accent/80 transition-colors duration-200 text-center"
                  >
                    Contactar por WhatsApp
                  </Link>
                  <Link
                    href="/portafolio"
                    className="border border-accent text-accent px-8 py-3 rounded-lg font-display text-lg hover:bg-accent hover:text-ink transition-colors duration-200 text-center"
                  >
                    Ver mi trabajo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}