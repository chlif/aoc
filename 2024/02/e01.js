let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const reports = input.map(r => r.split(' ').map(n => parseInt(n)));

  count = 0;
  for (let i = 0; i < reports.length; i++) {
    const r = reports[i];
    const inc = r[0] < r[1];
    let safe = true;
    for (let j = 1; j < r.length; j++) {
      const diff = r[j] - r[j-1];
      if ( diff == 0 || Math.abs(diff) > 3 || (inc && diff < 0) || (!inc && diff > 0) ) {
        safe = false;
        break;
      }
        
    }
    if (safe) count = count + 1;
  }

  console.log("E1: ", count);
});
