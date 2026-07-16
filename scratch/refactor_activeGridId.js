const fs = require('fs');

let code = fs.readFileSync('app/admin/editor/page.js', 'utf8');

// 1. Add activeGridId state
code = code.replace(
  'const [selectedId, setSelectedId] = useState(null);',
  'const [selectedId, setSelectedId] = useState(null);\n  const [activeGridId, setActiveGridId] = useState(null); // null = root'
);

// 2. Add the button to exit grid and pass the props to GridEditor
// The GridEditor is rendered around line 970
const searchStr = `
            <div className="w-full h-full p-4 lg:p-8 xl:p-12 mx-auto" style={{ maxWidth: '1600px' }}>
              <GridEditor 
                components={components} 
                onLayoutChange={handleGridLayoutChange} 
                forceBp={previewBp}
                onSelectComponent={setSelectedId}
                selectedId={selectedId}
              />
            </div>`;

const replaceStr = `
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50 pointer-events-none">
              {activeGridId && (
                <button 
                  onClick={() => setActiveGridId(null)}
                  className="bg-accent text-bg px-4 py-1.5 rounded-full text-xs font-bold shadow-lg pointer-events-auto hover:bg-accent/90 transition-colors flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  Volver a Grid Principal
                </button>
              )}
            </div>
            <div className="w-full h-full p-4 lg:p-8 xl:p-12 mx-auto" style={{ maxWidth: '1600px' }}>
              <GridEditor 
                components={components} 
                onLayoutChange={handleGridLayoutChange} 
                forceBp={previewBp}
                onSelectComponent={setSelectedId}
                selectedId={selectedId}
                activeGridId={activeGridId}
                setActiveGridId={setActiveGridId}
              />
            </div>`;

if (code.includes(searchStr.trim())) {
  code = code.replace(searchStr.trim(), replaceStr.trim());
} else {
  console.log("Could not find GridEditor block.");
}

fs.writeFileSync('app/admin/editor/page.js', code);
console.log("activeGridId added.");
