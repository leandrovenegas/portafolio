'use client';

export default function FinalCTASection({
  buttonText = "Hablar con Leandro",
  buttonLink = "https://wa.me/56988804299?text=Hola%20Leandro%2C%20quiero%20saber%20m%C3%A1s%20sobre%20tu%20sistema%20de%20video%20marketing.",
  subtitle = "",
  forceBp = null
}) {
  return (
    <section className="w-full py-16 md:py-24 px-4 grid grid-cols-1 gap-6 justify-items-center text-center">
      {buttonText && buttonLink && (
        <a
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 group inline-flex items-center justify-center gap-3 px-10 py-5 font-display text-base md:text-lg tracking-widest uppercase bg-accent text-bg hover:bg-white hover:text-bg transition-colors duration-300 font-bold rounded-xl shadow-2xl shadow-accent/10"
        >
          {buttonText}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      )}
      {subtitle && (
        <div 
          className="col-span-1 font-body text-mid text-sm md:text-base mt-2"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}
    </section>
  );
}
