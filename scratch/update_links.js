const fs = require('fs');
const path = require('path');

function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
                processDirectory(fullPath);
            }
        } else {
            if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.mdx')) {
                let content = fs.readFileSync(fullPath, 'utf8');
                let newContent = content.replace(/\/organizaciones\//g, '/portafolio/');
                newContent = newContent.replace(/\/proyectos\//g, '/portafolio/');
                if (content !== newContent) {
                    fs.writeFileSync(fullPath, newContent, 'utf8');
                    console.log(`Updated ${fullPath}`);
                }
            }
        }
    }
}

processDirectory(path.join(__dirname, '..', 'app'));
processDirectory(path.join(__dirname, '..', 'components'));
