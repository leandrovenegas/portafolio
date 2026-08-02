'use client';

import React, { useEffect, useRef } from 'react';

export default function GridEditor({ 
  components, 
  onLayoutChange, 
  forceBp = 'desktop', 
  onSelectComponent, 
  selectedId, 
  parentId = null,
  activeGridId = null,
  setActiveGridId = () => {},
  registry = {},
  onUpdateProp = null,
  onDropComponent = null,
  showGridDebug = false
}) {
  const wrapperRef = useRef(null);

  // Esta grid está activa para edición si activeGridId coincide con su parentId
  const isInteractive = activeGridId === parentId;

  // Hay algún elemento hijo en este nivel siendo editado internamente
  const activeChildId = (activeGridId !== null && activeGridId !== parentId)
    ? components.find(c => c.id === activeGridId)?.id ?? null
    : null;

  // ── Escape: salir del modo edición interna (listener de documento) ─────────
  useEffect(() => {
    if (!activeChildId) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setActiveGridId(parentId); // volvemos al nivel de esta grid (parentId suele ser null = raíz)
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [activeChildId, parentId, setActiveGridId]);

  // ── Click fuera: salir del modo edición interna ───────────────────────────
  useEffect(() => {
    if (!activeChildId) return;
    const handleClickOutside = (e) => {
      // Si el click fue fuera del contenedor de esta grid → salir
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setActiveGridId(parentId);
      }
    };
    // Pequeño delay para no capturar el mismo doble-clic que activó el modo
    const t = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside, true);
    }, 200);
    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [activeChildId, parentId, setActiveGridId]);

  // ── Handlers de Drop HTML5 ────────────────────────────────────────────────
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isInteractive || activeChildId) return;
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!isInteractive || activeChildId) return;
    const type = e.dataTransfer.getData('text/plain');
    if (type && onDropComponent) {
      // Pasamos un placeholder o null como coords (ya no usamos layout absoluto)
      onDropComponent(type, { x: 0, y: 0, w: 24, h: 4 }, parentId);
    }
  };

  return (
    <div 
      ref={wrapperRef}
      className="w-full h-full relative flex flex-col pb-32" 
      style={{ minHeight: '800px' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {components.map((comp) => {
        const ComponentToRender = registry[comp.type] || (() => <div>Componente {comp.type} no encontrado</div>);
        
        const isSelected = comp.id === selectedId;
        // Este componente está siendo editado internamente
        const isEditingInternally = comp.id === activeChildId;
        // Otro componente está siendo editado → este queda bloqueado
        const isLockedByOther = !!activeChildId && !isEditingInternally;
        // ¿Está oculto en esta vista?
        const isHidden = comp._layout?.[forceBp]?.hidden === true;
        
        return (
          <div 
            key={comp.id}
            style={{
              zIndex: comp._layout?.[forceBp]?.zIndex || 1,
              ...(isEditingInternally ? { pointerEvents: 'none' } : {}),
              ...(isHidden ? { opacity: 0, pointerEvents: 'none', display: 'none' } : {})
            }}
            className={`relative group bg-transparent transition-opacity duration-150 w-full
              ${isLockedByOther ? 'opacity-30 pointer-events-none' : 'opacity-100'}
              ${isEditingInternally
                ? 'ring-2 ring-accent/50 ring-inset z-30'
                : isSelected && !activeChildId
                  ? 'ring-4 ring-accent ring-inset z-30'
                  : !isEditingInternally && !activeChildId
                    ? 'hover:ring-2 hover:ring-accent/40 hover:ring-inset z-20 border border-transparent hover:border-dashed hover:border-border'
                    : ''
              }
            `}
            onClick={(e) => {
              // Bloquear si la grid no está activa, o si hay un hijo en modo interno
              if (!isInteractive || isEditingInternally || isLockedByOther) return;
              e.stopPropagation();
              const fieldElement = e.target.closest('[data-field]');
              const fieldKey = fieldElement ? fieldElement.getAttribute('data-field') : null;
              onSelectComponent(comp.id, fieldKey);
            }}
            onDoubleClick={(e) => {
              if (!isInteractive || isLockedByOther) return;
              e.stopPropagation();
              onSelectComponent(comp.id, null);
              // Entrar al modo edición interna de este componente
              setActiveGridId(comp.id);
            }}
          >
            {/* Badge "Editando" — fuera del flujo, flotando sobre el componente */}
            {isSelected && !isEditingInternally && !activeChildId && (
              <div className="absolute bottom-full left-0 mb-1 bg-accent text-bg text-[10px] font-bold px-3 py-1 rounded-t-md shadow-lg z-[100] pointer-events-none uppercase tracking-wider">
                Editando • Capa {comp._layout?.[forceBp]?.zIndex || 1}
              </div>
            )}

            {/* Badge "Hover" */}
            {!isSelected && !isEditingInternally && !activeChildId && (
              <div 
                className="absolute bottom-full left-0 mb-1 text-[10px] font-bold px-3 py-1 rounded-t-md shadow-lg z-[100] pointer-events-none uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--ps-bg-tooltip, rgba(26,26,26,0.9))',
                  color: 'var(--ps-text-dim, #999999)',
                  border: '1px solid var(--ps-border-light, #444444)'
                }}
              >
                {registry[comp.type]?.name || comp.type}
              </div>
            )}

            {/* Badge "Edición interna activa" */}
            {isEditingInternally && (
              <div className="absolute bottom-full left-0 mb-1 bg-accent/90 text-bg text-[10px] font-bold px-3 py-1 rounded-t-md shadow-lg z-[100] pointer-events-none uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-bg animate-pulse inline-block" />
                Edición interna — Esc o clic afuera para salir
              </div>
            )}
            
            {/* Contenido del componente */}
            <div 
              className="w-full h-full overflow-hidden relative"
              style={isEditingInternally ? { pointerEvents: 'auto' } : {}}
              onMouseDown={isEditingInternally ? (e) => e.stopPropagation() : undefined}
              onTouchStart={isEditingInternally ? (e) => e.stopPropagation() : undefined}
            >
              <ComponentToRender
                {...comp.props}
                forceBp={forceBp}
                childrenComponents={comp.children}
                id={comp.id}
                onLayoutChange={onLayoutChange}
                onSelectComponent={onSelectComponent}
                selectedId={selectedId}
                activeGridId={activeGridId}
                setActiveGridId={setActiveGridId}
                registry={registry}
                onPropChange={onUpdateProp ? (field, value) => onUpdateProp(comp.id, field, value) : null}
                showGridDebug={showGridDebug}
              />
            </div>
          </div>
        );
      })}

      {/* Placeholder Drop Zone if empty */}
      {components.length === 0 && (
        <div className="flex-1 w-full flex items-center justify-center border-2 border-dashed border-white/20 text-white/50 m-4 rounded-lg p-10">
          Arrastra componentes desde el panel izquierdo hacia aquí
        </div>
      )}
    </div>
  );
}
