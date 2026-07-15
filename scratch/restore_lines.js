const fs = require('fs');

let code = fs.readFileSync('app/admin/editor/page.js', 'utf8');

const targetStr = `  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);`;

const replaceStr = `  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [newVersionName, setNewVersionName] = useState('');
  
  const [focusedField, setFocusedField] = useState(null);

  const [showSwatches, setShowSwatches] = useState(false);
  const [showStyles, setShowStyles] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showTypography, setShowTypography] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [clipboardStyle, setClipboardStyle] = useState(null);

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('app/admin/editor/page.js', code);
  console.log("Restored deleted lines.");
} else {
  console.log("Could not find target string.");
}
