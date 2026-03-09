import supabase from "@/lib/supabase";
import Link from "next/link";
import Nav from "@/components/Nav";
import { marked } from "marked";
import { readFile } from "fs/promises";
import path from "path";

export const metadata = {
  title: "Portafolio | Leandro Venegas - Proyectos Audiovisuales y Diseño",
  description: "Explora la trayectoria y organizaciones lideradas por Leandro Venegas. Proyectos desde Chile sobre narrativa audiovisual, diseño de producto y comunicación.",
  openGraph: {
    title: "Portafolio Creativo de Leandro Venegas",
    description: "Recopilación de proyectos y organizaciones: Incoludido, Crazy Papa y más.",
    url: "https://www.leandrovenegas.cl/portafolio",
    images: [
      {
        url: "/og-portafolio.jpg", // Pon una imagen que represente tu trabajo general
        width: 1200,
        height: 630,
        alt: "Portafolio de Leandro Venegas",
      },
    ],
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
    descripcionLocal = marked(markdown);
  } catch (e) {
    console.error("Error al leer portafolio.md:", e);
  }

  if (error) return <pre>Error: {error.message}</pre>;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black px-6 py-16 md:px-12 lg:px-24">
        <h1 className="text-white text-3xl font-bold tracking-tighter mb-2 md:text-5xl">
          Portafolio
        </h1>
        <p className="text-zinc-500 text-sm tracking-widest uppercase mb-12">
          Proyectos y organizaciones
        </p>

        {descripcionLocal && (
          <div
            className="text-zinc-400 text-base leading-relaxed mb-16 max-w-2xl prose prose-invert"
            dangerouslySetInnerHTML={{ __html: descripcionLocal }}
          />
        )}
        <div className="grid grid-cols-1 gap-px bg-zinc-800 border border-zinc-800 md:grid-cols-2">
          {organizaciones.map((org) => (
            <Link
              key={org.id}
              href={`/portafolio/${org.slug}`}
              className="bg-black p-8 flex flex-col gap-4 hover:bg-zinc-900 transition-colors duration-200 group"
            >
              <span className="text-zinc-600 text-xs tracking-widest uppercase">
                {org.type}
              </span>
              <h2 className="text-white text-2xl font-bold tracking-tight group-hover:text-zinc-300 transition-colors duration-200">
                {org.name}
              </h2>
              <span className="text-zinc-600 text-xs tracking-widest uppercase mt-auto group-hover:text-zinc-400 transition-colors duration-200">
                Ver proyectos →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}