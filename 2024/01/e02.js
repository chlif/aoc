let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  let lists = input.reduce((a,r) => {
      const parts = r.split('   ');
      return [
        a[0].concat([parseInt(parts[0])]),
        a[1].concat([parseInt(parts[1])])
      ];
    }, [[],[]]);
  
  const l = lists[0].sort();
  const r = lists[1].sort();

  let mid = {};
  for (let i = 0; i < r.length; i++) {
    if (mid[r[i]] !== undefined)
      mid[r[i]]++;
    else 
      mid[r[i]] = 1;
  }

  let count = 0;
  for (let i = 0; i < l.length; i++) {
    if (mid[l[i]] !== undefined) {
      count = count + l[i] * mid[l[i]];
    }
  }

  console.log("E2: ", count);
});
