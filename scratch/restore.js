const fs = require('fs');

const code = fs.readFileSync('app/admin/editor/page.js', 'utf8');
const lines = code.split('\n');
const recoveredLines = fs.readFileSync('scratch/recovered_code.js', 'utf8').split('\n');

const menuOpenIndex = lines.findIndex(l => l.includes('const [menuOpen, setMenuOpen] = useState(false);'));

if (menuOpenIndex !== -1) {
  // We want to insert recoveredLines right after menuOpenIndex
  // Wait, the bad replacement also added the 3 device lines in place of the deleted code?
  // No, the 3 device lines are ALREADY in the file from line 43 onwards.
  // The bad replacement just replaced lines 44-976 with NOTHING.
  // So we just insert the recovered lines after menuOpenIndex!
  
  lines.splice(menuOpenIndex + 1, 0, ...recoveredLines);
  
  fs.writeFileSync('app/admin/editor/page.js', lines.join('\n'));
  console.log("Restored successfully. New line count:", lines.length);
} else {
  console.log("Could not find insertion point.");
}
