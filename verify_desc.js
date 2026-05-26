const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

// Check JS syntax
const start = s.indexOf('<script>') + 8;
const end = s.indexOf('</script>');
try {
  new Function(s.substring(start, end));
  console.log('JS syntax OK');
} catch (e) {
  console.log('ERROR:', e.message.substring(0, 300));
}

// Extract and display some entries
const ditIdx = s.indexOf('const DESC_IT');
const dhlIdx = s.indexOf('const DESC_HL_IT');
const block = s.substring(ditIdx, dhlIdx - 1);
const lines = block.split('\n').filter(l => l.trim());

// Find entries that still have weird spacing
const weird = lines.filter(l => l.match(/[a-z]<br>/));
console.log('\nEntries with inline <br> (potential issues):', weird.length);
weird.slice(0, 5).forEach(l => {
  const m = l.match(/"([^"]+)":/);
  const name = m ? m[1] : '?';
  const match = l.match(/.{0,20}<br>.{0,20}/);
  console.log('  ' + name + ': ...' + (match ? match[0] : '') + '...');
});

// Count double spaces
const doubleSp = lines.filter(l => l.includes('  '));
console.log('\nEntries with double spaces:', doubleSp.length);

// Show a few sample entries
console.log('\n=== Sample entries ===');
const sampleKeys = ['Aid', 'Acid Arrow', 'Animate Dead', 'Animate Objects', 'Planar Ally', 'Bane'];
for (const key of sampleKeys) {
  const match = block.match(new RegExp('"' + key + '": "([^"]+)"'));
  if (match) {
    const val = match[1].substring(0, 300);
    console.log('\n' + key + ':', val);
  }
}
