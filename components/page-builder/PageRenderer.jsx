'use client';

import { COMPONENT_REGISTRY } from './registry';

function getComponentFileName(type) {
  if (type === 'HeroPortafolioTexto') {
    return 'components/HeroPortafolioTexto.jsx';
  }
  return `components/page-builder/sections/${type}.jsx`;
}

export default function PageRenderer({ components, forceBp = null, onSelectComponent = null, selectedId = null, onUpdateProp = null }) {
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

        const isHidden = comp._layout?.[forceBp || 'desktop']?.hidden === true;
        if (isHidden) return null;

        const isSelected = comp.id === selectedId;
        const isEditable = !!onSelectComponent;

        if (comp.type === 'HeroVideoSection' || comp.type === 'HeroEditorialSection' || comp.type === 'LogosSection') {
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
              {/* Permanent Component Tag */}
              {isEditable && (
                <div className="absolute top-3 right-3 bg-[#0a0a0a]/90 text-accent border border-accent/20 text-[10px] font-mono px-2.5 py-1 rounded-md shadow-lg z-40 pointer-events-none transition-all group-hover:border-accent/50 uppercase tracking-wider">
                  {comp.type}
                </div>
              )}

              {/* Selection Highlight Label with File Path */}
              {isEditable && isSelected && (
                <div className="absolute top-3 left-3 bg-accent text-bg text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl z-50 pointer-events-none uppercase tracking-wider flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-bg animate-pulse" />
                    <span>Editando</span>
                  </div>
                  <div className="text-[9px] font-mono normal-case tracking-normal opacity-90 border-t border-bg/25 pt-1 mt-0.5">
                    {getComponentFileName(comp.type)}
                  </div>
                </div>
              )}

              <ComponentToRender
                {...comp.props}
                forceBp={forceBp}
                {...(onUpdateProp && comp.type === 'AvatarTextSection' ? {
                  onPropChange: (field, value) => onUpdateProp(comp.id, field, value)
                } : {})}
              />
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
            {/* Permanent Component Tag */}
            {isEditable && (
              <div className="absolute top-3 right-3 bg-[#0a0a0a]/90 text-accent border border-accent/20 text-[10px] font-mono px-2.5 py-1 rounded-md shadow-lg z-40 pointer-events-none transition-all group-hover:border-accent/50 uppercase tracking-wider">
                {comp.type}
              </div>
            )}

            {/* Selection Highlight Label with File Path */}
            {isEditable && isSelected && (
              <div className="absolute top-3 left-3 bg-accent text-bg text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl z-50 pointer-events-none uppercase tracking-wider flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-bg animate-pulse" />
                  <span>Editando</span>
                </div>
                <div className="text-[9px] font-mono normal-case tracking-normal opacity-90 border-t border-bg/25 pt-1 mt-0.5">
                  {getComponentFileName(comp.type)}
                </div>
              </div>
            )}

            <div className={`relative z-10 mx-auto max-w-7xl w-full ${
              forceBp === 'mobile'
                ? 'px-6 py-12'
                : forceBp === 'tablet'
                  ? 'px-12 py-12'
                  : 'px-6 md:px-12 lg:px-24 py-12 md:py-16'
            }`}>
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
    </>
  );
}
