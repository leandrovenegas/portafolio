import supabase from "@/lib/supabase";
import Link from "next/link";

export default async function OrganizacionProyectos({ params }) {
  const { slug } = await params;

  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (orgError || !org) return <p>Organización no encontrada</p>;

  const { data: proyectos, error: proyectosError } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_organization_id", org.id);

  if (proyectosError) return <pre>Error: {proyectosError.message}</pre>;

  return (
    <main>
      <h1>{org.name}</h1>
      <p>{org.type}</p>
      {proyectos.length === 0 && <p>No hay proyectos aún.</p>}
      {proyectos.map((proyecto) => (
        <div key={proyecto.id}>
          <h2>{proyecto.title}</h2>
          <p>{proyecto.date}</p>
          <Link href={`/proyectos/${proyecto.slug}`}>Ver proyecto</Link>
        </div>
      ))}
    </main>
  );
}