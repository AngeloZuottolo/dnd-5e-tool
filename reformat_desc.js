const fs = require('fs');

// ====== 1. Read source data ======
const itData = JSON.parse(fs.readFileSync('spells_it.json', 'utf8'));

const buildJs = fs.readFileSync('build-app.js', 'utf8');
const nameMatch = buildJs.match(/const I18N = \{[\s\S]*?spellNames:\s*\{([\s\S]*?)\},\n/s);
if (!nameMatch) { console.error('Could not find spellNames in build-app.js'); process.exit(1); }

const nameBlock = nameMatch[1];
const nameLines = nameBlock.split('\n');
const enToIt = {};
for (const line of nameLines) {
  const m = line.match(/['"]([^'"]+)['"]:\s*['"]([^'"]+)['"]/);
  if (m) enToIt[m[1]] = m[2];
}

const itToEn = {};
for (const [en, it] of Object.entries(enToIt)) {
  itToEn[it.toLowerCase()] = en;
}

// ====== 2. Format a description ======
function joinParts(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return '';
  return arr.map(item => item.text || '').join('');
}

function formatText(raw) {
  // Clean up: remove SRD footer markers
  let t = raw.replace(/Systems Reference Document 5\.1 \d+/g, '');
  // Convert markdown: **bold** → <strong>, *italic* → <em>
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Newlines: \n\n → <br><br>, single \n → <br>
  t = t.replace(/\n\s*\n/g, '<br><br>');
  t = t.replace(/\n/g, '<br>');
  // Collapse multiple spaces
  t = t.replace(/ +/g, ' ');
  // Trim
  t = t.trim();
  return t;
}

const descIT = {};
const hlIT = {};
let matched = 0;
const unmatched = [];

for (const spell of itData) {
  const enName = itToEn[spell.name.toLowerCase()] || 
                 itToEn[spell.name.toLowerCase().replace(/\s+/g, ' ')];
  if (!enName) {
    unmatched.push(spell.name + ' (id: ' + spell.id + ')');
    continue;
  }

  const desc = formatText(joinParts(spell.description));
  if (desc) { descIT[enName] = desc; matched++; }

  const hl = formatText(joinParts(spell.at_higher_levels));
  if (hl) { hlIT[enName] = hl; }
}

console.error('Matched:', matched, 'descriptions');
console.error('Unmatched:', unmatched.length);

// ====== 3. Generate JS code ======
function toJs(obj, varName) {
  const keys = Object.keys(obj);
  let out = 'const ' + varName + ' = {\n';
  for (const key of keys) {
    const val = obj[key]
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"');
    out += '  "' + key + '": "' + val + '",\n';
  }
  out = out.replace(/,\n$/, '\n');
  out += '};\n';
  return out;
}

const newDescIt = toJs(descIT, 'DESC_IT');
const newDescHl = toJs(hlIT, 'DESC_HL_IT');

// ====== 4. Inject into index.html ======
const html = fs.readFileSync('index.html', 'utf8');

const ditStart = html.indexOf('const DESC_IT = {');
const dhlStart = html.indexOf('// === DESC_HL_IT ===');
const dhlEnd = html.indexOf('};', html.indexOf('const DESC_HL_IT = {', dhlStart)) + 2;

if (ditStart === -1 || dhlStart === -1 || dhlEnd < ditStart) {
  console.error('Could not find DESC_IT/DESC_HL_IT markers');
  process.exit(1);
}

const before = html.substring(0, ditStart);
const after = html.substring(dhlEnd + 1);

const outHtml = before + newDescIt + '\n// === DESC_HL_IT ===\n' + newDescHl + after;

fs.writeFileSync('index.html', outHtml, 'utf8');
console.error('Injected: ' + Object.keys(descIT).length + ' + ' + Object.keys(hlIT).length + ' entries');
