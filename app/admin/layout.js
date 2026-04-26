'use client';

import Nav from '@/components/Nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

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
            <Link
              href="/admin/portafolio"
              className="px-4 py-2 rounded-lg hover:bg-s1 text-ink font-body text-sm transition-colors"
            >
              Portafolio
            </Link>
            <span className="px-4 py-2 rounded-lg text-muted font-body text-sm cursor-not-allowed">
              Proyectos (Pronto)
            </span>
            <button
              onClick={async () => {
                await fetch('/api/auth/login', { method: 'DELETE' });
                window.location.href = '/';
              }}
              className="mt-4 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 font-mono text-xs uppercase tracking-widest transition-colors text-left border border-transparent hover:border-red-100"
            >
              Cerrar Sesión
            </button>
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
