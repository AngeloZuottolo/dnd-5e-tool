const fs = require('fs');
const d = JSON.parse(fs.readFileSync('spells_it.json', 'utf8'));

const ao = d.find(s => s.id === 'animare-oggetti');
if (ao) {
  console.log('=== Animate Objects description ===');
  ao.description.forEach((item, i) => {
    console.log('[' + i + '] type=' + item.type + ' |' + (item.text || '') + '|');
  });
}

// Also check how Prismatic Wall handles tables
const pw = d.find(s => s.id === 'muro-prismatico');
if (pw) {
  console.log('\n=== Prismatic Wall description ===');
  pw.description.forEach((item, i) => {
    const t = (item.text || '').substring(0, 100);
    console.log('[' + i + '] type=' + item.type + ' |' + t + '|');
  });
}
