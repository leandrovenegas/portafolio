import supabase from "@/lib/supabase";
import Link from "next/link";
import Nav from "@/components/Nav";
import { parseMarkdown } from "@/lib/markdown";
import { readFile } from "fs/promises";
import path from "path";
import BunnyVideoPlayer from "@/components/BunnyVideoPlayer";
import MediaPreconnect from "@/components/MediaPreconnect";

export const metadata = {
  title: "Portafolio — Dirección Creativa y Producción Audiovisual | Leandro Venegas",
  description: "Proyectos de dirección creativa, producción audiovisual y marketing digital para marcas y empresas en Chile. Casos reales: estrategia, contenido, resultados medibles.",
  openGraph: {
    title: "Portafolio — Dirección Creativa y Producción Audiovisual | Leandro Venegas",
    description:
      "Proyectos reales para marcas y empresas en Chile: estrategia de contenido, producción audiovisual y dirección creativa. Dragon Lab, Crazy Papa Studio, Incoludido y más.",
    url: "https://www.leandrovenegas.cl/portafolio",
    siteName: "Leandro Venegas",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/og-portafolio.jpg",
        width: 1200,
        height: 630,
        alt: "Portafolio de dirección creativa y producción audiovisual — Leandro Venegas",
      },
    ],
  },
  alternates: {
    canonical: "https://www.leandrovenegas.cl/portafolio",
  },
};

export default async function Portafolio() {
  const { data: organizaciones, error } = await supabase
    .from("organizations")
    .select("*")
    .is("parent_organization_id", null)
    .neq("type", "client");

  let descripcionLocal = null;
  try {
    const filePath = path.join(process.cwd(), "public", "content", "portafolio.md");
    const markdown = await readFile(filePath, "utf-8");
    descripcionLocal = parseMarkdown(markdown);
  } catch (e) {
    console.error("Error al leer portafolio.md:", e);
  }

  if (error) return <pre className="font-mono text-accent p-12">Error: {error.message}</pre>;

  return (
    <>
      <MediaPreconnect bunny />
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-16 md:gap-24">

          <header className="pt-12 md:pt-24 flex flex-col items-start gap-4 border-b border-border pb-16">
            <p className="font-mono text-accent text-sm md:text-base tracking-wide uppercase">
              Proyectos y Organizaciones
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] max-w-4xl">
              Portafolio de Dirección Creativa y Producción Audiovisual
            </h1>

            <div className="w-full max-w-4xl mt-8">
              <BunnyVideoPlayer 
                videoId="b9d35e57-14fa-45b8-8ad8-55f2e42cceec"
                title="Showreel Portafolio Audiovisual"
                description="Resumen de trabajos de dirección creativa y producción audiovisual por Leandro Venegas."
              />
            </div>

            {descripcionLocal && (
              <div
                className="font-body text-mid text-lg md:text-xl max-w-3xl leading-relaxed mt-6 prose prose-invert prose-p:my-2 prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: descripcionLocal }}
              />
            )}
          </header>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {organizaciones.map((org) => (
                <Link
                  key={org.id}
                  href={`/portafolio/${org.slug}`}
                  className="bg-bg p-8 md:p-12 flex flex-col gap-4 hover:bg-s1 transition-colors duration-200 group"
                >
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase border border-accent/30 bg-accent/5 px-2 py-1 self-start">
                    {org.type}
                  </span>

                  <h2 className="font-display text-3xl md:text-4xl text-ink mt-2 group-hover:text-accent transition-colors duration-200">
                    {org.name}
                  </h2>

                  <span className="font-mono text-xs text-muted mt-8 group-hover:text-ink transition-colors duration-200">
                    Ver proyectos asociados →
                  </span>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}