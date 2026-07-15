const fs = require('fs');

function stitch() {
  const transcriptPath = 'C:/Users/rayan/.gemini/antigravity/brain/ae874839-626e-49d0-a534-17ff832b103e/.system_generated/logs/transcript_full.jsonl';
  const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');

  let fileLines = new Array(1100).fill(null);
  
  for (let line of lines) {
    if (!line) continue;
    try {
      const obj = JSON.parse(line);
      // Look for VIEW_FILE outputs
      if (obj.type === 'VIEW_FILE' && obj.content && obj.content.includes('file:///z:/proyects/portafolio/app/admin/editor/page.js')) {
        const text = obj.content;
        const matches = [...text.matchAll(/^(\d+):\s(.*)$/gm)];
        for (let match of matches) {
          const num = parseInt(match[1]);
          const code = match[2];
          fileLines[num] = code;
        }
      }
    } catch (e) {}
  }

  const output = [];
  let maxLine = 0;
  for (let i = 1; i < fileLines.length; i++) {
    if (fileLines[i] !== null) {
      output.push(fileLines[i]);
      maxLine = i;
    } else {
      if (i < maxLine) {
         output.push('// MISSING LINE ' + i);
      }
    }
  }

  fs.writeFileSync('scratch/stitched_page.js', output.join('\n'));
  console.log('Stitched up to line', maxLine);
}

stitch();
