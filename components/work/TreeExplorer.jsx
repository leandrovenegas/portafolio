'use client';

import { Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TreeExplorer({ topics }) {
  const pathname = usePathname();
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  return (
    <div className="w-[var(--panel-left-width,240px)] h-full bg-[var(--ps-bg-panel)] border-r border-[var(--ps-border)] text-[var(--ps-text)] text-[var(--font-size-sm,12px)] overflow-y-auto flex flex-col font-sans">
      {/* Toolbar */}
      <div className="flex-none flex items-center px-3 py-2 border-b border-[var(--ps-border-dark)] bg-[var(--ps-bg-toolbar)]">
        <span className="font-semibold text-[var(--ps-text)] tracking-wide">WorkTree Explorer</span>
      </div>
      
      {/* Directorio */}
      <div className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {topics?.map(topic => {
          const isExpanded = expandedTopics[topic.id];
          return (
            <div key={topic.id} className="flex flex-col">
              <div 
                onClick={() => toggleTopic(topic.id)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-[var(--ps-radius)] hover:bg-[var(--ps-bg-input)] cursor-pointer text-[#cccccc]"
              >
                {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                <Folder size={14} className="text-[var(--ps-accent)]" strokeWidth={1.5} />
                <span className="truncate">{topic.name}</span>
              </div>

              {/* Archivos (Versiones Activas del Topic) */}
              {isExpanded && topic.plan_versions?.filter(v => v.is_active).map(version => {
                const url = `/admin/work/${topic.id}/${version.id}`;
                const isActiveFile = pathname === url;

                return (
                  <Link href={url} key={version.id} className={`flex items-center gap-1.5 pl-7 pr-2 py-1 mt-0.5 rounded-[var(--ps-radius)] cursor-pointer text-[#cccccc] ${isActiveFile ? 'bg-[var(--ps-bg-input)] text-white' : 'hover:bg-[var(--ps-bg-input)]'}`}>
                    <FileText size={12} className="text-[var(--ps-text)] opacity-70" strokeWidth={1.5} />
                    <span className="truncate">{version.version_name.split(' - ')[0]}</span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
