import { marked } from "marked";

/**
 * Configura el renderer de marked para generar imágenes con atributos width y height
 *detectando Cloudinary y el parámetro w_1200
 */
export function configureMarkedRenderer() {
  const renderer = new marked.Renderer();
  
  // Renderer personalizado para imágenes
  renderer.image = function (token) {
    // marked > 4.x pasa un objeto token en lugar de parámetros individuales
    const href = token.href || token;
    const title = token.title || null;
    const text = token.text || '';
    
    // Detectar si es una imagen de Cloudinary
    const isCloudinary = href && typeof href === 'string' && href.includes('res.cloudinary.com');
    
    let width = null;
    let height = null;
    let style = '';
    
    if (isCloudinary) {
      // Buscar el parámetro w_1200 en la URL
      const w1200Match = href.match(/w_(\d+)/);
      const w800Match = href.match(/w_(\d+)/);
      const w600Match = href.match(/w_(\d+)/);
      const w400Match = href.match(/w_(\d+)/);
      
      // Usar el valor más alto encontrado o null
      const widthMatch = w1200Match || w800Match || w600Match || w400Match;
      
      if (widthMatch) {
        width = parseInt(widthMatch[1], 10);
        
        // Paraheight, usamos aspect-ratio basado en proporciones comunes
        // de fotos (16:9, 4:3, 3:2, 1:1)
        // Como no tenemos la altura real, usamos un estimado basado en la anchura
        // y aplicamos aspect-ratio con CSS
        height = Math.round(width * 0.6); // Estimado para 16:9 (0.5625) o similar
        
        // apply aspect-ratio via style to prevent CLS
        // Usar max-width en lugar de width para que la imagen no se estire
        style = ` style="aspect-ratio: ${width} / ${height}; height: auto; max-width: 100%; width: ${width}px; object-fit: contain;"`;
      }
    }
    
    const widthAttr = width ? ` width="${width}"` : '';
    const heightAttr = height ? ` height="${height}"` : '';
    const titleAttr = title ? ` title="${title}"` : '';
    const altAttr = text ? ` alt="${text}"` : '';
    
    return `<img src="${href}"${widthAttr}${heightAttr}${altAttr}${titleAttr}${style} loading="lazy" />`;
  };
  
  return renderer;
}

/**
 * Procesa markdown y aplica el renderer personalizado
 */
export function parseMarkdown(content) {
  const renderer = configureMarkedRenderer();
  return marked(content, { renderer });
}