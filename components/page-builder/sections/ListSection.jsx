export default function ListSection({ title, description, items }) {
  return (
    <section className="w-full grid grid-cols-1 gap-8">
      {title && (
        <h2 className="col-span-1 font-display text-4xl md:text-5xl text-ink max-w-3xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="col-span-1 font-body text-mid text-lg leading-relaxed">
          {description}
        </p>
      )}
      {items && items.length > 0 && (
        <ul className="col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
          {items.map((item, i) => (
            <li key={i} className="col-span-1 p-6 rounded-xl border border-border/30 bg-[#0F0F0F]">
              <strong className="font-display text-xl text-ink block mb-2">{item.title}</strong>
              <span className="font-body text-mid text-sm leading-relaxed">{item.description}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
