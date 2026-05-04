import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MediaPreconnect from "@/components/MediaPreconnect";
import PageRenderer from "@/components/page-builder/PageRenderer";
import { DEFAULT_HOME_COMPONENTS } from "@/components/page-builder/defaultConfig";
import LivePreviewListener from "@/components/page-builder/LivePreviewListener";
import supabase from "@/lib/supabase";

export const metadata = {
  title: 'Videos para Empresas en Valparaíso, Viña del Mar y Santiago con IA | Leandro Venegas',
  description: 'Producción de video para pymes en Valparaíso , Viña del Mar y Santiago. Contenido audiovisual con inteligencia artificial: más videos, menor costo, dirección creativa profesional.',
  keywords: [
    'Leandro Venegas',
    'director creativo Chile',
    'productor audiovisual Chile',
    'estudio creativo Valparaíso',
    'motion design Chile',
    'SEO video Chile',
    'freelance creativo Chile',
  ],
  openGraph: {
    title: 'Videos para Empresas en Valparaíso, Viña del Mar y Santiago con IA | Leandro Venegas',
    description: 'Producción de video para pymes en Valparaíso , Viña del Mar y Santiago. Contenido audiovisual con inteligencia artificial: más videos, menor costo, dirección creativa profesional.',
    url: 'https://www.leandrovenegas.cl/',
  },
  alternates: {
    canonical: 'https://www.leandrovenegas.cl/',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta producir un video para mi empresa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depende del formato y el objetivo. Trabajo con presupuestos reales de pymes — por eso la primera conversación es para entender qué necesitas y qué es posible con tu presupuesto. Sin compromiso."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué tipos de video puedo producir para mi negocio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Videos para redes sociales, video corporativo, animación con IA, y piezas para campañas digitales en Meta, Google o YouTube."
      }
    },
    {
      "@type": "Question",
      "name": "¿La inteligencia artificial reemplaza la dirección creativa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. La IA reduce tiempos y costos de producción, pero el concepto, el guión y la dirección creativa siguen siendo trabajo humano. Esa es la diferencia entre un video que funciona y uno genérico."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajas solo con empresas de Valparaíso y Viña del Mar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mi foco es la quinta región, pero trabajo con empresas de todo Chile según el proyecto."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo toma producir un video?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un video para redes sociales puede estar listo en menos de una semana. Un video corporativo o animación toma entre 2 y 4 semanas dependiendo de la complejidad."
      }
    }
  ]
};

async function getPageComponents(versionId) {
  try {
    let query = supabase.from('page_versions').select('components').eq('slug', 'home');
    
    if (versionId) {
      query = query.eq('id', versionId);
    } else {
      query = query.eq('is_active', true).order('created_at', { ascending: false }).limit(1);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      return DEFAULT_HOME_COMPONENTS;
    }
    return data.components;
  } catch (e) {
    return DEFAULT_HOME_COMPONENTS;
  }
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const versionId = params?.versionId;
  const components = await getPageComponents(versionId);

  return (
    <>
      <LivePreviewListener />
      <MediaPreconnect bunny />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Nav />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        <PageRenderer components={components} />
      </main>
      <Footer />
    </>
  );
}