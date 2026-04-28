import supabase from '@/lib/supabase';
import { fetchBunnyVideos } from '@/lib/bunny';
import { readVideoConfig } from '@/lib/videoConfig';

export default async function sitemap() {
    const baseUrl = "https://www.leandrovenegas.cl";

    // 1. Páginas de Servicios y Marca (Estáticas)
    const landingPages = [
        "/director-creativo-chile",
        "/casos-de-exito",
        "/servicios/director-creativo-externo",
        "/servicios/produccion-audiovisual-empresas",
        "/servicios/motion-desing",
        "/servicios/seo-video",
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    // 2. Proyectos (Solo indexados en DB)
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

    // 3. Portafolio (Organizaciones indexadas en DB)
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
        "/videos",
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1.0,
    }));

    // 5. Páginas individuales de video (habilitadas en admin)
    //    Incluye todos los videos de la librería de Bunny que estén activados,
    //    incluyendo los que aparecen en el portafolio.
    let videoUrls = [];
    try {
        const videos = await fetchBunnyVideos();
        const config = await readVideoConfig();
        const enabledIds = new Set(
            (config.videos || [])
                .filter((item) => item.enabled)
                .map((item) => item.videoId)
        );

        videoUrls = videos
            .filter((video) => enabledIds.has(video.id))
            .map(video => ({
                url: `${baseUrl}/videos/${video.slug}`,
                lastModified: video.uploadDate
                    ? new Date(video.uploadDate).toISOString()
                    : new Date().toISOString(),
                changeFrequency: 'monthly',
                priority: 0.9,
                // Google Video Sitemap fields (Next.js passes these as-is)
                images: video.thumbnailUrl ? [video.thumbnailUrl] : [],
            }));
    } catch (error) {
        console.warn('Sitemap video fetch failed:', error.message);
    }

    return [...coreUrls, ...landingPages, ...projectUrls, ...organizationUrls, ...videoUrls];
}