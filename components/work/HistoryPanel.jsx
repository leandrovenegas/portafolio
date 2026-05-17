'use client';

import { Clock, CheckCircle, Circle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HistoryPanel({ versions, topicId }) {
  const pathname = usePathname();

  return (
    <div className="w-[var(--panel-right-width,280px)] h-full bg-[var(--ps-bg-panel)] border-l border-[var(--ps-border)] text-[var(--ps-text)] text-[var(--font-size-sm,12px)] overflow-y-auto flex flex-col font-sans">
      <div className="flex-none flex items-center px-3 py-2 border-b border-[var(--ps-border-dark)] bg-[var(--ps-bg-toolbar)]">
        <span className="font-semibold text-[var(--ps-text)] tracking-wide">Version History</span>
      </div>

      <div className="flex-1 p-2 space-y-2 overflow-y-auto">
        {versions?.map((version, idx) => {
          const isLatest = idx === 0;
          const url = `/admin/work/${topicId}/${version.id}`;
          const isViewing = pathname === url;

          return (
            <Link 
              key={version.id} 
              href={url}
              className={`block p-2 rounded-[var(--ps-radius)] border border-transparent cursor-pointer ${isViewing ? 'bg-[var(--ps-bg-input)] border-[var(--ps-border)]' : 'hover:bg-[var(--ps-bg-input)]'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-semibold ${isLatest ? 'text-[var(--ps-accent)]' : 'text-[#cccccc]'}`}>
                  {version.version_name.split(' - ')[0]}
                </span>
                {version.is_active ? (
                  <CheckCircle size={12} className="text-green-500" />
                ) : (
                  <Circle size={12} className="opacity-30" />
                )}
              </div>
              
              <div className="flex items-center gap-1.5 opacity-60 text-[10px]">
                <Clock size={10} />
                <span>{new Date(version.created_at).toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</span>
              </div>
            </Link>
          );
        })}
        {(!versions || versions.length === 0) && (
          <div className="text-center opacity-50 p-4">No history available</div>
        )}
      </div>
    </div>
  );
}
