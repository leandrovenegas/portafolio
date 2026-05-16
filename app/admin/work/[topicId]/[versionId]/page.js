import supabase from '@/lib/supabase';
import MarkdownViewer from '@/components/work/MarkdownViewer';
import HistoryPanel from '@/components/work/HistoryPanel';

export const revalidate = 0; // Disable cache

export default async function VersionPage({ params }) {
  const { topicId, versionId } = await params;

  // Fetch the specific version
  const { data: version } = await supabase
    .from('plan_versions')
    .select('*')
    .eq('id', versionId)
    .single();

  // Fetch all versions for history
  const { data: history } = await supabase
    .from('plan_versions')
    .select('id, version_name, is_active, created_at')
    .eq('topic_id', topicId)
    .order('created_at', { ascending: false });

  if (!version) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--ps-bg-canvas,#1e1e1e)] text-white">
        Versión no encontrada
      </div>
    );
  }

  return (
    <>
      <MarkdownViewer content={version.content} title={version.version_name} />
      <HistoryPanel versions={history} topicId={topicId} />
    </>
  );
}
