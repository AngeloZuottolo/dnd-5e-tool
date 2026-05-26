const fs = require('fs');

// Read Italian SRD JSON
const itData = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

// Read the existing build-app.js to get the EN→IT name mapping
const buildJs = fs.readFileSync('build-app.js', 'utf8');
const nameMatch = buildJs.match(/const I18N = \{[\s\S]*?spellNames:\s*\{([\s\S]*?)\},\n/s);
if (!nameMatch) { console.error('Could not find spellNames in build-app.js'); process.exit(1); }

// Parse the spellNames object
const nameBlock = nameMatch[1];
const nameLines = nameBlock.split('\n');
const enToIt = {};
for (const line of nameLines) {
  const m = line.match(/['"]([^'"]+)['"]:\s*['"]([^'"]+)['"]/);
  if (m) enToIt[m[1]] = m[2];
}

// Build reverse mapping: Italian name (lowercase) → English name
const itToEn = {};
for (const [en, it] of Object.entries(enToIt)) {
  itToEn[it.toLowerCase()] = en;
}

// Build DESC_IT and DESC_HL_IT
const descIT = {};
const hlIT = {};

for (const spell of itData) {
  const itName = spell.name;
  const enName = itToEn[itName.toLowerCase()];
  if (!enName) {
    // Try matching by translating the Italian id to see if it's a known spell
    // Some spells might have slightly different names
    console.error(`  No EN mapping for: "${itName}" (id: ${spell.id})`);
    continue;
  }

  // Extract description text
  let descText = '';
  if (spell.description && Array.isArray(spell.description)) {
    descText = spell.description.map(d => d.text || '').join('');
  }

  // Clean up: remove "Systems Reference Document 5.1 XXX" references
  descText = descText.replace(/Systems Reference Document 5\.1 \d+/g, '').trim();

  // Clean markdown: **bold** → <strong>, *italic* → <em>, newlines → <br>
  descText = descText
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
    .trim();

  descIT[enName] = descText;

  // Extract higher level text
  let hlText = '';
  if (spell.at_higher_levels && Array.isArray(spell.at_higher_levels)) {
    hlText = spell.at_higher_levels.map(d => d.text || '').join('');
  }
  hlText = hlText.replace(/Systems Reference Document 5\.1 \d+/g, '').trim();
  hlText = hlText
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
    .trim();

  if (hlText) hlIT[enName] = hlText;
}

console.log(`Extracted ${Object.keys(descIT).length} Italian descriptions`);
console.log(`Missing ${Object.keys(enToIt).length - Object.keys(descIT).length} descriptions`);

// Output the JS object
console.log('\n--- DESC_IT ---');
console.log(JSON.stringify(descIT, null, 2));
console.log('\n--- DESC_HL_IT ---');
console.log(JSON.stringify(hlIT, null, 2));
