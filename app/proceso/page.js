import Link from "next/link";
import ProcesoTimeline from "@/components/ProcesoTimeline";

export const metadata = {
  title: 'Nuestro Proceso de Trabajo | Leandro Venegas',
  description: 'Sin sorpresas. Sin ambigüedad. Conoce paso a paso cómo trabajamos en tu estrategia, guiones, producción, post-producción y activación de video.',
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/proceso',
  },
};

export default function ProcesoPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56988804299';
  const whatsappMessage = 'Hola, vi el proceso y quiero agendar el diagnóstico';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-bg relative overflow-hidden pb-32 pt-24">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/3 blur-[180px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-16 md:pt-24 pb-8 md:px-12 lg:px-24 mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-s1 border border-zinc-800/80 mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">Cómo trabajamos</span>
        </div>

        <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] tracking-tight mb-6">
          Lo que pasa después <br className="hidden md:inline" />
          de que dices sí.
        </h1>
        
        <p className="font-prose text-mid text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Sin sorpresas. Sin ambigüedad. Así es como trabajamos juntos para construir tu sistema de video.
        </p>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 py-12">
        <ProcesoTimeline />
      </section>

      {/* CTA Section / Trust Section */}
      <section className="relative z-10 px-6 pt-16 md:pt-24 max-w-4xl mx-auto text-center">
        <div className="border-t border-zinc-800/60 pt-16 flex flex-col items-center gap-8">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white max-w-2xl leading-none">
            ¿Listo para dar el primer paso?
          </h2>
          <p className="font-body text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
            Comenzamos con una llamada de diagnóstico de 60 minutos sin costo para trazar el mapa estratégico inicial de tu negocio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto items-center justify-center">
            {/* Primary Action Button (WhatsApp) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-3 font-display text-lg md:text-xl tracking-wide bg-accent text-bg px-8 py-4.5 hover:bg-accent2 transition-all duration-300 w-full sm:w-auto rounded-lg shadow-lg shadow-accent/10"
            >
              Quiero empezar → WhatsApp
            </a>

            {/* Secondary Action Button (Prices) */}
            <Link
              href="/precios"
              className="inline-flex justify-center items-center font-display text-lg md:text-xl tracking-wide border border-zinc-800 hover:border-zinc-700 text-ink bg-s1/20 hover:bg-s1/60 px-8 py-4.5 transition-all duration-300 w-full sm:w-auto rounded-lg"
            >
              Ver precios → /precios
            </Link>
          </div>

          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600 mt-2">
            No es una página de ventas — es una página de confianza.
          </p>
        </div>
      </section>
    </main>
  );
}
