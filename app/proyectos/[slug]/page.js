import supabase from "@/lib/supabase";
import { marked } from "marked";
import { readFile } from "fs/promises";
import path from "path";

export default async function Proyecto({ params }) {
  const { slug } = await params;

  const { data: proyecto, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !proyecto) return <p>Proyecto no encontrado</p>;

  let contenido = null;

  if (proyecto.markdown_url) {
    const filePath = path.join(process.cwd(), "public", proyecto.markdown_url);
    const markdown = await readFile(filePath, "utf-8");
    contenido = marked(markdown);
  }

  return (
    <main>
      <h1>{proyecto.title}</h1>
      <p>{proyecto.date}</p>
      {contenido && (
        <div dangerouslySetInnerHTML={{ __html: contenido }} />
      )}
    </main>
  );
}