import Nav from "@/components/Nav";

export const metadata = {
  title: "Contacto",
  description: "Contacta a Leandro Venegas — creador de productos desde Chile.",
};

export default function Contacto() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black px-6 py-16 md:px-12 lg:px-24">
        <div className="max-w-2xl">
          <h1 className="text-white text-4xl font-bold tracking-tighter mb-2 md:text-6xl">
            Contacto
          </h1>

          <p className="text-zinc-500 text-sm tracking-widest uppercase mb-16">
            Hablemos
          </p>

          <div className="flex flex-col gap-px bg-zinc-800 border border-zinc-800">
            <a
              href="mailto:leandrovenegas@live.com"
              className="bg-black px-8 py-6 flex flex-col gap-1 hover:bg-zinc-900 transition-colors duration-200 group"
            >
              <span className="text-zinc-600 text-xs tracking-widest uppercase">
                Email
              </span>
              <span className="text-white text-lg font-medium group-hover:text-zinc-300 transition-colors duration-200">
                leandrovenegas@live.com
              </span>
            </a>

            <a
              href="tel:+56988804299"
              className="bg-black px-8 py-6 flex flex-col gap-1 hover:bg-zinc-900 transition-colors duration-200 group"
            >
              <span className="text-zinc-600 text-xs tracking-widest uppercase">
                Teléfono
              </span>
              <span className="text-white text-lg font-medium group-hover:text-zinc-300 transition-colors duration-200">
                +56 9 8880 4299
              </span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}