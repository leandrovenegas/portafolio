export default function CTASection({ title, description, buttonText, buttonLink, text, href }) {
  const displayButtonText = buttonText || text;
  const displayButtonLink = buttonLink || href || "#";

  return (
    <section id="contacto">
      <div className="border-t border-border pt-16 flex flex-col items-center text-center gap-8">
        {title && (
          <h2 className="font-display text-5xl md:text-6xl text-white max-w-2xl">
            {title}
          </h2>
        )}
        {description && (
          <p className="font-body text-white/80 text-lg max-w-xl">
            {description}
          </p>
        )}
        
        {displayButtonText && (
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <a 
              href={displayButtonLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center font-display text-xl tracking-wide bg-accent text-bg px-10 py-5 hover:bg-accent2 transition-colors w-full sm:w-auto"
            >
              {displayButtonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
