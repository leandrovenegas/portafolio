import Link from "next/link";
import MediaPreconnect from "@/components/MediaPreconnect";
import { DEFAULT_HOME_COMPONENTS } from "@/components/page-builder/defaultConfig";
import LivePreviewListener from "@/components/page-builder/LivePreviewListener";
import supabase from "@/lib/supabase";
export const metadata = {
  title: 'Productor Audiovisual en Valparaíso | Leandro Venegas',
  description: 'Servicios de producción audiovisual y edición de video para empresas y creadores en Valparaíso, Viña del Mar y Santiago. 10 años de experiencia.',
  keywords: [
    'productor audiovisual',
    'editor de video freelance',
    'editor de video para redes sociales',
    'agencia audiovisual chile',
    'contratar editor de video',
    'creador de contenido con ia',
  ],
  openGraph: {
    title: 'Productor Audiovisual en Valparaíso | Leandro Venegas',
    description: 'Servicios de producción audiovisual y edición de video para empresas y creadores en Valparaíso, Viña del Mar y Santiago. 10 años de experiencia.',
    url: 'https://www.leandrovenegas.cl/',
  },
  twitter: {
    description: 'Servicios de producción audiovisual y edición de video para empresas y creadores en Valparaíso, Viña del Mar y Santiago. 10 años de experiencia.',
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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Leandro Venegas - Productor Audiovisual",
  "url": "https://www.leandrovenegas.cl",
  "telephone": "+56988804299",
  "areaServed": [
    { "@type": "City", "name": "Valparaíso" },
    { "@type": "City", "name": "Viña del Mar" },
    { "@type": "City", "name": "Santiago" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Valparaíso",
    "addressCountry": "CL"
  }
};

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const versionId = params?.versionId;
  const components = await getPageComponents(versionId);

  return (
    <>
      <MediaPreconnect bunny />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, localBusinessSchema]),
        }}
      />
      <main className="min-h-screen bg-bg relative overflow-hidden">
        <LivePreviewListener initialComponents={components} />
      </main>

    </>
  );
}