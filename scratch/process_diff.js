const fs = require('fs');

const diffText = fs.readFileSync('scratch/last_diff.txt', 'utf8');
const lines = diffText.split('\n');

let isDiff = false;
let recoveredLines = [];

for (const line of lines) {
  if (line.includes('@@ -40,937 +40,6 @@')) {
    isDiff = true;
    continue;
  }
  
  if (isDiff) {
    if (line.startsWith('@@')) break;
    if (line.startsWith('[diff_block_end]')) break;
    
    if (line.startsWith('-')) {
      recoveredLines.push(line.substring(1));
    } else if (line.startsWith(' ')) {
      recoveredLines.push(line.substring(1));
    } else if (line === '') {
      recoveredLines.push('');
    }
  }
}

fs.writeFileSync('scratch/recovered_code.js', recoveredLines.join('\n'));
console.log("Recovered lines:", recoveredLines.length);
