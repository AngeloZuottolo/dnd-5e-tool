const fs = require('fs');

// Read data
const itData = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

// Read build-app.js for the I18N.spellNames
const buildJs = fs.readFileSync('build-app.js', 'utf8');
const nameMatch = buildJs.match(/const I18N = \{[\s\S]*?spellNames:\s*\{([\s\S]*?)\},\n/s);
if (!nameMatch) { console.error('No spellNames'); process.exit(1); }
const nameLines = nameMatch[1].split('\n');
const enToIt = {};
for (const line of nameLines) {
  const m = line.match(/['"]([^'"]+)['"]:\s*['"]([^'"]+)['"]/);
  if (m) enToIt[m[1]] = m[2];
}

// Read the spells data from the English SRD
// We need to read the raw SRD JSON too
const rawPath = process.argv[3];
let enSpellsBySig = {};
if (rawPath) {
  try {
    const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
    const entries = raw.Spellcasting['Spell Descriptions'];
    for (const [name, entry] of Object.entries(entries)) {
      if (!entry.content || !Array.isArray(entry.content) || entry.content.length === 0) continue;
      if (entry.table) continue;
      if (['Precipitation', 'Temperature', 'Wind'].includes(name)) continue;
      
      // Extract level and school from the content
      const allText = entry.content.map(c => typeof c === 'string' ? c : '').join('\n');
      const lvlMatch = allText.match(/(\d+)[a-z]*-level\s+(\w+)/i);
      const cantripMatch = allText.match(/(\w+)\s+cantrip/i);
      let level, school;
      if (lvlMatch) { level = parseInt(lvlMatch[1]); school = lvlMatch[2]; }
      else if (cantripMatch) { level = 0; school = cantripMatch[1]; }
      
      if (level === undefined || !school) continue;
      
      // Get classes from class spell lists
      const rawLists = raw.Spellcasting['Spell Lists'];
      const classMap = { 'Bard Spells':'Bard', 'Cleric Spells':'Cleric', 'Druid Spells':'Druid', 'Paladin Spells':'Paladin', 'Ranger Spells':'Ranger', 'Sorcerer Spells':'Sorcerer', 'Warlock Spells':'Warlock', 'Wizard Spells':'Wizard' };
      const levelMap = { 'Cantrips (0 Level)':0, '1st Level':1, '2nd Level':2, '3rd Level':3, '4th Level':4, '5th Level':5, '6th Level':6, '7th Level':7, '8th Level':8, '9th Level':9 };
      const classes = [];
      for (const [key, lists] of Object.entries(rawLists)) {
        const cls = classMap[key];
        if (!cls) continue;
        for (const [lvlKey, spellArr] of Object.entries(lists)) {
          const lvl = levelMap[lvlKey];
          if (lvl === undefined) continue;
          if (spellArr.includes(name)) { classes.push(cls); break; }
        }
      }
      const sig = `${level}|${school}|${classes.sort().join(',')}`;
      enSpellsBySig[sig] = name;
    }
  } catch (e) { console.error('Could not read raw SRD:', e.message); }
}

// Build Italian index by signature
const itBySig = {};
const itByName = {};
for (const spell of itData) {
  const normalized = spell.name.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  itByName[normalized] = spell;
  
  // Map school from Italian to English
  const schoolMap = {
    'Abiurazione':'Abjuration', 'Evocazione':'Conjuration', 'Divinazione':'Divination',
    'Ammaliamento':'Enchantment', 'Invocazione':'Evocation', 'Illusione':'Illusion',
    'Necromanzia':'Necromancy', 'Trasmutazione':'Transmutation'
  };
  const school = schoolMap[spell.school] || spell.school;
  
  // Map classes from Italian to English
  const classMap = { 'bardo':'Bard', 'chierico':'Cleric', 'druido':'Druid', 'paladino':'Paladin', 'ranger':'Ranger', 'stregone':'Sorcerer', 'warlock':'Warlock', 'mago':'Wizard' };
  const classes = (spell.classes || []).map(c => classMap[c.toLowerCase()] || c).sort();
  
  const sig = `${spell.level}|${school}|${classes.join(',')}`;
  // Only store first match per signature (avoid collisions)
  if (!itBySig[sig]) itBySig[sig] = spell;
}

// Now match
const descIT = {};
const hlIT = {};
const nameFixes = {};
const unmatched = [];
let sigMatched = 0;

for (const [enName, itName] of Object.entries(enToIt)) {
  const normalized = itName.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  let spell = itByName[normalized];
  
  // If not matched by name, try by signature
  if (!spell) {
    const sig = enSpellsBySig[Object.keys(enSpellsBySig).find(k => enSpellsBySig[k] === enName)];
    if (sig && itBySig[sig]) {
      spell = itBySig[sig];
      sigMatched++;
      // Check if names differ
      if (spell.name !== itName) {
        nameFixes[enName] = { old: itName, new: spell.name };
      }
    }
  } else {
    if (spell.name !== itName) {
      nameFixes[enName] = { old: itName, new: spell.name };
    }
  }
  
  if (!spell) {
    unmatched.push(`${enName} → "${itName}"`);
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
  if (descText) descIT[enName] = descText;
  
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
    hlIT[enName] = hlText;
  }
}

console.log(`Name-matched: ${Object.keys(descIT).length - sigMatched}`);
console.log(`Signature-matched: ${sigMatched}`);
console.log(`Total: ${Object.keys(descIT).length}`);
console.log(`Unmatched: ${unmatched.length}`);

if (unmatched.length > 0) {
  console.log('\n=== UNMATCHED ===');
  for (const u of unmatched) console.log(`  ${u}`);
}

if (Object.keys(nameFixes).length > 0) {
  console.log(`\n=== NAME FIXES (${Object.keys(nameFixes).length}) ===`);
  for (const [en, fix] of Object.entries(nameFixes)) {
    console.log(`  "${en}": "${fix.old}" → "${fix.new}"`);
  }
}

console.log('\n=== DESC_IT ===');
console.log('const DESC_IT = ' + JSON.stringify(descIT, null, 2) + ';');
console.log('\n=== DESC_HL_IT ===');
console.log('const DESC_HL_IT = ' + JSON.stringify(hlIT, null, 2) + ';');
