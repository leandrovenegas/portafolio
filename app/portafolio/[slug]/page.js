import supabase from "@/lib/supabase";
import Link from "next/link";
import { marked } from "marked";
import { readFile } from "fs/promises";
import path from "path";
import Nav from "@/components/Nav";

export default async function OrganizacionPage({ params }) {
  const { slug } = await params;

  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (orgError || !org) return <p className="text-white p-8">Organización no encontrada</p>;

  const { data: hijas } = await supabase
    .from("organizations")
    .select("*")
    .eq("parent_organization_id", org.id);

  const { data: proyectos } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_organization_id", org.id)
    .eq("status", "published");

  let descripcion = null;
  if (org.markdown_url) {
    const filePath = path.join(process.cwd(), "public", org.markdown_url);
    const markdown = await readFile(filePath, "utf-8");
    descripcion = marked(markdown);
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black px-6 py-16 md:px-12 lg:px-24">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <Link href="/portafolio" className="text-zinc-600 text-xs tracking-widest uppercase hover:text-zinc-400 transition-colors duration-200 mb-8 block">
            ← Portafolio
          </Link>
          <span className="text-zinc-600 text-xs tracking-widest uppercase">
            {org.type}
          </span>
          <h1 className="text-white text-4xl font-bold tracking-tighter mt-2 mb-6 md:text-6xl">
            {org.name}
          </h1>
          {descripcion && (
            <div
              className="text-zinc-400 text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: descripcion }}
            />
          )}
        </div>

        {/* Sub organizaciones */}
        {hijas && hijas.length > 0 && (
          <section className="mb-16">
            <h2 className="text-zinc-600 text-xs tracking-widest uppercase mb-6">Áreas</h2>
            <div className="grid grid-cols-1 gap-px bg-zinc-800 border border-zinc-800 md:grid-cols-2">
              {hijas.map((hija) => (
                <Link
                  key={hija.id}
                  href={`/portafolio/${hija.slug}`}
                  className="bg-black p-8 flex flex-col gap-4 hover:bg-zinc-900 transition-colors duration-200 group"
                >
                  <span className="text-zinc-600 text-xs tracking-widest uppercase">
                    {hija.type}
                  </span>
                  <h3 className="text-white text-xl font-bold tracking-tight group-hover:text-zinc-300 transition-colors duration-200">
                    {hija.name}
                  </h3>
                  <span className="text-zinc-600 text-xs tracking-widest uppercase mt-auto group-hover:text-zinc-400 transition-colors duration-200">
                    Ver proyectos →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Proyectos */}
        {proyectos && proyectos.length > 0 && (
          <section>
            <h2 className="text-zinc-600 text-xs tracking-widest uppercase mb-6">Proyectos</h2>
            <div className="grid grid-cols-1 gap-px bg-zinc-800 border border-zinc-800 md:grid-cols-2 lg:grid-cols-3">
              {proyectos.map((proyecto) => (
                <Link
                  key={proyecto.id}
                  href={`/proyectos/${proyecto.slug}`}
                  className="bg-black p-8 flex flex-col gap-4 hover:bg-zinc-900 transition-colors duration-200 group"
                >
                  <span className="text-zinc-600 text-xs tracking-widest uppercase">
                    {proyecto.date}
                  </span>
                  <h3 className="text-white text-xl font-bold tracking-tight group-hover:text-zinc-300 transition-colors duration-200">
                    {proyecto.title}
                  </h3>
                  <span className="text-zinc-600 text-xs tracking-widest uppercase mt-auto group-hover:text-zinc-400 transition-colors duration-200">
                    Ver proyecto →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: org } = await supabase
    .from("organizations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!org) return { title: "Organización no encontrada" };

  return {
    title: org.name,
    description: `Proyectos y trabajo de ${org.name}. ${org.type} desde Chile.`,
    openGraph: {
      title: `${org.name} | Leandro Venegas`,
      description: `Proyectos y trabajo de ${org.name}.`,
      url: `https://www.leandrovenegas.cl/portafolio/${org.slug}`,
      type: "website",
    },
  };
}