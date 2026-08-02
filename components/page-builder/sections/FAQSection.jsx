export default function FAQSection({ title, questions }) {
  return (
    <section className="w-full grid grid-cols-1 gap-8">
      {title && (
        <h2 className="col-span-1 font-display text-4xl md:text-5xl text-ink max-w-3xl mb-4">
          {title}
        </h2>
      )}
      {questions && questions.length > 0 && (
        <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {questions.map((item, i) => (
            <div key={i} className="col-span-1 p-6 rounded-xl border border-border/30 bg-[#0F0F0F]">
              <h3 className="font-display text-2xl text-ink mb-4">{item.q}</h3>
              <p className="font-body text-mid text-lg leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
