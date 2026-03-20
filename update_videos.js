const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'public', 'content');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

let replacedCount = 0;

for (const file of files) {
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const videoRegex = /<video\b[^>]*>([\s\S]*?)<\/video>/gi;
  
  content = content.replace(videoRegex, (match, innerHtml) => {
    let srcMatch = match.match(/src="([^"]+)"/i);
    if (!srcMatch) srcMatch = match.match(/src=([^ >]+)/i);
    
    let typeMatch = match.match(/type="([^"]+)"/i);
    let titleMatch = match.match(/title="([^"]+)"/i);
    
    let src = srcMatch ? srcMatch[1].trim() : '';
    let typeAttr = typeMatch ? ` type="${typeMatch[1]}"` : ' type="video/mp4"';
    let titleAttr = titleMatch ? ` aria-label="${titleMatch[1]}"` : '';
    
    // Normalize self-closing/empty videos correctly
    replacedCount++;
    return `<div class="w-full max-w-full overflow-hidden rounded-lg bg-black shadow-lg aspect-video relative my-6">\n  <video controls class="w-full h-full object-contain"${titleAttr} preload="metadata">\n    <source src="${src}"${typeAttr}>\n  </video>\n</div>`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log(`Replaced ${replacedCount} video instances across Markdown files.`);
