import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'Sobre Mí | Leandro Venegas',
  description: 'Conoce a Leandro Venegas, director creativo especializado en producción audiovisual con IA para empresas en Chile.',
};

export default function SobreMi() {
  const WA_LINK = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20llegu%C3%A9%20al%20sitio%20y%20quiero%20conversar%20sobre%20un%20proyecto";

  return (
    <>
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <section className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenido */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* Nueva narrativa Sobre Mí */}
              <div>
                <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8">
                  Sobre Mí
                </h1>
                <div className="space-y-6 font-body text-mid text-lg md:text-xl leading-relaxed">
                  <p>
                    De niño desarmaba juguetes para entender cómo funcionaban. Esa misma obsesión me llevó a construir mundos audiovisuales y, más tarde, a sumergirme en el código y la inteligencia artificial. Siempre en la trinchera, rompiendo cosas para construir otras.
                  </p>
                  <p>
                    Cofundé dos agencias, llegué a producir un video para LAN y creativos para Dandolahora, armé el departamento audiovisual de Incoludido desde cero. Las vueltas de la vida y mis ganas de hacer negocios me llevaron al otro lado del mostrador: monté mi propio restaurante. Mientras freía papas y atendía público, mi cabeza seguía creando. Aprendía a programar de madrugada, frustrándome por la infinita complejidad del software y porque no generaba dinero, solo la satisfacción de explorar un mundo nuevo con un potencial infinito.
                  </p>
                  <p>
                    Hoy, esa complejidad técnica quedó delegada a las máquinas. Lo que me quedó fue la lógica de negocio y el conocimiento estructural. Al mirar hacia atrás, uniendo mi etapa audiovisual con mi experiencia como dueño de negocio, descubrí un patrón. Todos los videos que produje para agencias y marcas compartían exactamente la misma estructura.
                  </p>
                  <p>
                    Una secuencia lógica de cuatro pasos que transforma la atención en confianza y, finalmente, en ventas. Es el sistema de video marketing que generó 815.000 visualizaciones para Valook y llevó una marca de consumo masivo a televisión abierta.
                  </p>
                  <p>
                    No soy un gurú que te enseñará a ser empresario. Eres tú quien guía a tus clientes; yo construyo la maquinaria para que lo logres a escala. Uso IA y automatización para orquestar este sistema, manteniendo intacta el alma narrativa que hace que un video convierta.
                  </p>
                  <p className="font-bold text-ink">
                    Mi diferenciador no es el software. Es saber cómo funcionan los negocios y conocer el peso exacto de estar del otro lado del mostrador.
                  </p>
                  <p className="italic text-ink/80 pb-4">
                    No soy Morfeo, pero construyo la matriz para que encuentres el camino correcto.
                  </p>
                </div>
              </div>

              {/* Llamado a la acción */}
              <div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={WA_LINK}
                    className="bg-accent text-black px-8 py-3 rounded-lg font-display text-lg hover:bg-accent/80 transition-colors duration-200 text-center"
                  >
                    Ver cómo funciona el sistema
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

            {/* Fotografía */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-sm h-80 md:h-[450px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10">
                <Image
                  src="https://res.cloudinary.com/dx2rvpvwr/image/upload/v1780214701/abautme_aih51a.png"
                  alt="Leandro Venegas"
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
