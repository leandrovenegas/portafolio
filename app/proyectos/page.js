import supabase from "@/lib/supabase";
import { readFile } from "fs/promises";
import path from "path";
import { marked } from "marked";

async function getMarkdownContent(filename) {
  const filePath = path.join(process.cwd(), "public", "content", filename);
  const fileContent = await readFile(filePath, "utf8");
  return marked(fileContent);
}

export default async function Proyectos() {
  const [{ data: proyectos, error }, contentHtml] = await Promise.all([
    supabase.from("projects").select("*"),
    getMarkdownContent("portafolio.md"),
  ]);

  if (error) return <pre>Error: {error.message}</pre>;

  return (
    <main>
      {/* Contenido Markdown arriba */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

      {/* Lista de proyectos de Supabase abajo */}
      {proyectos.map((proyecto) => (
        <div key={proyecto.id}>
          <h2>{proyecto.title}</h2>
          <p>{proyecto.date}</p>
          <p>{proyecto.status}</p>
        </div>
      ))}
    </main>
  );
}