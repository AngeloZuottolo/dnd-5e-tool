const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const start = s.indexOf('const DESC_IT');
const hstart = s.indexOf('const DESC_HL_IT');
const block = s.substring(s.indexOf('{', start) + 1, hstart - 1);

// Count entries with <br> already
const brLines = block.split('\n').filter(l => l.includes('<br>'));
console.log('Entries with <br> already:', brLines.length);

// Check spacing issues (missing period before closing quote, double spaces)
const doubleSpace = block.split('\n').filter(l => l.includes('  '));
console.log('Entries with double spaces:', doubleSpace.length);

// Check entries ending without period
const lines = block.split('\n').filter(l => l.trim());
let noPeriod = 0;
for (const l of lines) {
  const txt = l.replace(/^[^"]*"/, '').replace(/"[^"]*"$/, '').trim();
  if (txt.length > 10 && !txt.endsWith('.') && !txt.endsWith(',') && !txt.endsWith('?') && !txt.endsWith('!')) {
    noPeriod++;
  }
}
console.log('Entries not ending with period:', noPeriod);

// Find longest entries (potential candidates for paragraph breaks)
const sorted = lines.map(l => ({ line: l, len: l.length })).sort((a, b) => b.len - a.len);
console.log('\nTop 10 longest entries:');
sorted.slice(0, 10).forEach((item, i) => {
  const m = item.line.match(/"([^"]+)":/);
  const name = m ? m[1] : '?';
  console.log((i + 1) + '. ' + name + ' - ' + item.len + ' chars');
});
