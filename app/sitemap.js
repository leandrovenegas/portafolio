import supabase from "@/lib/supabase";
import videos from "@/data/videos";

export default async function sitemap() {
    const baseUrl = "https://www.leandrovenegas.cl";

    // 1. Páginas de Servicios y Marca (Estaticas / Fuera de DB)
    const landingPages = [
        "/director-creativo-chile",
        "/casos-de-exito",
        "/servicios/director-creativo-externo",
        "/servicios/produccion-audiovisual-empresas",
        "/servicios/motion-desing", // Mantengo el slug tal como lo tienes
        "/servicios/seo-video",
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.9, // Prioridad alta por ser servicios comerciales
    }));

    // 2. Fetch de Proyectos (Solo los listos en DB)
    const { data: projects } = await supabase
        .from("projects")
        .select("slug")
        .eq("is_indexed", true)
        .not("markdown_url", "is", null);

    const projectUrls = (projects || []).map((p) => ({
        url: `${baseUrl}/proyectos/${p.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // 3. Fetch de Organizaciones (Portafolio listo en DB)
    const { data: organizations } = await supabase
        .from("organizations")
        .select("slug")
        .eq("is_indexed", true);

    const organizationUrls = (organizations || []).map((o) => ({
        url: `${baseUrl}/portafolio/${o.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // 4. Páginas Raíz
    const coreUrls = [
        "",
        "/proyectos",
        "/portafolio",
        "/video",
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
    }));

    // 5. Videos (Páginas de Visualización - Alta prioridad para indexación)
    const videoUrls = videos.map(video => ({
        url: `${baseUrl}/video/${video.slug}`,
        lastModified: new Date(video.uploadDate).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.9, // Alta prioridad para videos
    }));

    // Unificamos todo el mapa del sitio
    return [...coreUrls, ...landingPages, ...projectUrls, ...organizationUrls, ...videoUrls];
}