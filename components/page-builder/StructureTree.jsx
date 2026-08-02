import React, { useState } from 'react';
import { COMPONENT_DEFINITIONS } from './registry';

// Componente recursivo para cada nodo del árbol
function StructureTreeNode({ 
  node, 
  depth = 0, 
  selectedId, 
  onSelect, 
  onRemove, 
  onClone, 
  onUpdateName,
  draggedId,
  setDraggedId,
  dragOverId,
  setDragOverId,
  onDropNode,
  activeBp,
  onToggleVisibility
}) {
  const [editingName, setEditingName] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const def = COMPONENT_DEFINITIONS.find(d => d.type === node.type);
  const displayName = node.name || def?.name || node.type;
  const isSelected = selectedId === node.id;
  const isDragged = draggedId === node.id;
  const isDragOver = dragOverId === node.id;
  const hasChildren = node.children && node.children.length > 0;
  const canHaveChildren = node.type === 'ContainerSection';
  const isHidden = node._layout?.[activeBp]?.hidden || false;

  const handleDragStart = (e) => {
    e.stopPropagation();
    setDraggedId(node.id);
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedId && draggedId !== node.id) {
      setDragOverId(node.id);
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragOverId === node.id) {
      setDragOverId(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(null);
    const sourceId = e.dataTransfer.getData('text/plain');
    
    if (sourceId && sourceId !== node.id) {
      // Si soltamos SOBRE un contenedor, el intent es meterlo DENTRO del contenedor al final.
      // Si soltamos sobre un nodo normal, el intent es ponerlo DEBAJO de ese nodo en el mismo padre.
      // Para simplificar: Si es Container, lo metemos dentro. Si no, lo metemos como hermano.
      if (canHaveChildren && isExpanded) {
        onDropNode(sourceId, node.id, -1); // -1 significa al final
      } else {
        // Aquí necesitaríamos saber el parentId de `node` para insertarlo como hermano.
        // Pero simplificando: emitimos un evento especial 'sibling'
        onDropNode(sourceId, 'sibling', node.id); 
      }
    }
    setDraggedId(null);
  };

  return (
    <div className="flex flex-col">
      <div
        draggable={!editingName}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragEnd={() => setDraggedId(null)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setEditingName(true);
        }}
        className={`relative flex items-center justify-between p-2 border-b border-border transition-all select-none cursor-pointer
          ${isSelected ? 'bg-accent/10 border-accent/50' : 'hover:bg-s2'}
          ${isDragged ? 'opacity-40' : 'opacity-100'}
          ${isDragOver ? 'ring-2 ring-accent ring-inset' : ''}
        `}
        style={{ paddingLeft: `${(depth * 12) + 8}px` }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {canHaveChildren ? (
            <button 
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
              className="w-4 h-4 flex items-center justify-center text-muted hover:text-ink transition-colors focus:outline-none"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          ) : (
            <div className="w-4 h-4 flex items-center justify-center text-muted/30">
              <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
            </div>
          )}

          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-muted/50 flex-shrink-0 cursor-grab active:cursor-grabbing">
            <circle cx="8" cy="6" r="1.5"/><circle cx="16" cy="6" r="1.5"/><circle cx="8" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/><circle cx="8" cy="18" r="1.5"/><circle cx="16" cy="18" r="1.5"/>
          </svg>
          
          {editingName ? (
            <input
              type="text"
              autoFocus
              defaultValue={displayName}
              className="flex-1 min-w-0 bg-s1 text-xs border border-accent rounded px-1 py-0.5 outline-none"
              onBlur={(e) => {
                const val = e.target.value.trim();
                if (val) onUpdateName(node.id, val);
                setEditingName(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = e.currentTarget.value.trim();
                  if (val) onUpdateName(node.id, val);
                  setEditingName(false);
                } else if (e.key === 'Escape') {
                  setEditingName(false);
                }
              }}
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <span className={`text-xs truncate font-medium ${isSelected ? 'text-accent' : 'text-ink'} ${isHidden ? 'opacity-50 line-through' : ''}`}>
              {displayName}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 sm:opacity-100">
          <button onClick={(e) => { e.stopPropagation(); onToggleVisibility(node.id); }} className={`p-1 rounded transition-colors ${isHidden ? 'text-muted hover:text-ink' : 'text-ink hover:text-muted'}`} title={isHidden ? "Mostrar capa" : "Ocultar capa"}>
            {isHidden ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            )}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onClone(node.id); }} className="p-1 hover:bg-border rounded text-muted hover:text-ink transition-colors" title="Duplicar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onRemove(node.id); }} className="p-1 hover:bg-red-500/20 rounded text-muted hover:text-red-500 transition-colors" title="Eliminar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>

      {canHaveChildren && isExpanded && (
        <div className="flex flex-col border-l border-border/50 ml-4">
          {hasChildren ? (
            node.children.map(child => (
              <StructureTreeNode 
                key={child.id} 
                node={child} 
                depth={depth + 1} 
                selectedId={selectedId} 
                onSelect={onSelect}
                onRemove={onRemove}
                onClone={onClone}
                onUpdateName={onUpdateName}
                draggedId={draggedId}
                setDraggedId={setDraggedId}
                dragOverId={dragOverId}
                setDragOverId={setDragOverId}
                onDropNode={onDropNode}
                activeBp={activeBp}
                onToggleVisibility={onToggleVisibility}
              />
            ))
          ) : (
            <div 
              className={`text-[10px] text-muted/50 py-3 px-4 italic bg-s1/50 border-b border-border/50 flex items-center gap-2 ${isDragOver ? 'ring-2 ring-accent inset-0' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              Arrastra componentes aquí
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function StructureTree({ 
  tree, 
  selectedId, 
  onSelect, 
  onRemove, 
  onClone, 
  onMove, 
  onUpdateName,
  activeBp,
  onToggleVisibility
}) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [isRootDragOver, setIsRootDragOver] = useState(false);

  // Ordenar nodos por zIndex descendente para que arriba = capa superior
  const getSortedTree = (nodes) => {
    return [...nodes].sort((a, b) => {
      const zA = a._layout?.[activeBp]?.zIndex || 1;
      const zB = b._layout?.[activeBp]?.zIndex || 1;
      return zB - zA;
    });
  };

  const sortedTree = getSortedTree(tree);

  const handleRootDrop = (e) => {
    e.preventDefault();
    setIsRootDragOver(false);
    const sourceId = e.dataTransfer.getData('text/plain');
    if (sourceId) {
      onMove(sourceId, null, -1); // null parentId = root
    }
  };

  return (
    <div 
      className={`flex flex-col border border-border rounded-xl bg-bg shadow-sm overflow-hidden flex-1 ${isRootDragOver ? 'ring-2 ring-accent' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsRootDragOver(true);
      }}
      onDragLeave={() => setIsRootDragOver(false)}
      onDrop={handleRootDrop}
    >
      <div className="bg-s2 border-b border-border p-3 sticky top-0 z-10 flex items-center justify-between">
        <h3 className="text-xs font-bold text-muted uppercase tracking-widest">Capas</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        {sortedTree.map(node => (
          <StructureTreeNode 
            key={node.id} 
            node={node} 
            selectedId={selectedId} 
            onSelect={onSelect}
            onRemove={onRemove}
            onClone={onClone}
            onUpdateName={onUpdateName}
            draggedId={draggedId}
            setDraggedId={setDraggedId}
            dragOverId={dragOverId}
            setDragOverId={setDragOverId}
            onDropNode={onMove}
            activeBp={activeBp}
            onToggleVisibility={onToggleVisibility}
          />
        ))}
        {sortedTree.length === 0 && (
          <div className="p-8 text-center text-xs text-muted">
            No hay componentes.<br/>Añade uno usando el selector abajo.
          </div>
        )}
      </div>
    </div>
  );
}
