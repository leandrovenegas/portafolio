export default function ListSection({ title, description, items }) {
  return (
    <section>
      {title && (
        <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl mb-12">
          {title}
        </h2>
      )}
      {description && (
        <p className="font-body text-mid text-lg leading-relaxed mb-12">
          {description}
        </p>
      )}
      {items && items.length > 0 && (
        <ul className="space-y-8">
          {items.map((item, i) => (
            <li key={i}>
              <strong className="font-display text-xl text-ink">{item.title}</strong> {item.description}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
