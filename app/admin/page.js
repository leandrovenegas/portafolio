import Nav from '@/components/Nav';
import VideoConfigDashboard from '@/components/VideoConfigDashboard';

export const metadata = {
  title: 'Configuración | Leandro Venegas',
  description: 'Panel de configuración para controlar videos y otras partes del sitio.',
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/configuracion',
  },
};

export default function ConfiguracionPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-6xl flex flex-col gap-16 md:gap-24">
          <header className="pt-12 md:pt-24 flex flex-col items-start gap-4 border-b border-border pb-16">
            <p className="font-mono text-accent text-sm md:text-base tracking-wide">
              Configuración del sitio
            </p>
            <h1 className="font-display text-display-md md:text-display-lg text-ink leading-[0.9] max-w-4xl">
              Panel de control de configuración
            </h1>
            <p className="font-body text-mid text-xl md:text-2xl max-w-3xl leading-relaxed">
              Ajusta la visibilidad de los videos, edita sus metadatos y prepara el sitio para futuras configuraciones de otros bloques.
            </p>
          </header>

          <section className="space-y-6">
            <VideoConfigDashboard />
          </section>
        </div>
      </main>
    </>
  );
}
