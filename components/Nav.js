import Link from "next/link";

export default function Nav() {
  return (
    <header className="flex flex-col gap-4 px-6 py-6 border-b border-zinc-800 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="flex flex-col">
        <Link href="/" className="text-white text-sm tracking-widest uppercase hover:text-zinc-400 transition-colors duration-200 font-bold">
          Leandro Venegas
        </Link>
        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] leading-none mt-1">
          Comunicador Audiovisual
        </span>
      </div>
      <nav className="flex flex-wrap gap-6">
        <Link href="/portafolio" className="text-zinc-400 text-sm tracking-widest uppercase hover:text-white transition-colors duration-200">Portafolio</Link>
        <Link href="/videos" className="text-zinc-400 text-sm tracking-widest uppercase hover:text-white transition-colors duration-200">Videos</Link>
        <Link href="/blog" className="text-zinc-400 text-sm tracking-widest uppercase hover:text-white transition-colors duration-200">Blog</Link>
      </nav>
    </header>
  );
}