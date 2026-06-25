import supabase from "@/lib/supabase";
import { parseMarkdown } from "@/lib/markdown";
import { readFile } from "fs/promises";
import path from "path";
import MediaPreconnect from "@/components/MediaPreconnect";
import HeroVideo from "@/components/HeroVideo";
import LivePreviewListener from '@/components/page-builder/LivePreviewListener';
import HeroPortafolioTexto from "@/components/HeroPortafolioTexto";
import CTASection from "@/components/page-builder/sections/CTASection";


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
      <MediaPreconnect bunny />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <HeroPortafolioTexto headline="Dirección Creativa y Producción Audiovisual" descriptionHtml={descripcionLocal} />
        {components && components.length > 0 && (
          <div className="w-full relative z-20 bg-bg">
            <LivePreviewListener initialComponents={components} />
          </div>
        )}
        <div className="relative z-20 bg-bg mx-auto max-w-7xl w-full px-6 md:px-12 lg:px-24 py-12 md:py-16">
          <CTASection 
            href="https://wa.me/56988804299?text=Hola%20Leandro%2C%20quiero%20hablar%20sobre%20el%20sistema" 
            text="Hablar con Leandro" 
          />
        </div>
      </main>
    </>
  );
}