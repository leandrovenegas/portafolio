import supabase from "@/lib/supabase";

export default async function sitemap() {
    const baseUrl = "https://www.leandrovenegas.cl";

    // Fetch projects
    const { data: projects } = await supabase
        .from("projects")
        .select("slug")
        .eq("status", "published");

    // Fetch organizations
    const { data: organizations } = await supabase
        .from("organizations")
        .select("slug")
        .neq("type", "client");

    const projectUrls = (projects || []).map((p) => ({
        url: `${baseUrl}/proyectos/${p.slug}`,
        lastModified: new Date().toISOString(),
    }));

    const organizationUrls = (organizations || []).map((o) => ({
        url: `${baseUrl}/portafolio/${o.slug}`,
        lastModified: new Date().toISOString(),
    }));

    const staticUrls = [
        "",
        "/proyectos",
        "/portafolio",
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
    }));

    return [...staticUrls, ...projectUrls, ...organizationUrls];
}
