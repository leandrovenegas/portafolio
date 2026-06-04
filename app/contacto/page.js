import NewsletterSignup from "@/components/NewsletterSignup";
import PageRenderer from '@/components/page-builder/PageRenderer';
import LivePreviewListener from '@/components/page-builder/LivePreviewListener';
import supabase from '@/lib/supabase';

export const metadata = {
  title: "Contacto | Leandro Venegas",
  description: "Contacta a Leandro Venegas — creador de productos desde Chile.",
  alternates: {
    canonical: "https://www.leandrovenegas.cl/contacto",
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

export default async function Contacto({ searchParams }) {
  const params = await searchParams;
  const versionId = params?.versionId;
  const components = await getPageComponents('contacto', versionId);

  return (
    <>
      <LivePreviewListener />
      <main className="min-h-screen bg-bg relative overflow-hidden pb-24">
        
        {components && components.length > 0 && (
          <div className="w-full relative z-20 bg-bg">
            <PageRenderer components={components} />
          </div>
        )}

        <div className="relative z-10 px-6 pt-24 md:pt-32 md:px-12 lg:px-24 mx-auto max-w-5xl flex flex-col gap-16 md:gap-24">
          
        </div>
      </main>
    </>
  );
}