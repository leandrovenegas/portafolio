'use client';

export default function CellPhoneCTASection({
  text = "Apuesto a que tienes videos grabados en el celular que nunca llegaste a editar. No necesitas ser el mejor grabando, la edición hace magia. Vamos a hacer ese video realidad.",
  buttonText = "Contratar por videos en el celular",
  buttonLink = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20tengo%20videos%20grabados%20en%20el%20celular%20que%20quiero%20que%20me%20edites.",
  forceBp = null
}) {
  return (
    <section className="w-full py-16 md:py-24 px-4 flex justify-center">
      <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-accent/20 bg-gradient-to-br from-[#0F0F0F] via-[#151515] to-[#0A0A0A] p-8 md:p-12 shadow-[0_0_60px_rgba(255,204,0,0.03)] hover:shadow-[0_0_80px_rgba(255,204,0,0.06)] hover:border-accent/30 transition-all duration-500 grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-8 md:gap-12">
        {/* Background glow decorator */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

        <div className="col-span-1 flex flex-col gap-4 relative z-10 text-center md:text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            Edición Móvil
          </span>
          <p 
            data-field="text"
            className="font-display text-xl md:text-2xl lg:text-3xl text-ink leading-relaxed font-medium"
          >
            {text}
          </p>
        </div>

        {buttonText && buttonLink && (
          <div className="col-span-1 relative z-10 flex justify-center md:justify-end w-full">
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4.5 font-display text-sm md:text-base tracking-widest uppercase bg-accent text-bg hover:bg-white hover:text-bg transition-colors duration-300 font-bold rounded-xl shadow-xl shadow-accent/10"
            >
              {buttonText}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
