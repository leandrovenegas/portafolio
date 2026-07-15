const fs = require('fs');

const line = fs.readFileSync('scratch/last_diff.txt', 'utf8');
const data = JSON.parse(line);
const content = data.content || data.output || (data.tool_calls ? data.tool_calls[0].args.Output : JSON.stringify(data));

// Now content is the string of the tool response
const lines = content.split('\n');

let isDiff = false;
let recoveredLines = [];

for (const l of lines) {
  if (l.includes('@@ -40,937 +40,6 @@')) {
    isDiff = true;
    continue;
  }
  
  if (isDiff) {
    if (l.startsWith('@@')) break;
    if (l.startsWith('[diff_block_end]')) break;
    if (l.startsWith('Please note that')) break;
    
    if (l.startsWith('-')) {
      recoveredLines.push(l.substring(1)); // strip the "-"
    } else if (l.startsWith(' ')) {
      recoveredLines.push(l.substring(1)); // strip the " "
    } else if (l === '') {
      recoveredLines.push('');
    }
  }
}

fs.writeFileSync('scratch/recovered_code.js', recoveredLines.join('\n'));
console.log("Recovered lines:", recoveredLines.length);
