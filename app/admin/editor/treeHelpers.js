/**
 * treeHelpers.js
 * Utilidades puras para manejar el estado del Árbol de Componentes
 */

export function migrateToTreeStructure(components) {
  if (!Array.isArray(components)) return [];
  
  return components.map((comp, index) => {
    const updatedComp = { ...comp };
    
    // Cleanup of old layout data - only keep zIndex and hidden
    if (!updatedComp._layout) {
       const oldL = updatedComp.layout || {};
       updatedComp._layout = {
         desktop: oldL.desktop ? { zIndex: oldL.desktop.zIndex || 1, hidden: !!oldL.desktop.hidden } : { zIndex: 1, hidden: false },
         tablet: oldL.tablet ? { zIndex: oldL.tablet.zIndex || 1, hidden: !!oldL.tablet.hidden } : { zIndex: 1, hidden: false },
         mobile: oldL.mobile ? { zIndex: oldL.mobile.zIndex || 1, hidden: !!oldL.mobile.hidden } : { zIndex: 1, hidden: false }
       };
    } else {
       ['desktop', 'tablet', 'mobile'].forEach(bp => {
         if (updatedComp._layout[bp]) {
           const l = updatedComp._layout[bp];
           updatedComp._layout[bp] = { zIndex: l.zIndex || 1, hidden: !!l.hidden };
         } else {
           updatedComp._layout[bp] = { zIndex: 1, hidden: false };
         }
       });
    }
    
    // Remove old layout object completely
    if (updatedComp.layout) {
      delete updatedComp.layout;
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
  // Legacy stub to prevent crashes if this function is called anywhere.
  // We no longer use react-grid-layout.
  return tree;
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
  return insertComponentIntoParent(treeWithoutSource, newComp, targetParentId, dropIndex);
}

export function recalculateZIndices(tree, bp) {
  const total = tree.length;
  return tree.map((comp, index) => {
    const newComp = { ...comp };
    if (!newComp._layout) newComp._layout = {};
    if (!newComp._layout[bp]) newComp._layout[bp] = { zIndex: 1, hidden: false };
    
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
      if (!newComp._layout[bp]) newComp._layout[bp] = { zIndex: 1, hidden: false };
      
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
