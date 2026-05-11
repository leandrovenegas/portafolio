'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  // No mostrar el footer en el área de administración ni en el editor
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="w-full border-t border-zinc-800 bg-bg py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-400 text-sm">
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center">
          <Link href="/sobre-mi" className="hover:text-white transition-colors duration-200 uppercase tracking-widest text-[10px] font-bold">Sobre Mí</Link>
          <Link href="/contacto" className="hover:text-white transition-colors duration-200 uppercase tracking-widest text-[10px] font-bold">Contacto</Link>
          <Link href="/portafolio" className="hover:text-white transition-colors duration-200 uppercase tracking-widest text-[10px] font-bold">Portafolio</Link>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center font-mono text-[10px] uppercase tracking-wider opacity-60">
          <span>&copy; {new Date().getFullYear()} Leandro Venegas</span>
          <span className="hidden md:inline text-zinc-700">|</span>
          <span>Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  );
}
