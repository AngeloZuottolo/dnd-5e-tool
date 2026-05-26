const fs = require('fs');

// Generate structured DESC_IT/DESC_HL_IT with <p> and <hr> from spells_it.json
const src = 'spells_it.json';
if (!fs.existsSync(src)) {
  console.error('spells_it.json not found');
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(src, 'utf8'));

// Load build-app.js for name mapping
const build = fs.readFileSync('build-app.js', 'utf8');
const nameMatch = build.match(/const I18N = \{[\s\S]*?spellNames:\s*\{([\s\S]*?)\},\n/s);
if (!nameMatch) { console.error('spellNames mapping not found in build-app.js'); process.exit(1); }
const block = nameMatch[1];
const lines = block.split('\n');
const enToIt = {};
for (const l of lines) {
  const m = l.match(/['\"]([^'\"]+)['\"]:\s*['\"]([^'\"]+)['\"]/);
  if (m) enToIt[m[1]] = m[2];
}
const itToEn = {};
for (const [en, it] of Object.entries(enToIt)) itToEn[it.toLowerCase()] = en;

function joinParts(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return '';
  return arr.map(i => (i.text || '')).join('');
}

function formatToHtml(raw) {
  if (!raw) return '';
  // normalize newlines
  let t = raw.replace(/\r/g, '');
  // collapse spaces
  t = t.replace(/ +/g, ' ');
  // Replace double newlines with paragraph separators
  t = t.replace(/\n\s*\n+/g, '\n\n');
  // Split paragraphs
  const paras = t.split(/\n\n/).map(p => p.trim()).filter(Boolean);
  const html = paras.map(p => p.replace(/\n/g, '<br>')).map(p => '<p>' + p + '</p>').join('<hr class="desc-sep">');
  return html;
}

const desc = {};
const hl = {};
let matched = 0;
for (const s of data) {
  const en = itToEn[s.name.toLowerCase()];
  if (!en) continue;
  const raw = joinParts(s.description);
  const rawHl = joinParts(s.at_higher_levels || []);
  const html = formatToHtml(raw);
  const hlhtml = formatToHtml(rawHl);
  if (html) { desc[en] = html; matched++; }
  if (hlhtml) hl[en] = hlhtml;
}

console.error('Matched', matched, 'descriptions');

function toJs(obj, varName) {
  let out = 'const ' + varName + ' = {\n';
  for (const k of Object.keys(obj)) {
    const v = obj[k].replace(/\\/g, '\\\\').replace(/\"/g, '\\"');
    out += '  "' + k + '": "' + v + '",\n';
  }
  if (out.endsWith(',\n')) out = out.slice(0, -2) + '\n';
  out += '};\n';
  return out;
}

const descJs = toJs(desc, 'DESC_IT');
const hlJs = toJs(hl, 'DESC_HL_IT');

// Inject into index.html
const htmlPath = 'index.html';
let html = fs.readFileSync(htmlPath, 'utf8');
const start = html.indexOf('const DESC_IT = {');
const mid = html.indexOf('// === DESC_HL_IT ===');
const end = html.indexOf('};', html.indexOf('const DESC_HL_IT = {')) + 2;
if (start === -1 || mid === -1 || end === -1) { console.error('Could not find blocks in index.html'); process.exit(1); }
const before = html.slice(0, start);
const after = html.slice(end + 1);
html = before + descJs + '\n// === DESC_HL_IT ===\n' + hlJs + after;
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Injected structured DESC_IT and DESC_HL_IT into', htmlPath);
