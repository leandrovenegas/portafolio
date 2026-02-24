import supabase from "@/lib/supabase";
import Link from "next/link";
import { marked } from "marked";

export default async function OrganizacionPage({ params }) {
  const { slug } = await params;

  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (orgError || !org) return <p>Organización no encontrada</p>;

  // Sub organizaciones hijas
  const { data: hijas } = await supabase
    .from("organizations")
    .select("*")
    .eq("parent_organization_id", org.id);

  // Proyectos directos de esta organización
  const { data: proyectos } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_organization_id", org.id);

  // Markdown de la descripción
  let descripcion = null;
  if (org.markdown_url) {
    const res = await fetch(org.markdown_url);
    const text = await res.text();
    descripcion = marked(text);
  }

  return (
    <main>
      <h1>{org.name}</h1>

      {descripcion && (
        <div dangerouslySetInnerHTML={{ __html: descripcion }} />
      )}

      {hijas && hijas.length > 0 && (
        <section>
          <h2>Áreas</h2>
          {hijas.map((hija) => (
            <div key={hija.id}>
              <h3>{hija.name}</h3>
              <Link href={`/portafolio/${hija.slug}`}>Ver proyectos</Link>
            </div>
          ))}
        </section>
      )}

      {proyectos && proyectos.length > 0 && (
        <section>
          <h2>Proyectos</h2>
          {proyectos.map((proyecto) => (
            <div key={proyecto.id}>
              <h2>{proyecto.title}</h2>
              <p>{proyecto.date}</p>
              <Link href={`/proyectos/${proyecto.slug}`}>Ver proyecto</Link>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}