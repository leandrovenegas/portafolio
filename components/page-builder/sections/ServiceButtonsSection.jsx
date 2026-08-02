export default function ServiceButtonsSection({ title, description, items }) {
  return (
    <section className="py-8 w-full grid grid-cols-1 gap-8">
      {(title || description) && (
        <div className="col-span-1 grid grid-cols-1 gap-4">
          {title && (
            <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-body text-mid text-lg max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
      
      {items && items.length > 0 && (
        <div className="col-span-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <a 
              key={i}
              href={item.link || '#'}
              target={item.link && item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link && item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="col-span-1 group flex flex-col justify-between p-8 bg-s1 border border-border hover:border-accent/40 transition-all duration-300 relative overflow-hidden min-h-[180px] h-full"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="flex flex-col gap-3 relative z-10">
                <div className="inline-flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Opción 0{i + 1}
                  </span>
                  <span className="text-mid group-hover:text-accent transition-colors duration-300 text-lg">
                    →
                  </span>
                </div>
                
                <h3 className="font-display text-2xl text-ink group-hover:text-accent transition-colors duration-300">
                  {item.buttonText}
                </h3>
                
                <p className="font-body text-mid text-sm leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
