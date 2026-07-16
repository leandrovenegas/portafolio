/**
 * treeHelpers.js
 * Utilidades puras para manejar el estado del Árbol de Componentes
 */

export function migrateToTreeStructure(components) {
  if (!Array.isArray(components)) return [];
  
  let currentY = { desktop: 0, tablet: 0, mobile: 0 };

  return components.map(comp => {
    const updatedComp = { ...comp };
    
    if (updatedComp.layout) {
      const migratedLayout = { ...updatedComp.layout };
      ['desktop', 'tablet'].forEach(bp => {
        if (migratedLayout[bp]) {
          let l = migratedLayout[bp];
          if (l.w === 12 && l.x === 0) {
            migratedLayout[bp] = { ...l, w: 24 };
          }
        }
      });
      updatedComp.layout = migratedLayout;
    }

    // Migración a _layout (Photoshop style) con posición fallback
    if (!updatedComp._layout) {
       const oldL = updatedComp.layout || {};
       updatedComp._layout = {
         desktop: oldL.desktop ? { ...oldL.desktop, zIndex: 1 } : { x: 0, y: currentY.desktop, w: 24, h: 4, zIndex: 1 },
         tablet: oldL.tablet ? { ...oldL.tablet, zIndex: 1 } : { x: 0, y: currentY.tablet, w: 24, h: 4, zIndex: 1 },
         mobile: oldL.mobile ? { ...oldL.mobile, zIndex: 1 } : { x: 0, y: currentY.mobile, w: 12, h: 4, zIndex: 1 }
       };
       currentY.desktop += updatedComp._layout.desktop.h;
       currentY.tablet += updatedComp._layout.tablet.h;
       currentY.mobile += updatedComp._layout.mobile.h;
    }

    if (comp.children) {
      return {
        ...updatedComp,
        children: migrateToTreeStructure(comp.children)
      };
    }
    return {
      ...updatedComp,
      children: [] 
    };
  });
}

