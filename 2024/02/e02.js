let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const reports = input.map(r => r.split(' ').map(n => parseInt(n)));

  const checkReport = (c) => {
    const incCount = c.reduce((a,l) => (l > 0) ? a+1 : 0, 0);
    const decCount = c.reduce((a,l) => (l < 0) ? a+1 : 0, 0);
    const inc = incCount > decCount;
    return c.reduce((a,l) => a && (l != 0 && Math.abs(l) <= 3 && ( (inc && l > 0) || (!inc && l < 0) )), true);
  };

  count = 0;
  for (let i = 0; i < reports.length; i++) {
    
    const r = reports[i];
    const variants = [r];
    let safe = false;
    for (let j = 0; j < r.length; j++) variants.push([ ...r.slice(0,j), ...r.slice(j+1) ]);
    for (let j = 0; j < variants.length; j++) {
      const v = variants[j];
      const c = [];
      for (let k = 1; k < v.length; k++) c.push(v[k]-v[k-1]);
      if (checkReport(c)) {
        safe = true;
        break;
      }
    }
    
    if (safe) count = count + 1;
  }

  console.log("E2: ", count);
});
