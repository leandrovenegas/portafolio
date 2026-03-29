import Nav from "@/components/Nav";

export const metadata = {
  title: "Contacto | Leandro Venegas",
  description: "Contacta a Leandro Venegas — creador de productos desde Chile.",
};

export default function Contacto() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">
          
          <header className="pt-12 md:pt-24 flex flex-col items-start gap-4 border-b border-border pb-16">
            <p className="font-mono text-accent text-sm md:text-base tracking-wide">
              Disponibilidad Inmediata
            </p>
            <h1 className="font-display text-display-md md:text-display-lg text-ink leading-[0.9] max-w-4xl">
              Contacto
            </h1>
            <p className="font-body text-mid text-xl md:text-2xl max-w-2xl leading-relaxed">
              Hablemos sin rodeos. Envíame un mensaje directo o un correo electrónico para conversar sobre tu próximo proyecto.
            </p>
          </header>

          <section>
            <div className="flex flex-col gap-px bg-border border border-border">
              
              <a
                href="mailto:leandrovenegas@live.com"
                className="bg-bg px-8 py-10 md:px-12 md:py-12 flex flex-col gap-2 hover:bg-s1 transition-colors duration-200 group"
              >
                <span className="font-mono text-xs text-muted tracking-widest uppercase">
                  Email
                </span>
                <span className="font-display text-3xl md:text-4xl text-ink group-hover:text-accent transition-colors duration-200">
                  leandrovenegas@live.com
                </span>
              </a>

              <a
                href="tel:+56988804299"
                className="bg-bg px-8 py-10 md:px-12 md:py-12 flex flex-col gap-2 hover:bg-s1 transition-colors duration-200 group"
              >
                <span className="font-mono text-xs text-muted tracking-widest uppercase">
                  Teléfono / WhatsApp
                </span>
                <span className="font-display text-3xl md:text-4xl text-ink group-hover:text-accent transition-colors duration-200">
                  +56 9 8880 4299
                </span>
              </a>
              
            </div>
          </section>
          
        </div>
      </main>
    </>
  );
}