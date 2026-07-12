'use client';

export default function FormatsSection({
  title = "Algunos de estos formatos te pueden interesar",
  items = [
    {
      id: "1",
      title: "Prueba social real",
      description: "Reseñas en video de tus propios clientes, convertidas en el contenido que más vende: gente real hablando bien de ti."
    },
    {
      id: "2",
      title: "Un video, múltiples formatos",
      description: "De una sola grabación armo reels, historias y piezas para cada plataforma. Publicas más sin grabar más."
    },
    {
      id: "3",
      title: "Sistema de video marketing",
      description: "¿Sabes que con un video no basta? Te presento mi estrategia de contenidos mensual, con métricas de rendimiento."
    }
  ],
  forceBp = null
}) {
  return (
    <section className="w-full py-16 md:py-24 flex flex-col gap-16">
      {title && (
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 
            data-field="title"
            className="font-display text-4xl md:text-5xl text-ink tracking-tight uppercase"
          >
            {title}
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full px-4">
        {items.map((fmt) => (
          <div
            key={fmt.id || fmt.title}
            className="flex flex-col gap-6 p-8 rounded-2xl border border-border/20 bg-[#0A0A0A]/50 transition-all duration-300 hover:border-accent/20 hover:bg-[#0F0F0F]"
          >
            <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center font-mono text-xs text-accent font-semibold bg-accent/5 shrink-0">
              {fmt.id}
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display text-xl md:text-2xl text-ink tracking-tight uppercase">
                {fmt.title}
              </h3>
              <div 
                className="font-body text-mid text-sm md:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: fmt.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
