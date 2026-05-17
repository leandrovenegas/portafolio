import supabase from '@/lib/supabase';
import TreeExplorer from '@/components/work/TreeExplorer';

export const metadata = {
  title: 'WorkTree | Leandro Venegas',
};

export const revalidate = 0; // Disable cache for admin panel

async function getTopics() {
  const { data: topics } = await supabase
    .from('plan_topics')
    .select(`
      id,
      name,
      plan_versions (
        id,
        version_name,
        is_active
      )
    `)
    .order('name');
  
  return topics || [];
}

export default async function WorkTreeLayout({ children }) {
  const topics = await getTopics();

  return (
    <>
      <style>{`
        :root {
          --ps-bg-canvas: #1e1e1e;
          --ps-bg-panel: #252526;
          --ps-bg-toolbar: #2d2d2d;
          --ps-bg-input: #3c3c3c;
          --ps-border: #3c3c3c;
          --ps-border-dark: #1e1e1e;
          --ps-border-light: #555555;
          --ps-text: #cccccc;
          --ps-accent: #1473e6;
          --ps-radius: 3px;
          --panel-left-width: 240px;
          --panel-right-width: 280px;
        }
      `}</style>
      <div className="flex fixed inset-0 z-[9999] w-full h-screen overflow-hidden bg-[var(--ps-bg-canvas)] font-sans">
        <TreeExplorer topics={topics} />
        <div className="flex-1 flex overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
