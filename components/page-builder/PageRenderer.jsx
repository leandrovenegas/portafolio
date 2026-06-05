'use client';

import { COMPONENT_REGISTRY } from './registry';

export default function PageRenderer({ components, forceBp = null, onSelectComponent = null, selectedId = null }) {
  if (!components || !components.length) {
    return null;
  }

  return (
    <>
      {components.map((comp) => {
        const ComponentToRender = COMPONENT_REGISTRY[comp.type];
        
        if (!ComponentToRender) {
          console.warn(`Component type ${comp.type} not found in registry.`);
          return null;
        }

        const isSelected = comp.id === selectedId;
        const isEditable = !!onSelectComponent;

        if (comp.type === 'HeroVideoSection' || comp.type === 'HeroEditorialSection') {
          return (
            <div
              key={comp.id}
              onClick={isEditable ? (e) => {
                e.stopPropagation();
                const target = e.target;
                const fieldElement = target.closest('[data-field]');
                const fieldKey = fieldElement ? fieldElement.getAttribute('data-field') : null;
                onSelectComponent(comp.id, fieldKey);
              } : undefined}
              className={`relative block w-full
                ${isEditable ? (isSelected ? 'ring-4 ring-accent ring-inset z-30 cursor-pointer group' : 'hover:ring-2 hover:ring-accent/40 hover:ring-inset z-20 cursor-pointer group') : ''}
              `}
            >
              {/* Hover Badge */}
              {isEditable && (
                <div className="absolute top-3 right-3 bg-accent text-bg text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none uppercase tracking-wider">
                  Editar {comp.name || comp.type}
                </div>
              )}

              {/* Selection Highlight Label */}
              {isEditable && isSelected && (
                <div className="absolute top-3 left-3 bg-accent text-bg text-[10px] font-bold px-2 py-1 rounded shadow-lg z-50 pointer-events-none uppercase tracking-wider">
                  Editando
                </div>
              )}

              <ComponentToRender {...comp.props} forceBp={forceBp} />
            </div>
          );
        }

        return (
          <div
            key={comp.id}
            onClick={isEditable ? (e) => {
              e.stopPropagation();
              const target = e.target;
              const fieldElement = target.closest('[data-field]');
              const fieldKey = fieldElement ? fieldElement.getAttribute('data-field') : null;
              onSelectComponent(comp.id, fieldKey);
            } : undefined}
            className={`relative block w-full
              ${isEditable ? (isSelected ? 'ring-4 ring-accent ring-inset z-30 cursor-pointer group' : 'hover:ring-2 hover:ring-accent/40 hover:ring-inset z-20 cursor-pointer group') : ''}
            `}
          >
            {/* Hover Badge */}
            {isEditable && (
              <div className="absolute top-3 right-3 bg-accent text-bg text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none uppercase tracking-wider">
                Editar {comp.name || comp.type}
              </div>
            )}

            {/* Selection Highlight Label */}
            {isEditable && isSelected && (
              <div className="absolute top-3 left-3 bg-accent text-bg text-[10px] font-bold px-2 py-1 rounded shadow-lg z-50 pointer-events-none uppercase tracking-wider">
                Editando
              </div>
            )}

            <div className="relative z-10 px-6 md:px-12 lg:px-24 mx-auto max-w-7xl w-full py-12 md:py-16">
              <ComponentToRender {...comp.props} forceBp={forceBp} />
            </div>
          </div>
        );
      })}
    </>
  );
}
