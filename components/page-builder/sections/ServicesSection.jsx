'use client';

export default function ServicesSection({
  title = "Servicios",
  subtitle = "Disponibles de fácil contratación. En menos de 24-48 horas tu video está listo.",
  services = [
    {
      id: "1",
      title: "Edición de video",
      description: "¿Necesitas un editor rápido y con experiencia? Valparaíso, Viña del Mar, Santiago, todo Chile y el mundo. Con fibra óptica y listo para editar.",
      buttonText: "Contactar",
      buttonLink: "https://wa.me/56988804299?text=Hola%20Leandro%2C%20necesito%20un%20editor%20de%20video%20r%C3%A1pido%20y%20con%20experiencia."
    },
    {
      id: "2",
      title: "Grabación de video",
      description: "Tienes una idea o un producto ganador, pero te falta equipo para grabar. No te preocupes, estás en manos expertas y creativas listas para ayudarte.",
      buttonText: "Contactar",
      buttonLink: "https://wa.me/56988804299?text=Hola%20Leandro%2C%20tengo%20una%20idea%2Fproducto%20pero%20necesito%20ayuda%20para%20grabar%20el%20video."
    }
  ],
  forceBp = null
}) {
  return (
    <section className="w-full py-16 md:py-24 grid grid-cols-1 gap-12">
      <div className="col-span-1 grid grid-cols-1 gap-4 text-center max-w-3xl mx-auto px-4 justify-items-center">
        {title && (
          <h2 
            data-field="title"
            className="font-display text-4xl md:text-5xl text-ink tracking-tight uppercase"
          >
            {title}
          </h2>
        )}
        {subtitle && (
          <p 
            data-field="subtitle"
            className="font-body text-mid text-base md:text-lg max-w-2xl leading-relaxed"
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto w-full px-4">
        {services.map((svc) => (
          <div
            key={svc.id || svc.title}
            className="col-span-1 group flex flex-col justify-between p-8 rounded-2xl border border-border/30 bg-[#0F0F0F] transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(255,204,0,0.05)] hover:-translate-y-1"
          >
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl md:text-3xl text-ink tracking-tight uppercase group-hover:text-accent transition-colors duration-300">
                {svc.title}
              </h3>
              <div 
                className="font-body text-mid text-sm md:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: svc.description }}
              />
            </div>

            {svc.buttonText && svc.buttonLink && (
              <div className="mt-8">
                <a
                  href={svc.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 font-display text-sm tracking-widest uppercase bg-ink text-bg hover:bg-accent hover:text-bg transition-colors duration-300 font-bold rounded-lg"
                >
                  {svc.buttonText}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
