import Nav from "@/components/Nav";

export const metadata = {
  title: 'Precios de Servicios | Leandro Venegas',
  description: 'Lista de precios para servicios de producción audiovisual, fotografía, video, animación y desarrollo web.',
};

export default function Precios() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <section className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl">
          <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mb-8">
            Precios de Servicios
          </h1>
          <p className="font-body text-mid text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Esta página contiene la lista completa de precios para mis servicios. Solo accesible por URL directa.
          </p>

          {/* Google My Business */}
          <div className="mb-12">
            <h2 className="font-display text-2xl text-ink mb-6">Google My Business</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Setup completo</h3>
                <p className="text-mid mb-2">Creación, optimización, fotos, descripción SEO, categorías</p>
                <p className="font-bold text-accent">$120.000 - pago único</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Gestión mensual</h3>
                <p className="text-mid mb-2">Posts semanales, respuesta de reseñas, actualización de fotos</p>
                <p className="font-bold text-accent">$50.000 por mes</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Auditoría y diagnóstico</h3>
                <p className="text-mid mb-2">Informe de presencia local, competencia y recomendaciones</p>
                <p className="font-bold text-accent">$40.000 - pago único</p>
              </div>
            </div>
          </div>

          {/* Fotografía */}
          <div className="mb-12">
            <h2 className="font-display text-2xl text-ink mb-6">Fotografía</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Sesión foto corporativa / equipo</h3>
                <p className="text-mid mb-2">Hasta 3 horas, 20 fotos editadas, locación a convenir</p>
                <p className="font-bold text-accent">$200.000 por sesión</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Fotografía de producto</h3>
                <p className="text-mid mb-2">Hasta 10 productos, fondo estudio, retoque incluido</p>
                <p className="font-bold text-accent">$180.000 por sesión</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Cobertura fotográfica de evento</h3>
                <p className="text-mid mb-2">Hasta 4 horas, entrega 50+ fotos editadas</p>
                <p className="font-bold text-accent">$300.000 por evento</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Pack foto mensual para RRSS</h3>
                <p className="text-mid mb-2">8 fotos editadas para feed/stories, sesión mensual incluida</p>
                <p className="font-bold text-accent">$150.000 por mes</p>
              </div>
            </div>
          </div>

          {/* Video */}
          <div className="mb-12">
            <h2 className="font-display text-2xl text-ink mb-6">Video</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Reel / Short para RRSS</h3>
                <p className="text-mid mb-2">Hasta 30 seg, grabación + edición + captions</p>
                <p className="font-bold text-accent">$150.000 por pieza</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Video testimonial de cliente</h3>
                <p className="text-mid mb-2">Hasta 2 min, grabación + edición + música</p>
                <p className="font-bold text-accent">$280.000 por video</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Video producto / servicio</h3>
                <p className="text-mid mb-2">Hasta 30 seg, grabación + edición + color + música</p>
                <p className="font-bold text-accent">$350.000 por video</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Video institucional / corporativo</h3>
                <p className="text-mid mb-2">Hasta 90 seg, guión + grabación + edición + motion</p>
                <p className="font-bold text-accent">$700.000 por video</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Cobertura video de evento</h3>
                <p className="text-mid mb-2">Hasta 4 horas, edición highlight 3–5 min incluida</p>
                <p className="font-bold text-accent">$400.000 por evento</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Video documental / mini-doc</h3>
                <p className="text-mid mb-2">Hasta 5 min, producción completa + postproducción</p>
                <p className="font-bold text-accent">$1.200.000 por pieza</p>
              </div>
            </div>
          </div>

          {/* Animación y motion */}
          <div className="mb-12">
            <h2 className="font-display text-2xl text-ink mb-6">Animación y motion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Animación logo / intro</h3>
                <p className="text-mid mb-2">Motion design, hasta 5 seg, entrega en .mp4 + .gif</p>
                <p className="font-bold text-accent">$150.000 pago único</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Motion graphics para video</h3>
                <p className="text-mid mb-2">Textos animados, gráficos, infografías, hasta 30 seg</p>
                <p className="font-bold text-accent">$280.000 por pieza</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Video animado explicativo 2D</h3>
                <p className="text-mid mb-2">Hasta 60 seg, guión + ilustración + animación</p>
                <p className="font-bold text-accent">$900.000 por video</p>
              </div>
            </div>
          </div>

          {/* Sitios web */}
          <div className="mb-12">
            <h2 className="font-display text-2xl text-ink mb-6">Sitios web</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Landing page</h3>
                <p className="text-mid mb-2">1 página de conversión, diseño + desarrollo + SEO básico</p>
                <p className="font-bold text-accent">$500.000 pago único</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Sitio web corporativo</h3>
                <p className="text-mid mb-2">5 páginas, diseño + desarrollo + SEO + dominio + hosting 1 año</p>
                <p className="font-bold text-accent">$950.000 pago único</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Sitio web con blog / noticias</h3>
                <p className="text-mid mb-2">5 páginas + módulo blog, CMS editable, SEO on-page</p>
                <p className="font-bold text-accent">$1.200.000 pago único</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">E-commerce básico</h3>
                <p className="text-mid mb-2">Hasta 50 productos, carrito, pago online (Webpay / Flow)</p>
                <p className="font-bold text-accent">$1.600.000 pago único</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Mantención web mensual</h3>
                <p className="text-mid mb-2">Actualizaciones, backups, cambios menores, soporte</p>
                <p className="font-bold text-accent">$60.000 por mes</p>
              </div>
            </div>
          </div>

          {/* Contenido web */}
          <div className="mb-12">
            <h2 className="font-display text-2xl text-ink mb-6">Contenido web</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Copywriting por página</h3>
                <p className="text-mid mb-2">Textos optimizados para SEO y conversión, tono de marca</p>
                <p className="font-bold text-accent">$80.000 por página</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">SEO on-page por página</h3>
                <p className="text-mid mb-2">Title, meta, H1, estructura, alt texts, velocidad</p>
                <p className="font-bold text-accent">$60.000 por página</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Pack contenido web completo</h3>
                <p className="text-mid mb-2">Texto + SEO para 5 páginas, incluye revisión y entrega lista</p>
                <p className="font-bold text-accent">$350.000 pago único</p>
              </div>
              <div className="bg-s2 p-6 rounded-lg shadow-md">
                <h3 className="font-display text-xl text-ink mb-2">Blog posts SEO mensual</h3>
                <p className="text-mid mb-2">4 artículos optimizados, 600–900 palabras c/u, imágenes incluidas</p>
                <p className="font-bold text-accent">$200.000 por mes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}