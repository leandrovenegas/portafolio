import React from 'react';
import GridEditor from '../GridEditor';

export default function ContainerSection({ 
  bg = 'var(--ps-bg)', 
  borderColor = 'var(--ps-border)', 
  borderRadius = 'var(--ps-radius)',
  childrenComponents = [], 
  id, 
  onLayoutChange, 
  forceBp, 
  onSelectComponent, 
  selectedId,
  activeGridId,
  setActiveGridId,
  registry,
  showGridDebug = false
}) {
  return (
    <div 
      className="w-full h-full relative group/container"
      style={{ 
        background: bg, 
        border: `1px solid ${borderColor}`,
        borderRadius: borderRadius,
      }}
      data-field="bg"
    >
      {/* Etiqueta visual para identificar el contenedor */}
      <div className="absolute top-0 left-0 bg-border text-muted text-[10px] px-2 py-0.5 font-mono uppercase tracking-widest z-10 opacity-0 group-hover/container:opacity-100 transition-opacity pointer-events-none">
        Container
      </div>

      <div className="w-full h-full p-4">
        <GridEditor
          components={childrenComponents}
          onLayoutChange={onLayoutChange}
          forceBp={forceBp}
          onSelectComponent={onSelectComponent}
          selectedId={selectedId}
          parentId={id}
          activeGridId={activeGridId}
          setActiveGridId={setActiveGridId}
          registry={registry}
          showGridDebug={showGridDebug}
        />
      </div>
    </div>
  );
}
