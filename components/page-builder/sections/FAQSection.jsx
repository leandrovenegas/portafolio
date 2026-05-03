export default function FAQSection({ title, questions }) {
  return (
    <section>
      {title && (
        <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl mb-12">
          {title}
        </h2>
      )}
      {questions && questions.length > 0 && (
        <div className="space-y-8">
          {questions.map((item, i) => (
            <div key={i}>
              <h3 className="font-display text-2xl text-ink mb-4">{item.q}</h3>
              <p className="font-body text-mid text-lg leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
