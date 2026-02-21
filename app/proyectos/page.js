import supabase from "@/lib/supabase";

export default async function Proyectos() {
  const { data: proyectos, error } = await supabase
    .from("projects")
    .select("*");

  if (error) return <pre>Error: {error.message}</pre>;

  return (
    <main>
      <h1>Proyectos</h1>
      {proyectos.map((proyecto) => (
        <div key={proyecto.id}>
          <h2>{proyecto.title}</h2>
          <p>{proyecto.date}</p>
          <p>{proyecto.status}</p>
        </div>
      ))}
    </main>
  );
}