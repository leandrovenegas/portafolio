const fs = require('fs');

let code = fs.readFileSync('app/admin/editor/page.js', 'utf8');

// 1. Añadir import
const importStr = "import GridEditor from '@/components/page-builder/GridEditor';";
code = code.replace(importStr, importStr + "\nimport StructureTree from '../../../components/page-builder/StructureTree';");

// 2. Reemplazar la UI
const startMarker = '<div className="bg-bg border border-border rounded-xl p-3 shadow-sm">';
const endMarker = '</div>\n                  </div>\n                )}';

const startIndex = code.indexOf(startMarker, code.indexOf('Estructura de la Página') - 150);
if (startIndex !== -1) {
  // Find the exact end
  const endIndex = code.indexOf(endMarker, startIndex);
  if (endIndex !== -1) {
    const newUI = `
                  <div className="flex flex-col gap-4 h-full">
                    <StructureTree 
                      tree={components}
                      selectedId={selectedId}
                      onSelect={setSelectedId}
                      onRemove={removeComponent}
                      onClone={cloneComponent}
                      onMove={(sourceId, targetId, index) => {
                        setComponents(prev => performMove(prev, sourceId, targetId, index));
                      }}
                      onUpdateName={(id, name) => {
                        const updateNameRecursive = (tree) => tree.map(comp => {
                          if (comp.id === id) return { ...comp, name };
                          if (comp.children) return { ...comp, children: updateNameRecursive(comp.children) };
                          return comp;
                        });
                        setComponents(prev => updateNameRecursive(prev));
                      }}
                    />
                    
                    <div className="bg-bg border border-border rounded-xl p-3 shadow-sm mt-auto">
                      <select 
                        onChange={(e) => addComponent(e, null)} 
                        className="w-full p-2 border border-border rounded-lg text-xs bg-s1 text-ink hover:bg-s2 hover:border-accent focus:bg-s2 focus:border-accent transition-colors outline-none cursor-pointer font-medium" 
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-s1 text-ink">+ Añadir bloque</option>
                        {COMPONENT_DEFINITIONS.map(d => (
                          <option key={d.type} value={d.type} className="bg-s1 text-ink">{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
`;
    code = code.substring(0, startIndex) + newUI.trim() + code.substring(endIndex + endMarker.length);
  }
}

// 3. Remove draggedIndex state to clean up (optional)
code = code.replace(/const \[draggedIndex, setDraggedIndex\] = useState\(null\);\n/g, '');
code = code.replace(/const \[dragOverIndex, setDragOverIndex\] = useState\(null\);\n/g, '');
code = code.replace(/const \[editingNameId, setEditingNameId\] = useState\(null\);\n/g, '');

fs.writeFileSync('app/admin/editor/page.js', code);
console.log('UI Refactored');
