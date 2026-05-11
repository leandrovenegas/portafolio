import supabase from "@/lib/supabase";
import Link from "next/link";
import Nav from "@/components/Nav";
import { parseMarkdown } from "@/lib/markdown";
import { readFile } from "fs/promises";
import path from "path";
import BunnyVideoPlayer from "@/components/BunnyVideoPlayer";
import MediaPreconnect from "@/components/MediaPreconnect";
import HeroVideo from "@/components/HeroVideo";
import PageRenderer from '@/components/page-builder/PageRenderer';
import LivePreviewListener from '@/components/page-builder/LivePreviewListener';

export const metadata = {
  title: "Portafolio — Dirección Creativa y Producción Audiovisual | Leandro Venegas",
  description: "Proyectos de dirección creativa, producción audiovisual y marketing digital para marcas y empresas en Chile. Casos reales: estrategia, contenido, resultados medibles.",
  openGraph: {
    title: "Portafolio — Dirección Creativa y Producción Audiovisual | Leandro Venegas",
    description:
      "Proyectos reales para marcas y empresas en Chile: estrategia de contenido, producción audiovisual y dirección creativa. Dragon Lab, Crazy Papa Studio, Incoludido y más.",
    url: "https://www.leandrovenegas.cl/portafolio",
    siteName: "Leandro Venegas",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/og-portafolio.jpg",
        width: 1200,
        height: 630,
        alt: "Portafolio de dirección creativa y producción audiovisual — Leandro Venegas",
      },
    ],
  },
  alternates: {
    canonical: "https://www.leandrovenegas.cl/portafolio",
  },
};

export const dynamic = 'force-dynamic';

async function getPageComponents(slug, versionId) {
  try {
    let query = supabase.from('page_versions').select('components').eq('slug', slug);
    if (versionId) {
      query = query.eq('id', versionId);
    } else {
      query = query.eq('is_active', true).order('created_at', { ascending: false }).limit(1);
    }
    const { data, error } = await query.single();
    if (error || !data) return [];
    return data.components;
  } catch (e) {
    return [];
  }
}

export default async function Portafolio({ searchParams }) {
  const params = await searchParams;
  const versionId = params?.versionId;
  const components = await getPageComponents('portafolio', versionId);


  let descripcionLocal = null;
  try {
    const filePath = path.join(process.cwd(), "public", "content", "portafolio.md");
    const markdown = await readFile(filePath, "utf-8");
    descripcionLocal = parseMarkdown(markdown);
  } catch (e) {
    console.error("Error al leer portafolio.md:", e);
  }


  return (
    <>
      <LivePreviewListener />
      <MediaPreconnect bunny />
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        {/* HERO DINÁMICO DEL PORTAFOLIO */}
        <HeroVideo
          mobileAV1={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net'}/a6075da8-cbd7-4220-b2f9-e3aa3ebc6997/original`}
          mobileVP9={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net'}/96e06cc2-82ec-431f-8898-eeb0f8a47f9d/original`}
          mobileH264={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME || 'vz-a158839f-ce6.b-cdn.net'}/0445fa0f-4e22-4cae-b55c-add19fdcb85b/play_720p.mp4`}
          desktopAV1=""
          desktopVP9=""
          desktopH264=""
          posterSrc="/images/og-portafolio.jpg"
        >
          <p className="font-mono text-accent text-sm md:text-base tracking-wide uppercase mb-4">
            Proyectos y Organizaciones
          </p>
          <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-ink leading-[0.9] max-w-5xl mb-8">
            Portafolio de Dirección Creativa y Producción Audiovisual
          </h1>
          {descripcionLocal && (
            <div
              className="font-body text-mid text-lg md:text-xl max-w-3xl leading-relaxed prose prose-invert prose-p:my-2 prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: descripcionLocal }}
            />
          )}
        </HeroVideo>

        {components && components.length > 0 && (
          <div className="w-full relative z-20 bg-bg">
            <PageRenderer components={components} />
          </div>
        )}


      </main>
    </>
  );
}