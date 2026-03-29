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

  if (orgError || !org) return <p className="font-mono text-accent p-12">Organización no encontrada</p>;

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
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">

          {/* Header */}
          <header className="pt-12 md:pt-24 flex flex-col items-start gap-4 border-b border-border pb-16">
            <Link href="/portafolio" className="font-mono text-muted text-xs tracking-widest uppercase hover:text-ink transition-colors duration-200 mb-4 block">
              ← Volver a Portafolio
            </Link>
            <span className="font-mono text-[10px] text-accent tracking-widest uppercase border border-accent/30 bg-accent/5 px-2 py-1">
              {org.type}
            </span>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] mt-2 mb-4">
              {org.name}
            </h1>
            {descripcion && (
              <div
                className="font-body text-mid text-lg md:text-xl max-w-3xl leading-relaxed mt-4 prose prose-invert prose-p:my-4 prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: descripcion }}
              />
            )}
          </header>

          {/* Sub organizaciones */}
          {hijas && hijas.length > 0 && (
            <section className="mb-8">
              <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-[3px] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-8">
                Áreas de Operación
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
                {hijas.map((hija) => (
                  <Link
                    key={hija.id}
                    href={`/portafolio/${hija.slug}`}
                    className="bg-bg p-8 flex flex-col gap-4 hover:bg-s1 transition-colors duration-200 group"
                  >
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase border border-accent/30 bg-accent/5 px-2 py-1 self-start">
                      {hija.type}
                    </span>
                    <h3 className="font-display text-3xl text-ink mt-2 group-hover:text-accent transition-colors duration-200">
                      {hija.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Proyectos */}
          {proyectos && proyectos.length > 0 && (
            <section>
              <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-[3px] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-8">
                Proyectos Indexados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
                {proyectos.map((proyecto) => (
                  <Link
                    key={proyecto.id}
                    href={`/proyectos/${proyecto.slug}`}
                    className="bg-bg p-8 flex flex-col hover:bg-s1 transition-colors duration-200 group"
                  >
                    <span className="font-mono text-[10px] text-muted tracking-widest uppercase mb-4">
                      {proyecto.date}
                    </span>
                    <h3 className="font-display text-2xl text-ink group-hover:text-accent transition-colors duration-200 mb-4">
                      {proyecto.title}
                    </h3>
                    <span className="font-mono text-[10px] text-muted mt-auto group-hover:text-ink transition-colors duration-200 tracking-widest uppercase">
                      Ver archivo →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: org } = await supabase
    .from("organizations")
    .select("name, slug, seo_title, seo_description, og_image, keywords, is_indexed, markdown_url")
    .eq("slug", slug)
    .single();

  if (!org) return { title: "Organización no encontrada" };

  return {
    title: org.seo_title || `${org.name} | Leandro Venegas`,
    description: org.seo_description || `Proyectos y trabajo de ${org.name} desde Chile.`,
    keywords: org.keywords || undefined,
    robots: {
      index: org.is_indexed && org.markdown_url ? true : false,
      follow: true,
    },
    openGraph: {
      title: org.seo_title || org.name,
      description: org.seo_description || `Proyectos y trabajo de ${org.name}.`,
      url: `https://www.leandrovenegas.cl/portafolio/${org.slug}`,
      images: org.og_image ? [{ url: org.og_image }] : [],
      type: "website",
    },
  };
}