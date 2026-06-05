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

        if (comp.type === 'HeroVideoSection' || comp.type === 'HeroEditorialSection') {
          return (
            <div
              key={comp.id}
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectComponent) {
                  const target = e.target;
                  const fieldElement = target.closest('[data-field]');
                  const fieldKey = fieldElement ? fieldElement.getAttribute('data-field') : null;
                  onSelectComponent(comp.id, fieldKey);
                }
              }}
              className={`relative group cursor-pointer transition-all duration-200 block w-full
                ${isSelected ? 'ring-4 ring-accent ring-inset z-30' : 'hover:ring-2 hover:ring-accent/40 hover:ring-inset z-20'}
              `}
            >
              {/* Hover Badge */}
              <div className="absolute top-3 right-3 bg-accent text-bg text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none uppercase tracking-wider">
                Editar {comp.name || comp.type}
              </div>

              {/* Selection Highlight Label */}
              {isSelected && (
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
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectComponent) {
                const target = e.target;
                const fieldElement = target.closest('[data-field]');
                const fieldKey = fieldElement ? fieldElement.getAttribute('data-field') : null;
                onSelectComponent(comp.id, fieldKey);
              }
            }}
            className={`relative group cursor-pointer transition-all duration-200 block w-full
              ${isSelected ? 'ring-4 ring-accent ring-inset z-30' : 'hover:ring-2 hover:ring-accent/40 hover:ring-inset z-20'}
            `}
          >
            {/* Hover Badge */}
            <div className="absolute top-3 right-3 bg-accent text-bg text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none uppercase tracking-wider">
              Editar {comp.name || comp.type}
            </div>

            {/* Selection Highlight Label */}
            {isSelected && (
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
