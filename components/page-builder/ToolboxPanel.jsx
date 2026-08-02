import React from 'react';
import { COMPONENT_DEFINITIONS } from './registry';

export default function ToolboxPanel() {
  const onDragStart = (e, type) => {
    e.dataTransfer.setData('text/plain', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="p-3 border-t border-border bg-bg flex flex-col gap-2">
      <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Toolbox (Arrastrar)</h3>
      <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
        {COMPONENT_DEFINITIONS.map(d => (
          <div
            key={d.type}
            draggable
            onDragStart={(e) => onDragStart(e, d.type)}
            className="bg-s1 border border-border rounded p-2 text-[11px] font-medium text-ink text-center cursor-grab hover:bg-hover hover:border-accent hover:text-white transition-all select-none shadow-sm active:cursor-grabbing"
            title="Arrastra este componente al canvas libre"
          >
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
}
