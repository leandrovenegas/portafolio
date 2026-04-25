import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-bg py-8 mt-16">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-400 text-sm">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
          <Link href="/contacto" className="hover:text-white transition-colors duration-200 underline underline-offset-4">Contacto</Link>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
          <span>&copy; {new Date().getFullYear()} Leandro Venegas</span>
          <span>Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  );
}
