const fs = require('fs');
let code = fs.readFileSync('app/admin/editor/page.js', 'utf8');

const brokenStr = `          <div className="flex-1 w-full h-full relative overflow-y-auto" style={{
            backgroundImage: \`radial-gradient(var(--ps-border) 1px, transparent 1px)\`,
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-s1/90 backdrop-blur border border-border shadow-2xl px-3 py-2 rounded-full flex items-center gap-3">`;

const fixedStr = `          <div className="flex-1 w-full h-full relative overflow-y-auto" style={{
            backgroundImage: \`radial-gradient(var(--ps-border) 1px, transparent 1px)\`,
            backgroundSize: \`20px 20px\`
          }}>
            
            {/* Floating Device Switcher & Info */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-s1/90 backdrop-blur border border-border shadow-2xl px-3 py-2 rounded-full flex items-center gap-3">`;

if (code.includes(brokenStr)) {
  code = code.replace(brokenStr, fixedStr);
  fs.writeFileSync('app/admin/editor/page.js', code);
  console.log("Fixed syntax error.");
} else {
  console.log("Could not find broken string.");
}
