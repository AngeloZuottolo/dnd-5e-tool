const fs = require('fs');
const d = JSON.parse(fs.readFileSync('spells_it.json', 'utf8'));

// Animate Objects = animare-oggetti
const ao = d.find(s => s.id === 'animare-oggetti');
if (ao) {
  console.log('=== Animate Objects source description ===');
  console.log('Array length:', ao.description.length);
  ao.description.forEach((p, i) => {
    console.log('Para', i, '(', p.type, '):', p.text.substring(0, 120) + '...');
  });
  console.log('\n=== at_higher_levels ===');
  console.log(JSON.stringify(ao.at_higher_levels));
}

// Check what's currently in DESC_IT for Animate Objects
const html = fs.readFileSync('index.html', 'utf8');
const ditStart = html.indexOf('const DESC_IT');
const ditObjStart = html.indexOf('{', ditStart) + 1;
const ditEnd = html.indexOf('const DESC_HL_IT');
const ditBlock = html.substring(ditObjStart, ditEnd - 1);

const aoMatch = ditBlock.match(/"Animate Objects": "([^"]+)"/);
if (aoMatch) {
  const currDesc = aoMatch[1];
  console.log('\n=== Current DESC_IT Animate Objects ===');
  console.log('Length:', currDesc.length);
  console.log('Has <br>:', currDesc.includes('<br>'));
  console.log('Has double spaces:', currDesc.includes('  '));
  console.log('First 200:', currDesc.substring(0, 200));
}
