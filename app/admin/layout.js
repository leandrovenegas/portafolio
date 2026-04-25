import Nav from '@/components/Nav';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden flex flex-col md:flex-row pb-24 pt-24">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border p-6 flex flex-col gap-4 sticky top-24 h-max z-20 bg-bg">
          <h2 className="font-display text-xl text-ink mb-4">Administración</h2>
          <nav className="flex flex-col gap-2">
            <Link 
              href="/admin"
              className="px-4 py-2 rounded-lg hover:bg-s1 text-ink font-body text-sm transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/videos"
              className="px-4 py-2 rounded-lg hover:bg-s1 text-ink font-body text-sm transition-colors"
            >
              Página Videos
            </Link>
            <span className="px-4 py-2 rounded-lg text-muted font-body text-sm cursor-not-allowed">
              Portafolio (Pronto)
            </span>
            <span className="px-4 py-2 rounded-lg text-muted font-body text-sm cursor-not-allowed">
              Proyectos (Pronto)
            </span>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-12 z-10 w-full max-w-6xl">
          {children}
        </div>
      </main>
    </>
  );
}
