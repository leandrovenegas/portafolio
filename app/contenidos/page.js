import supabase from "@/lib/supabase";

export default async function Contenidos() {
  const { data: contenidos, error } = await supabase
    .from("media_items")
    .select("*");

  if (error) return <pre>Error: {error.message}</pre>;

  return (
    <main>
      <h1>Contenidos</h1>
      {contenidos.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.type}</p>
          {item.caption && <p>{item.caption}</p>}
          <a href={item.url} target="_blank" rel="noopener noreferrer">Ver</a>
        </div>
      ))}
    </main>
  );
}