export function findComponent(tree, id) {
  for (let comp of tree) {
    if (comp.id === id) return comp;
    if (comp.children && comp.children.length > 0) {
      const found = findComponent(comp.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function updateComponentProp(tree, id, propKey, value) {
  return tree.map(comp => {
    if (comp.id === id) {
      return { ...comp, props: { ...comp.props, [propKey]: value } };
    }
    if (comp.children) {
      return { ...comp, children: updateComponentProp(comp.children, id, propKey, value) };
    }
    return comp;
  });
}

export function removeComponentFromTree(tree, id) {
  return tree.filter(comp => comp.id !== id).map(comp => {
    if (comp.children) {
      return { ...comp, children: removeComponentFromTree(comp.children, id) };
    }
    return comp;
  });
}

export function cloneComponentInTree(tree, id) {
  let cloned = false;
  const newTree = tree.reduce((acc, comp) => {
    acc.push(comp);
    if (comp.id === id) {
      const clonedComp = JSON.parse(JSON.stringify(comp));
      clonedComp.id = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 5);
      clonedComp.instanceId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 5);
      acc.push(clonedComp);
      cloned = true;
    }
    return acc;
  }, []);

  if (cloned) return newTree;

  return tree.map(comp => {
    if (comp.children) {
      return { ...comp, children: cloneComponentInTree(comp.children, id) };
    }
    return comp;
  });
}

export function addComponentToTree(tree, newComp, parentId = null) {
  if (!parentId) {
    return [...tree, newComp];
  }
  return tree.map(comp => {
    if (comp.id === parentId) {
      return { ...comp, children: [...(comp.children || []), newComp] };
    }
    if (comp.children) {
      return { ...comp, children: addComponentToTree(comp.children, newComp, parentId) };
    }
    return comp;
  });
}

export function updateGridLayout(tree, parentId, allLayouts) {
  const updateLayoutsForArray = (arr) => {
    return arr.map(comp => {
      const dL = allLayouts.desktop?.find(l => l.i === comp.id);
      const tL = allLayouts.tablet?.find(l => l.i === comp.id);
      const mL = allLayouts.mobile?.find(l => l.i === comp.id);
      
      if (!dL && !tL && !mL) return comp;
      
      return {
        ...comp,
        _layout: {
          desktop: dL ? { x: dL.x, y: dL.y, w: dL.w, h: dL.h, zIndex: comp._layout?.desktop?.zIndex || 1 } : (comp._layout?.desktop || {x:0, y:0, w:24, h:4, zIndex:1}),
          tablet: tL ? { x: tL.x, y: tL.y, w: tL.w, h: tL.h, zIndex: comp._layout?.tablet?.zIndex || 1 } : (comp._layout?.tablet || {x:0, y:0, w:24, h:4, zIndex:1}),
          mobile: mL ? { x: mL.x, y: mL.y, w: mL.w, h: mL.h, zIndex: comp._layout?.mobile?.zIndex || 1 } : (comp._layout?.mobile || {x:0, y:0, w:12, h:4, zIndex:1}),
        }
      };
    });
  };

  if (!parentId) {
    // Si parentId es null, es la grilla principal
    return updateLayoutsForArray(tree);
  }

  // Si hay parentId, buscar ese contenedor y actualizar sus hijos
  return tree.map(comp => {
    if (comp.id === parentId) {
      return { ...comp, children: updateLayoutsForArray(comp.children || []) };
    }
    if (comp.children) {
      return { ...comp, children: updateGridLayout(comp.children, parentId, allLayouts) };
    }
    return comp;
  });
}

// [OBSOLETO - 2026-07-14] Fuerza el apilamiento vertical que bloquea el canvas libre
function calculateNextAvailablePosition(children, bp, originalW) {
  const MAX_COLS = { desktop: 24, tablet: 24, mobile: 12 };
  const cols = MAX_COLS[bp] || 24;
  
  const safeW = Math.min(originalW, cols);

  if (!children || children.length === 0) return { x: 0, y: 0, w: safeW };
  
  const maxY = children.reduce((max, child) => {
    const layout = child.layout?.[bp];
    return layout ? Math.max(max, layout.y + layout.h) : max;
  }, 0);
  
  return { x: 0, y: maxY, w: safeW };
}

// Extrae un componente del árbol y retorna [árbol_sin_componente, componente_extraido]
function extractComponent(tree, id) {
  let extracted = null;
  const newTree = tree.filter(comp => {
    if (comp.id === id) {
      extracted = comp;
      return false;
    }
    return true;
  }).map(comp => {
    if (comp.children && !extracted) {
      const [childTree, childExtracted] = extractComponent(comp.children, id);
      if (childExtracted) {
        extracted = childExtracted;
        return { ...comp, children: childTree };
      }
    }
    return comp;
  });
  return [newTree, extracted];
}

export function moveComponentInTree(tree, sourceId, targetParentId, dropIndex = -1) {
  // 1. Extraer el componente origen
  const [treeWithoutSource, sourceComp] = extractComponent(tree, sourceId);
  if (!sourceComp) return tree; // No se encontró

  // 2. [OBSOLETO - 2026-07-14] La lógica de recalcular posición según siblings/stack
  // se remueve porque ahora _layout determina coordenadas absolutas (Photoshop style)
  const newComp = { ...sourceComp };

  // 3. Insertar el componente en el destino
  const insertIntoArray = (arr, item, idx) => {
    const res = [...arr];
    if (idx >= 0 && idx <= res.length) res.splice(idx, 0, item);
    else res.push(item);
    return res;
  };

  if (!targetParentId) {
    return insertIntoArray(treeWithoutSource, newComp, dropIndex);
  }

  return treeWithoutSource.map(comp => {
    if (comp.id === targetParentId) {
      return { ...comp, children: insertIntoArray(comp.children || [], newComp, dropIndex) };
    }
    if (comp.children) {
      const [childTree, _] = extractComponent([comp], 'dummy'); // Solo para iterar
      // Realmente necesitamos recursividad para la inserción
    }
    return comp;
  });
}

// Inserción recursiva helper
export function insertComponentIntoParent(tree, compToInsert, targetParentId, dropIndex = -1) {
  if (!targetParentId) {
    const res = [...tree];
    if (dropIndex >= 0 && dropIndex <= res.length) res.splice(dropIndex, 0, compToInsert);
    else res.push(compToInsert);
    return res;
  }
  return tree.map(comp => {
    if (comp.id === targetParentId) {
      const res = [...(comp.children || [])];
      if (dropIndex >= 0 && dropIndex <= res.length) res.splice(dropIndex, 0, compToInsert);
      else res.push(compToInsert);
      return { ...comp, children: res };
    }
    if (comp.children) {
      return { ...comp, children: insertComponentIntoParent(comp.children, compToInsert, targetParentId, dropIndex) };
    }
    return comp;
  });
}

export function performMove(tree, sourceId, targetParentId, dropIndex = -1) {
  const [treeWithoutSource, sourceComp] = extractComponent(tree, sourceId);
  if (!sourceComp) return tree;

  const newComp = { ...sourceComp };
  
  // [OBSOLETO - 2026-07-14] Removido recálculo de posición vertical
  /*
  const targetParent = targetParentId ? findComponent(treeWithoutSource, targetParentId) : null;
  const siblings = targetParent ? (targetParent.children || []) : treeWithoutSource;

  newComp.layout = {
    desktop: { ...newComp.layout?.desktop, ...calculateNextAvailablePosition(siblings, 'desktop', newComp.layout?.desktop?.w || 24) },
    tablet: { ...newComp.layout?.tablet, ...calculateNextAvailablePosition(siblings, 'tablet', newComp.layout?.tablet?.w || 24) },
    mobile: { ...newComp.layout?.mobile, ...calculateNextAvailablePosition(siblings, 'mobile', newComp.layout?.mobile?.w || 12) }
  };
  */

  return insertComponentIntoParent(treeWithoutSource, newComp, targetParentId, dropIndex);
}

export function recalculateZIndices(tree, bp) {
  // Cuando se llama a esta función, el array `tree` ya refleja el orden deseado visualmente.
  // Por lo tanto, el primer elemento (index 0) debe tener el mayor zIndex.
  const total = tree.length;
  return tree.map((comp, index) => {
    const newComp = { ...comp };
    if (!newComp._layout) newComp._layout = {};
    if (!newComp._layout[bp]) newComp._layout[bp] = { x: 0, y: 0, w: 12, h: 4, zIndex: 1 };
    
    newComp._layout = {
      ...newComp._layout,
      [bp]: {
        ...newComp._layout[bp],
        zIndex: total - index
      }
    };

    if (comp.children) {
      newComp.children = recalculateZIndices(comp.children, bp);
    }
    return newComp;
  });
}

export function toggleComponentVisibility(tree, id, bp) {
  return tree.map(comp => {
    if (comp.id === id) {
      const newComp = { ...comp };
      if (!newComp._layout) newComp._layout = {};
      if (!newComp._layout[bp]) newComp._layout[bp] = { x: 0, y: 0, w: 12, h: 4, zIndex: 1 };
      
      newComp._layout = {
        ...newComp._layout,
        [bp]: {
          ...newComp._layout[bp],
          hidden: !newComp._layout[bp].hidden
        }
      };
      return newComp;
    }
    if (comp.children) {
      return { ...comp, children: toggleComponentVisibility(comp.children, id, bp) };
    }
    return comp;
  });
}
