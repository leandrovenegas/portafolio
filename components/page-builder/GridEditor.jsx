'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


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
  const { width, containerRef, mounted } = useContainerWidth();
  const wrapperRef = useRef(null);

  const colsCount = forceBp === 'mobile' ? 12 : 24;

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

  // ── Layout — SIN activeGridId en deps para no relayouting al entrar en modo edición ─
  const generateLayout = (bp) => {
    return components.map(comp => {
      let l = comp._layout?.[bp];
      if (!l) {
        l = comp.layout?.[bp] || { x: 0, y: 0, w: 24, h: 4, zIndex: 1 };
      }
      return {
        i: comp.id,
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
        minW: 2,
        minH: 1,
      };
    });
  };

  // Solo regenerar el layout cuando cambian los componentes, no cuando cambia activeGridId
  const layouts = useMemo(() => ({
    desktop: generateLayout('desktop'),
    tablet: generateLayout('tablet'),
    mobile: generateLayout('mobile')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [components]);

  const handleLayoutChange = (currentLayout, allLayouts) => {
    if (onLayoutChange) {
      if (parentId) {
        onLayoutChange(parentId, allLayouts);
      } else {
        onLayoutChange(null, allLayouts);
      }
    }
  };

  return (
    <div 
      ref={(el) => { containerRef.current = el; wrapperRef.current = el; }}
      className="w-full h-full relative" 
      style={{ minHeight: '800px' }}
    >
      {showGridDebug && mounted && (
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${colsCount}, 1fr)`,
            gridAutoRows: `30px`,
            gap: '10px',
            padding: '10px',
            opacity: 0.15,
          }}
        >
          {Array.from({ length: colsCount * 30 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-accent border-dashed" 
              style={{ borderRadius: '2px' }} 
            />
          ))}
        </div>
      )}
      {mounted && (
        <ResponsiveGridLayout
          width={width}
          className="layout"
          layouts={layouts}
          breakpoints={{ desktop: 1024, tablet: 768, mobile: 0 }}
          cols={{ desktop: 24, tablet: 24, mobile: 12 }}
          rowHeight={30}
          onLayoutChange={handleLayoutChange}
          // Sólo la grid activa puede arrastrar/redimensionar
          isDraggable={isInteractive && !activeChildId}
          isResizable={isInteractive && !activeChildId}
          useCSSTransforms={true}
          compactType={null}
          preventCollision={false}
          allowOverlap={true}
          onDrop={(layout, item, e) => {
            if (!isInteractive || activeChildId) return;
            const type = e.dataTransfer.getData('text/plain');
            if (type && onDropComponent) {
               onDropComponent(type, { x: item.x, y: item.y, w: item.w, h: item.h }, parentId);
            }
          }}
          dropConfig={{ enabled: isInteractive && !activeChildId, defaultItem: { w: 24, h: 4 } }}
          draggableHandle=".drag-handle"
          draggableCancel=".no-drag, input, textarea, button, select, a, [contenteditable]"
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
          // ¿Tiene drag handle interno?
          const hasInternalDragHandle = comp.type === 'AvatarTextSection';
          
          let currentLayout = comp._layout?.[forceBp] || comp.layout?.[forceBp] || { x: 0, y: 0, w: 24, h: 4, zIndex: 1 };

          return (
            <div 
              key={comp.id}
              style={{
                zIndex: comp._layout?.[forceBp]?.zIndex || 1,
                ...(isEditingInternally ? { pointerEvents: 'none' } : {}),
                ...(isHidden ? { opacity: 0, pointerEvents: 'none', visibility: 'hidden' } : {})
              }}
              className={`relative group bg-transparent transition-opacity duration-150
                ${!hasInternalDragHandle ? 'drag-handle' : ''}
                ${isLockedByOther ? 'opacity-30 pointer-events-none' : 'opacity-100'}
                ${isEditingInternally
                  ? 'ring-2 ring-accent/50 ring-inset z-30'
                  : isSelected && !activeChildId
                    ? 'ring-4 ring-accent ring-inset z-30'
                    : !isEditingInternally && !activeChildId
                      ? 'hover:ring-2 hover:ring-accent/40 hover:ring-inset z-20 border border-dashed border-border'
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

              {/* Badge "Hover" — fuera del flujo, visible solo on hover cuando no está seleccionado */}
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
              
              {/* Badge "Debug Grid" superpuesto para mostrar coordenadas y medidas (Objetivo 1) */}
              {showGridDebug && (
                <div className="absolute top-2 left-2 pointer-events-none z-[90] flex items-center justify-center">
                  <div className="bg-bg/95 border border-border text-accent px-2 py-1 rounded text-[9px] font-mono shadow-md uppercase">
                    X:{currentLayout.x} Y:{currentLayout.y} W:{currentLayout.w} H:{currentLayout.h} Z:{currentLayout.zIndex || 1}
                  </div>
                </div>
              )}
              
              {/* Contenido del componente — detiene propagación de eventos para aislar la capa */}
              <div 
                className="w-full h-full overflow-hidden"
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
      </ResponsiveGridLayout>
      )}
    </div>
  );
}
