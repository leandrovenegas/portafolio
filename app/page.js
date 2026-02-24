import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-white text-4xl font-bold tracking-tighter md:text-6xl">
          Leandro Venegas
        </h1>
        <p className="text-zinc-400 text-xs tracking-widest uppercase md:text-sm">
          Creador de productos
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-xs md:flex-row md:w-auto">
        <Link
          href="/portafolio"
          className="text-white border border-white px-6 py-3 text-xs tracking-widest uppercase text-center hover:bg-white hover:text-black transition-colors duration-200 md:py-2"
        >
          Portafolio
        </Link>
        <Link
          href="/contacto"
          className="text-zinc-400 text-xs tracking-widest uppercase text-center hover:text-white transition-colors duration-200 md:text-sm"
        >
          Contacto
        </Link>
      </div>
    </main>
  );
}