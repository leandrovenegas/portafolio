const fs = require('fs');

const code = fs.readFileSync('app/admin/editor/page.js', 'utf8');
const lines = code.split('\n');

const saveSuccessIndex = lines.findIndex(l => l.includes('const [saveSuccess, setSaveSuccess] = useState('));

if (saveSuccessIndex !== -1) {
  const insertLines = [
    "  const [newVersionName, setNewVersionName] = useState('');",
    "  ",
    "  const [focusedField, setFocusedField] = useState(null);",
    "",
    "  const [showSwatches, setShowSwatches] = useState(false);",
    "  const [showStyles, setShowStyles] = useState(false);",
    "  const [showHistory, setShowHistory] = useState(false);",
    "  const [showTypography, setShowTypography] = useState(false);",
    "  const [menuOpen, setMenuOpen] = useState(false);",
    "  ",
    "  const [clipboardStyle, setClipboardStyle] = useState(null);",
    "",
    "  const [history, setHistory] = useState([]);"
  ];
  
  lines.splice(saveSuccessIndex + 1, 0, ...insertLines);
  
  fs.writeFileSync('app/admin/editor/page.js', lines.join('\n'));
  console.log("Restored deleted lines safely.");
} else {
  console.log("Could not find insertion point.");
}
