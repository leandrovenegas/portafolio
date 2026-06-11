export const metadata = {
  title: "Agendemos una llamada | Leandro Venegas",
  description: "15 minutos para identificar el video que más rápido mueve tu negocio. Sin compromiso.",
  openGraph: {
    title: "Agendemos una llamada | Leandro Venegas",
    description: "15 minutos para identificar el video que más rápido mueve tu negocio. Sin compromiso.",
  },
  alternates: {
    canonical: "https://www.leandrovenegas.cl/contacto",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg relative overflow-hidden pb-24 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-20">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/3 blur-[180px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col gap-6 max-w-3xl">
        <h1 className="font-display text-display-md md:text-display-lg text-ink leading-[0.9]">
          Hablemos
        </h1>
        <p className="font-body text-mid text-lg md:text-xl leading-relaxed">
          15 minutos. Solo un diagnóstico honesto de dónde está tu negocio<br />
          y qué video lo mueve primero.
        </p>
      </section>

      {/* Como funciona el diagnostico */}
      <section className="relative z-10 flex flex-col gap-6">
        <h2 className="font-mono text-xs tracking-wider uppercase text-accent">
          Cómo funciona el diagnóstico
        </h2>
        <div className="flex flex-col gap-0 border border-border divide-y divide-border">
          
          <div className="group p-8 md:p-10 bg-bg hover:bg-s1 transition-colors flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            <span className="font-mono text-sm text-accent shrink-0">01</span>
            <div className="flex flex-col gap-2 max-w-2xl">
              <h3 className="font-display text-xl text-ink">Dónde estás</h3>
              <p className="font-body text-mid text-base leading-relaxed">
                Qué vendes, a quién llegas y esta tu cuello de botella.
              </p>
            </div>
          </div>

          <div className="group p-8 md:p-10 bg-bg hover:bg-s1 transition-colors flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            <span className="font-mono text-sm text-accent shrink-0">02</span>
            <div className="flex flex-col gap-2 max-w-2xl">
              <h3 className="font-display text-xl text-ink">Dónde está el quiebre</h3>
              <p className="font-body text-mid text-base leading-relaxed">
                Identificamos juntos en qué etapa del funnel pierdes prospectos.
              </p>
            </div>
          </div>

          <div className="group p-8 md:p-10 bg-bg hover:bg-s1 transition-colors flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            <span className="font-mono text-sm text-accent shrink-0">03</span>
            <div className="flex flex-col gap-2 max-w-2xl">
              <h3 className="font-display text-xl text-ink">Qué mueve la aguja primero</h3>
              <p className="font-body text-mid text-base leading-relaxed">
                Te digo qué tipo de video resuelve ese quiebre específico — y por qué ese y no otro.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 flex flex-col items-start gap-4">
        <a
          href="https://wa.me/56988804299?text=Hola%20Leandro%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20de%2015%20minutos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-8 py-4 hover:bg-accent2 transition-colors"
        >
          Agendar diagnóstico gratuito →
        </a>
        <p className="font-mono text-[10px] text-muted">
          Respondo en menos de 24 horas.
        </p>
      </section>
    </main>
  );
}
