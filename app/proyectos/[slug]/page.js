import supabase from "@/lib/supabase";
import { marked } from "marked";
import { readFile } from "fs/promises";
import path from "path";
import Nav from "@/components/Nav";
import Link from "next/link";

export default async function Proyecto({ params }) {
  const { slug } = await params;

  const { data: proyecto, error } = await supabase
    .from("projects")
    .select("*, owner:owner_organization_id(id, name, slug), client:client_organization_id(id, name, slug)")
    .eq("slug", slug)
    .single();

  if (error || !proyecto) return <p className="text-white p-8">Proyecto no encontrado</p>;

  const { data: mediaItems } = await supabase
    .from("media_items")
    .select("*")
    .eq("project_id", proyecto.id)
    .order("order", { ascending: true });

  let contenido = null;
  if (proyecto.markdown_url) {
    const filePath = path.join(process.cwd(), "public", proyecto.markdown_url);
    const markdown = await readFile(filePath, "utf-8");
    contenido = marked(markdown);
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black px-6 py-16 md:px-12 lg:px-24">
        <div className="mb-16 max-w-2xl">
          <Link
            href={`/portafolio/${proyecto.owner?.slug}`}
            className="text-zinc-600 text-xs tracking-widest uppercase hover:text-zinc-400 transition-colors duration-200 mb-8 block"
          >
            ← {proyecto.owner?.name}
          </Link>
          <span className="text-zinc-600 text-xs tracking-widest uppercase">
            {proyecto.date}
          </span>
          <h1 className="text-white text-4xl font-bold tracking-tighter mt-2 mb-2 md:text-6xl">
            {proyecto.title}
          </h1>
          {proyecto.client && (
            <p className="text-zinc-600 text-xs tracking-widest uppercase mb-6">
              Cliente — {proyecto.client.name}
            </p>
          )}
          {contenido && (
            <div
              className="text-zinc-400 text-base leading-relaxed mt-6"
              dangerouslySetInnerHTML={{ __html: contenido }}
            />
          )}
        </div>

        {mediaItems && mediaItems.length > 0 && (
          <section>
            <h2 className="text-zinc-600 text-xs tracking-widest uppercase mb-6">Contenidos</h2>
            <div className="grid grid-cols-1 gap-px bg-zinc-800 border border-zinc-800 md:grid-cols-2 lg:grid-cols-3">
              {mediaItems.map((item) => {
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black p-8 flex flex-col gap-4 hover:bg-zinc-900 transition-colors duration-200 group"
                  >
                    <span className="text-zinc-600 text-xs tracking-widest uppercase">{item.type}</span>
                    <h3 className="text-white text-xl font-bold tracking-tight group-hover:text-zinc-300 transition-colors duration-200">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-zinc-600 text-sm">{item.caption}</p>
                    )}
                    <span className="text-zinc-600 text-xs tracking-widest uppercase mt-auto group-hover:text-zinc-400 transition-colors duration-200">
                      Ver →
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: proyecto } = await supabase
    .from("projects")
    .select("*, owner:owner_organization_id(name)")
    .eq("slug", slug)
    .single();

  if (!proyecto) return { title: "Proyecto no encontrado" };

  return {
    title: proyecto.title,
    description: `${proyecto.title} — proyecto de ${proyecto.owner?.name} desde Chile.`,
    openGraph: {
      title: `${proyecto.title} | Leandro Venegas`,
      description: `${proyecto.title} — proyecto de ${proyecto.owner?.name}.`,
      url: `https://www.leandrovenegas.cl/proyectos/${proyecto.slug}`,
      type: "website",
    },
  };
}