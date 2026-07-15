'use client';

import { COMPONENT_REGISTRY } from './registry';

export default function PageRenderer({ components, forceBp = 'desktop', onSelectComponent = null, selectedId = null, onUpdateProp = null }) {
  if (!components || !components.length) {
    return null;
  }

  return (
    <div 
      className="page-grid-container w-full max-w-[1400px] mx-auto"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridAutoRows: '30px',
        gap: '10px', // React-Grid-Layout default margin is [10, 10]
        padding: '10px' // React-Grid-Layout default container padding
      }}
    >
      {components.map((comp) => {
        const ComponentToRender = COMPONENT_REGISTRY[comp.type];
        
        if (!ComponentToRender) {
          console.warn(`Component type ${comp.type} not found in registry.`);
          return null;
        }

        const isSelected = comp.id === selectedId;
        const isEditable = !!onSelectComponent;
        
        const l = comp._layout?.[forceBp] || comp.layout?.[forceBp] || { x: 0, y: 0, w: 24, h: 4 };

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
            style={{
              gridColumn: `${l.x + 1} / span ${l.w}`,
              gridRow: `${l.y + 1} / span ${l.h}`
            }}
            className={`relative block w-full h-full overflow-hidden
              ${isEditable ? (isSelected ? 'ring-4 ring-accent ring-inset z-30 cursor-pointer group' : 'hover:ring-2 hover:ring-accent/40 hover:ring-inset z-20 cursor-pointer group') : ''}
            `}
          >
            {/* Hover Badge */}
            {isEditable && (
              <div className="absolute top-2 right-2 bg-accent text-bg text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none uppercase tracking-wider">
                Editar {comp.name || comp.type}
              </div>
            )}

            {/* Selection Highlight Label */}
            {isEditable && isSelected && (
              <div className="absolute top-2 left-2 bg-accent text-bg text-[10px] font-bold px-2 py-1 rounded shadow-lg z-50 pointer-events-none uppercase tracking-wider">
                Editando
              </div>
            )}

            <div className="w-full h-full relative z-10">
              <ComponentToRender
                {...comp.props}
                forceBp={forceBp}
                {...(onUpdateProp && comp.type === 'AvatarTextSection' ? {
                  onPropChange: (field, value) => onUpdateProp(comp.id, field, value)
                } : {})}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
