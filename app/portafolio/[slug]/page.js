import supabase from "@/lib/supabase";
import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import { compileMDX } from 'next-mdx-remote/rsc';
import BunnyVideoPlayer from '@/components/BunnyVideoPlayer';
import MediaPreconnect from '@/components/MediaPreconnect';
import { notFound } from "next/navigation";
import { cache } from "react";

// Sub-componente interno para organizaciones
function SectionWrapper({ title, children }) {
  return (
    <section>
      <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-[3px] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-8">
        {title}
      </h2>
      {children}
    </section>
  );
}

const getEntityData = cache(async (slug) => {
  // Primero buscamos si es una organización
  const { data: org } = await supabase
    .from("organizations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (org) {
    // Es organización
    const [proyectosRes] = await Promise.all([
      supabase.from("projects").select("*").eq("owner_organization_id", org.id).eq("status", "published")
    ]);
    
    let content = null;
    if (org.markdown_url) {
      try {
        const filePath = path.join(process.cwd(), "app", org.markdown_url.replace(/\.md$/, '.mdx'));
        const mdxContent = await readFile(filePath, "utf-8");
        const { content: compiledContent } = await compileMDX({
          source: mdxContent,
          components: { BunnyVideoPlayer },
          options: { parseFrontmatter: true },
        });
        content = compiledContent;
      } catch (e) {
        console.error("Error compilando el archivo MDX:", e);
      }
    }
    return { type: "organization", data: org, proyectos: proyectosRes.data || [], content };
  }

  // Si no es organización, buscamos proyecto
  const { data: proyecto } = await supabase
    .from("projects")
    .select("*, owner:owner_organization_id(id, name, slug), client:client_organization_id(id, name, slug)")
    .eq("slug", slug)
    .single();

  if (proyecto) {
    const { data: mediaItems } = await supabase
      .from("media_items")
      .select("*")
      .eq("project_id", proyecto.id)
      .order("order", { ascending: true });

    let content = null;
    if (proyecto.markdown_url) {
      try {
        const filePath = path.join(process.cwd(), "app", proyecto.markdown_url.replace(/\.md$/, '.mdx'));
        const mdxContent = await readFile(filePath, "utf-8");
        const { content: compiledContent } = await compileMDX({
          source: mdxContent,
          components: { BunnyVideoPlayer },
          options: { parseFrontmatter: true },
        });
        content = compiledContent;
      } catch (e) {}
    }
    return { type: "project", data: proyecto, mediaItems: mediaItems || [], content };
  }

  return null;
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entity = await getEntityData(slug);

  if (!entity) return { title: "Página no encontrada" };

  if (entity.type === "organization") {
    const org = entity.data;
    return {
      title: org.seo_title || `${org.name} | Leandro Venegas`,
      description: org.seo_description || `Proyectos y trabajo de ${org.name} desde Chile.`,
      keywords: org.keywords || undefined,
      robots: { index: !!(org.is_indexed && org.markdown_url), follow: true },
      openGraph: {
        title: org.seo_title || org.name,
        description: org.seo_description || `Proyectos y trabajo de ${org.name}.`,
        url: `https://www.leandrovenegas.cl/portafolio/${org.slug}`,
        images: org.og_image ? [{ url: org.og_image }] : [],
        type: "website",
      },
      alternates: { canonical: `https://www.leandrovenegas.cl/portafolio/${org.slug}` },
    };
  } else {
    const proyecto = entity.data;
    return {
      title: proyecto.seo_title || `${proyecto.title} | Leandro Venegas`,
      description: proyecto.seo_description || `${proyecto.title} — proyecto de ${proyecto.owner?.name} desde Chile.`,
      keywords: proyecto.keywords || undefined,
      robots: { index: !!(proyecto.is_indexed && proyecto.markdown_url), follow: true },
      openGraph: {
        title: proyecto.seo_title || proyecto.title,
        description: proyecto.seo_description || `${proyecto.title} — proyecto de ${proyecto.owner?.name}.`,
        url: `https://www.leandrovenegas.cl/portafolio/${proyecto.slug}`,
        images: proyecto.og_image ? [{ url: proyecto.og_image }] : [],
        type: "website",
      },
      alternates: { canonical: `https://www.leandrovenegas.cl/portafolio/${proyecto.slug}` },
    };
  }
}

export default async function PortafolioSlugPage({ params }) {
  const { slug } = await params;
  const entity = await getEntityData(slug);

  if (!entity) return notFound();

  const { type, content } = entity;

  if (type === "organization") {
    const { data: org, proyectos } = entity;
    return (
      <>
        <MediaPreconnect cloudinary bunny />
        <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
          <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">
            {/* Header Org */}
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
              {content && (
                <div className="font-body text-mid text-lg md:text-xl max-w-3xl leading-relaxed mt-4 prose prose-invert prose-p:my-4 prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
                  {content}
                </div>
              )}
            </header>

            {/* Proyectos Org */}
            {proyectos.length > 0 && (
              <SectionWrapper title="Proyectos Indexados">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
                  {proyectos.map((p) => (
                    <Link key={p.id} href={`/portafolio/${p.slug}`} className="bg-bg p-8 flex flex-col hover:bg-s1 transition-colors duration-200 group">
                      <span className="font-mono text-[10px] text-muted tracking-widest uppercase mb-4">{p.date}</span>
                      <h3 className="font-display text-2xl text-ink group-hover:text-accent transition-colors duration-200 mb-4">{p.title}</h3>
                      <span className="font-mono text-[10px] text-muted mt-auto group-hover:text-ink transition-colors duration-200 tracking-widest uppercase">Ver archivo →</span>
                    </Link>
                  ))}
                </div>
              </SectionWrapper>
            )}
          </div>
        </main>
      </>
    );
  } else {
    const { data: proyecto, mediaItems } = entity;
    return (
      <>
        <MediaPreconnect cloudinary bunny />
        <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
          <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">
            {/* Header Project */}
            <header className="pt-12 md:pt-24 flex flex-col items-start gap-4 border-b border-border pb-16">
              <div className="flex gap-6 mb-4">
                <Link href="/portafolio" className="font-mono text-muted text-xs tracking-widest uppercase hover:text-ink transition-colors duration-200">
                  ← Portafolio
                </Link>
                {proyecto.owner && (
                  <Link href={`/portafolio/${proyecto.owner.slug}`} className="font-mono text-muted text-xs tracking-widest uppercase hover:text-ink transition-colors duration-200">
                    {proyecto.owner.name}
                  </Link>
                )}
              </div>

              <span className="font-mono text-[10px] text-accent tracking-widest uppercase border border-accent/30 bg-accent/5 px-2 py-1">
                {proyecto.date}
              </span>
              <h1 className="font-display text-display-md md:text-display-lg text-ink leading-[0.9] mt-2 mb-2 max-w-4xl">
                {proyecto.title}
              </h1>
              {proyecto.client && (
                <p className="font-mono text-muted text-xs tracking-widest uppercase mb-4">
                  Cliente — <span className="text-mid">{proyecto.client.name}</span>
                </p>
              )}
              
              {content && (
                <div className="font-body text-mid text-lg md:text-xl max-w-3xl leading-relaxed mt-4 prose prose-invert prose-p:my-4 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:border prose-img:border-border prose-img:rounded-sm">
                  {content}
                </div>
              )}
            </header>

            {/* Media Items Project */}
            {mediaItems && mediaItems.length > 0 && (
              <section>
                <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-[3px] text-muted flex items-center gap-4 after:flex-1 after:h-px after:bg-border mb-8">
                  Archivo Multimedia
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
                  {mediaItems.map((item) => (
                    <div key={item.id} className="bg-bg p-6 md:p-8 flex flex-col gap-4">
                      {item.type === "video" && (
                        <div className="border border-border bg-s1 relative w-full aspect-video">
                          <VideoPlayer src={item.url} poster={item.thumbnail || undefined} ariaLabel={item.alt || item.title} />
                        </div>
                      )}
                      {(item.type === "photo" || item.type === "graphic") && (
                        <div className="border border-border bg-s1 relative w-full">
                          <img src={item.url} alt={item.alt || item.title} className="w-full h-auto object-cover" />
                        </div>
                      )}
                      <div className="mt-4 flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-accent tracking-widest uppercase">{item.type}</span>
                        <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                        {item.caption && <p className="font-body text-muted text-sm leading-relaxed mt-2">{item.caption}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </>
    );
  }
}
