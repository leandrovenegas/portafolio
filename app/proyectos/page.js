import supabase from "@/lib/supabase";
import Nav from "@/components/Nav";
import Link from "next/link";

export default async function Proyectos() {
  const { data: proyectos, error } = await supabase
    .from("projects")
    .select("*, owner:owner_organization_id(name, slug)")
    .eq("status", "published")
    .order("date", { ascending: false });

  if (error) return <pre>Error: {error.message}</pre>;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black px-6 py-16 md:px-12 lg:px-24">
        <div className="mb-16 max-w-2xl">
          <h1 className="text-white text-4xl font-bold tracking-tighter md:text-6xl">
            Proyectos
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-px bg-zinc-800 border border-zinc-800 md:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((proyecto) => (
            <Link
              key={proyecto.id}
              href={`/proyectos/${proyecto.slug}`}
              className="bg-black p-8 flex flex-col gap-4 hover:bg-zinc-900 transition-colors duration-200 group"
            >
              {proyecto.cover_image && (
                <img
                  src={proyecto.cover_image}
                  alt={proyecto.title}
                  className="w-full aspect-video object-cover"
                />
              )}
              <span className="text-zinc-600 text-xs tracking-widest uppercase">
                {proyecto.owner?.name}
              </span>
              <h2 className="text-white text-xl font-bold tracking-tight group-hover:text-zinc-300 transition-colors duration-200">
                {proyecto.title}
              </h2>
              {proyecto.date && (
                <span className="text-zinc-600 text-xs tracking-widest uppercase mt-auto">
                  {proyecto.date}
                </span>
              )}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const metadata = {
  title: "Proyectos | Leandro Venegas",
  description: "Proyectos de diseño, audiovisual y producto desde Valparaíso, Chile.",
};