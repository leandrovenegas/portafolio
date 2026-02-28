import fs from "fs";
import path from "path";
import { marked } from "marked";

/**
 * Lee un archivo Markdown desde /public/content y lo convierte a HTML.
 * @param {string} filename - Nombre del archivo, ej: "portafolio.md"
 * @returns {Promise<string>} - HTML listo para renderizar
 */
export async function getMarkdownContent(filename) {
  try {
    const filePath = path.join(process.cwd(), "public", "content", filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return marked(fileContent);
  } catch (error) {
    console.warn(`Markdown file not found: ${filename}`);
    return "";
  }
}