import supabase from "@/lib/supabase";
import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: "Portafolio Creativo | Leandro Venegas - Audiovisual & Diseño",
  description: "Explora el universo visual de Leandro Venegas: Dirección audiovisual, diseño de productos y narrativa transmedia desde Valparaíso, Chile. Creador de Incoludido y Crazy Papa.",
  keywords: ["Audiovisual Chile", "Diseño de Producto", "Incoludido", "Leandro Venegas", "Valparaíso Creativo", "Ufología", "Narrativa Transmedia"],
  openGraph: {
    title: "Leandro Venegas | Realizador Audiovisual y Diseñador Multidisciplinar",
    description: "Portafolio de proyectos que desafían lo convencional: desde spots para Incoludido hasta diseño de autor y fanzines.",
    url: "https://www.leandrovenegas.cl/proyectos",
    type: "website",
  },
  alternates: {
    canonical: "https://www.leandrovenegas.cl/proyectos",
  },
};

export default async function Proyectos() {
  const { data: proyectos, error } = await supabase
    .from("projects")
    .select("*, owner:owner_organization_id(name, slug)")
    .eq("status", "published")
    .order("date", { ascending: false });

  if (error) return <pre className="font-mono text-accent p-12">Error: {error.message}</pre>;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <div className="relative z-10 px-6 pt-24 md:px-12 lg:px-24 mx-auto max-w-7xl flex flex-col gap-16 md:gap-24">
          
          <header className="pt-12 md:pt-24 flex flex-col items-start gap-4 border-b border-border pb-16">
            <p className="font-mono text-accent text-sm md:text-base tracking-wide uppercase">
              Archivo General
            </p>
            <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] max-w-4xl">
              Proyectos
            </h1>
          </header>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {proyectos.map((proyecto) => (
                <Link
                  key={proyecto.id}
                  href={`/proyectos/${proyecto.slug}`}
                  className="bg-bg p-8 flex flex-col hover:bg-s1 transition-colors duration-200 group"
                >
                  <div className="mb-6 aspect-video w-full bg-s1 overflow-hidden border border-border group-hover:border-border2 transition-colors">
                    {proyecto.cover_image ? (
                      <img
                        src={proyecto.cover_image}
                        alt={proyecto.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-s1">
                        <span className="font-mono text-[10px] text-muted tracking-widest">SIN IMAGEN</span>
                      </div>
                    )}
                  </div>
                  
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase mb-3">
                    {proyecto.owner?.name}
                  </span>
                  
                  <h2 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-4 group-hover:text-accent transition-colors duration-200">
                    {proyecto.title}
                  </h2>
                  
                  {proyecto.date && (
                    <span className="font-mono text-xs text-muted mt-auto">
                      {proyecto.date}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}