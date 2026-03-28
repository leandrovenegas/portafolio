import supabase from "@/lib/supabase";

export default async function sitemap() {
    const baseUrl = "https://www.leandrovenegas.cl";

    // 1. Fetch projects: Solo los que marcaste como listos (is_indexed)
    // Agregamos el filtro de markdown_url para asegurar que tengan contenido real
    const { data: projects } = await supabase
        .from("projects")
        .select("slug")
        .eq("is_indexed", true)
        .not("markdown_url", "is", null);

    // 2. Fetch organizations (Portafolio): Solo las marcadas para mostrarse
    const { data: organizations } = await supabase
        .from("organizations")
        .select("slug")
        .eq("is_indexed", true);

    const projectUrls = (projects || []).map((p) => ({
        url: `${baseUrl}/proyectos/${p.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const organizationUrls = (organizations || []).map((o) => ({
        url: `${baseUrl}/portafolio/${o.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    const staticUrls = [
        "",
        "/proyectos",
        "/portafolio",
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 1.0,
    }));

    return [...staticUrls, ...projectUrls, ...organizationUrls];
}