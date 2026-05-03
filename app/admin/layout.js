'use client';

import Nav from '@/components/Nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';
  const isEditor = pathname?.startsWith('/admin/editor');

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Usamos CSS para ocultar el Nav en modo editor sin cambiar la estructura del árbol React */}
      <div className={isEditor ? 'hidden' : 'block'}>
        <Nav />
      </div>
      <main className={`min-h-screen bg-bg relative overflow-hidden flex flex-col ${isEditor ? '' : 'pb-24 pt-24'}`}>
        
        <div className={isEditor ? 'hidden' : 'block'}>
          <header className="w-full border-b border-border bg-bg px-6 py-4 z-20 flex flex-wrap items-center gap-4 justify-between sticky top-24">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl text-ink mr-4">Administración</h2>
              <nav className="flex flex-wrap gap-2">
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
                  Videos
                </Link>
                <Link
                  href="/admin/portafolio"
                  className="px-4 py-2 rounded-lg hover:bg-s1 text-ink font-body text-sm transition-colors"
                >
                  Portafolio
                </Link>
                <Link
                  href="/admin/editor?slug=home"
                  className="px-4 py-2 rounded-lg bg-accent text-bg hover:bg-accent2 font-body text-sm transition-colors"
                >
                  Editor Visual
                </Link>
              </nav>
            </div>
            <button
              onClick={async () => {
                await fetch('/api/auth/login', { method: 'DELETE' });
                window.location.href = '/';
              }}
              className="px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 font-mono text-xs uppercase tracking-widest transition-colors border border-transparent hover:border-red-100"
            >
              Cerrar Sesión
            </button>
          </header>
        </div>

        <div className={isEditor ? "flex-1 w-full max-w-none" : "flex-1 p-6 md:p-8 z-10 w-full max-w-none"}>
          {children}
        </div>
      </main>
    </>
  );
}
