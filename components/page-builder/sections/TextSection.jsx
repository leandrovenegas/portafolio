import Link from "next/link";

export default function TextSection({ title, paragraphs }) {
  // Simple HTML parsing to support links like the original text had
  const renderParagraph = (p) => {
    // This is a very basic replacement for the exact Link used. In a full system you might use a markdown renderer.
    if (p.includes("<Link")) {
      return (
        <span dangerouslySetInnerHTML={{
          __html: p.replace(
            /<Link href='([^']+)' className='([^']+)'>([^<]+)<\/Link>/g, 
            "<a href='$1' class='$2'>$3</a>"
          )
        }} />
      );
    }
    return p;
  };

  return (
    <section>
      {title && (
        <h2 className="font-display text-4xl md:text-5xl text-ink max-w-3xl mb-8">
          {title}
        </h2>
      )}
      {paragraphs && paragraphs.map((p, i) => (
        <p key={i} className={`font-body text-mid text-lg leading-relaxed ${i === paragraphs.length - 1 ? '' : 'mb-6'}`}>
          {renderParagraph(p)}
        </p>
      ))}
    </section>
  );
}
