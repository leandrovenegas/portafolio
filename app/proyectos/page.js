import supabase from "@/lib/supabase";
import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

async function getMarkdownContent(filename) {
  const filePath = path.join(process.cwd(), "content", filename);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const processed = await remark().use(html).process(fileContent);
  return processed.toString();
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