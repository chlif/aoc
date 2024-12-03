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

  let diff = 0;
  for (let i = 0; i < l.length; i++) {
    diff = diff + Math.abs(l[i]-r[i]);
  }

  console.log("E1: ", diff);
});
