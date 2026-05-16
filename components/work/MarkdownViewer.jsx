'use client';

import { marked } from 'marked';

export default function MarkdownViewer({ content, title }) {
  // Parse markdown
  const htmlContent = marked.parse(content || '*No content available*');

  return (
    <div className="flex-1 h-full flex flex-col bg-[var(--ps-bg-canvas,#1e1e1e)] overflow-hidden font-sans">
      {/* Header Tabs */}
      <div className="flex-none h-8 bg-[var(--ps-bg-panel)] flex items-center px-2 border-b border-[var(--ps-border-dark)]">
        <div className="px-4 py-1.5 bg-[var(--ps-bg-canvas,#1e1e1e)] text-[var(--ps-text)] text-[var(--font-size-sm,12px)] border-t-[2px] border-[var(--ps-accent)] flex items-center gap-2 cursor-pointer">
           <span className="truncate max-w-[200px]">{title || 'Untitled.md'}</span>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center">
        <div className="w-full max-w-3xl prose prose-invert prose-sm">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </div>
  );
}
