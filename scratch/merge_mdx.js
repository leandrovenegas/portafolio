const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'app', 'content');

// 1. Merge Crazy Papa
let crazyMain = fs.readFileSync(path.join(contentDir, 'crazypapastudios.mdx'), 'utf8');
let crazyAudio = fs.readFileSync(path.join(contentDir, 'crazypapa-studios-audiovisual.mdx'), 'utf8');
let crazyProd = fs.readFileSync(path.join(contentDir, 'crazypapa-studios-productos.mdx'), 'utf8');

let newCrazyMain = crazyMain + '\n\n## Archivo Histórico y Contenido Rescatado\n\n### Sobre los Productos\n' + crazyProd + '\n\n### Archivo Audiovisual\n' + crazyAudio;
fs.writeFileSync(path.join(contentDir, 'crazypapastudios.mdx'), newCrazyMain);

// 2. Merge Incoludido
let incoMain = fs.readFileSync(path.join(contentDir, 'incoludido.mdx'), 'utf8');
let incoAudio = fs.readFileSync(path.join(contentDir, 'incoludido-audiovisual.mdx'), 'utf8');
let incoTv = fs.readFileSync(path.join(contentDir, 'incoludido-tv.mdx'), 'utf8');

let newIncoMain = incoMain + '\n\n## Archivo Histórico y Contenido Rescatado\n\n### Incoludido TV\n' + incoTv + '\n\n### Campaña Audiovisual y Padrinos\n' + incoAudio;
fs.writeFileSync(path.join(contentDir, 'incoludido.mdx'), newIncoMain);

// 3. Delete files
fs.unlinkSync(path.join(contentDir, 'crazypapa-studios-audiovisual.mdx'));
fs.unlinkSync(path.join(contentDir, 'crazypapa-studios-productos.mdx'));
fs.unlinkSync(path.join(contentDir, 'incoludido-audiovisual.mdx'));
fs.unlinkSync(path.join(contentDir, 'incoludido-tv.mdx'));

console.log("Merge completed and files deleted.");
