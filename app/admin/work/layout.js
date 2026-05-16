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
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[var(--ps-bg-canvas,#1e1e1e)] font-sans">
      <TreeExplorer topics={topics} />
      <div className="flex-1 flex overflow-hidden">
        {children}
      </div>
    </div>
  );
}
