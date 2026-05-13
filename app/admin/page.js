export const metadata = {
  title: 'Dashboard de Administración | Leandro Venegas',
  description: 'Panel general de administración.',
  robots: 'noindex, nofollow',
};

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-12">
      <header className="border-b border-border pb-8">
        <h1 className="font-display text-display-md text-ink mb-4">Dashboard</h1>
        <p className="font-body text-mid text-xl max-w-3xl leading-relaxed">
          Bienvenido al panel de administración. Desde aquí puedes gestionar los textos y configuraciones de las distintas secciones de tu sitio web.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-border bg-bg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="font-display text-2xl text-ink mb-2">Página de Videos</h2>
          <p className="font-body text-mid text-sm text-muted mb-6">
            Gestiona el título, descripción de la página pública, y activa/desactiva los videos que se muestran.
          </p>
          <a href="/admin/videos" className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg transition hover:bg-accent/90">
            Ir a Videos →
          </a>
        </div>
        
        <div className="rounded-3xl border border-border bg-bg p-6 shadow-sm opacity-50 cursor-not-allowed">
          <h2 className="font-display text-2xl text-ink mb-2">Portafolio</h2>
          <p className="font-body text-mid text-sm text-muted mb-6">
            Gestión de proyectos del portafolio (Próximamente).
          </p>
          <button disabled className="inline-flex items-center justify-center rounded-full bg-s2 px-4 py-2 text-sm font-semibold text-muted">
            Pronto
          </button>
        </div>
      </section>
    </div>
  );
}
