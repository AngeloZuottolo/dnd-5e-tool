const fs = require('fs');

// Read Italian SRD JSON
const itData = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

// Read the existing build-app.js
const buildJs = fs.readFileSync('build-app.js', 'utf8');

// Extract existing I18N.spellNames
const nameMatch = buildJs.match(/const I18N = \{[\s\S]*?spellNames:\s*\{([\s\S]*?)\},\n/s);
if (!nameMatch) { console.error('Could not find spellNames'); process.exit(1); }

const nameBlock = nameMatch[1];
const nameLines = nameBlock.split('\n');
const enToIt = {};
for (const line of nameLines) {
  const m = line.match(/['"]([^'"]+)['"]:\s*['"]([^'"]+)['"]/);
  if (m) enToIt[m[1]] = m[2];
}

// Build a mapping from Italian name (lowercased, normalized) to (enName, itSpell)
const itByName = {};
for (const spell of itData) {
  const normalized = spell.name.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  itByName[normalized] = spell;
}

// Match spells by normalizing both names
// For each EN spell, normalize the Italian name and try to find it in the Italian data
const itDescByEN = {};
const itHLByEN = {};
const fixedNames = {}; // EN → corrected IT name
const unmatched = [];

for (const [enName, itName] of Object.entries(enToIt)) {
  // Normalize the existing Italian name
  const normalizedExisting = itName.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  
  // Try exact match on normalized name
  let spell = itByName[normalizedExisting];
  
  // If not found, try matching by the English name translated to Italian conventions
  if (!spell) {
    // Try to find by checking if any Italian SRD name "contains" key parts
    const enWords = enName.toLowerCase().split(/[\s/]+/);
    for (const [normName, s] of Object.entries(itByName)) {
      // Check if most words match (simple overlap scoring)
      const itWords = normName.split(/[\s/]+/);
      const commonWords = enWords.filter(w => w.length > 2 && itWords.includes(w));
      if (commonWords.length >= Math.min(enWords.length, itWords.length) * 0.5) {
        spell = s;
        break;
      }
    }
  }
  
  if (!spell) {
    unmatched.push(enName);
    continue;
  }
  
  // Extract description
  let descText = '';
  if (spell.description && Array.isArray(spell.description)) {
    descText = spell.description.map(d => d.text || '').join('');
  }
  descText = descText.replace(/Systems Reference Document 5\.1 \d+/g, '').trim();
  descText = descText
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
    .trim();
  
  if (descText) itDescByEN[enName] = descText;

  // Extract higher level
  let hlText = '';
  if (spell.at_higher_levels && Array.isArray(spell.at_higher_levels)) {
    hlText = spell.at_higher_levels.map(d => d.text || '').join('');
  }
  hlText = hlText.replace(/Systems Reference Document 5\.1 \d+/g, '').trim();
  if (hlText) {
    hlText = hlText
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .trim();
    itHLByEN[enName] = hlText;
  }

  // Record the official Italian name
  if (spell.name !== itName) {
    fixedNames[enName] = spell.name;
  }
}

console.log(`Matched: ${Object.keys(itDescByEN).length} descriptions`);
console.log(`Unmatched: ${unmatched.length}`);
console.log(`Name fixes needed: ${Object.keys(fixedNames).length}`);

if (unmatched.length > 0) {
  console.log('\n=== UNMATCHED SPELLS ===');
  for (const name of unmatched) {
    console.log(`  "${name}" → "${enToIt[name]}"`);
  }
}

if (Object.keys(fixedNames).length > 0) {
  console.log('\n=== NAME CHANGES ===');
  for (const [en, newIt] of Object.entries(fixedNames)) {
    console.log(`  "${en}": "${enToIt[en]}" → "${newIt}"`);
  }
}

// Output the JS objects
console.log('\n=== DESC_IT ===');
console.log('const DESC_IT = ' + JSON.stringify(itDescByEN, null, 2) + ';');
console.log('\n=== DESC_HL_IT ===');
console.log('const DESC_HL_IT = ' + JSON.stringify(itHLByEN, null, 2) + ';');
