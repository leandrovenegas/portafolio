import portfolio from "@/data/portfolio";

export default function Contenidos() {
  return (
    <main>
      {portfolio.mediaItems.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.type}</p>
          <p>{item.caption}</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Ver
          </a>
        </div>
      ))}
    </main>
  );
}