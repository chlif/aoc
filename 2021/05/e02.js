let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const regex = /([0-9]*),([0-9]*) \-\> ([0-9]*),([0-9]*)/;
  const coords = data => data.map(row => row.match(regex).slice(1,5).map(i => parseInt(i,10)));
  const min = (i1,i2) => (i1 < i2) ? i1 : i2;
  const max = (i1,i2) => (i1 > i2) ? i1 : i2;

  const count = (lines) => {
    const h = lines.map(l => max(l[0],l[2])).reduce((a,i) => (i > a) ? i : a, 0)+1;
    const w = lines.map(l => max(l[1],l[3])).reduce((a,i) => (i > a) ? i : a, 0)+1;
    let map = Array.from(Array(h)).map(i => Array.from(Array(w)).map(j => 0));
    lines.forEach(l => {
      if (l[0] === l[2]) {
        Array.from(Array(Math.abs(l[1]-l[3])+1)).map((a,i) => min(l[1],l[3])+i).forEach(y => map[l[0]][y]++)
      } else if (l[1] === l[3]) {
        Array.from(Array(Math.abs(l[0]-l[2])+1)).map((a,i) => min(l[0],l[2])+i).forEach(x => map[x][l[1]]++);
      } else {
        Array.from(Array(Math.abs(l[0]-l[2])+1)).map((a,i) => i).forEach(i => {
          const x = l[0] + ((l[0] < l[2]) ? 1 : -1) * i;
          const y = l[1] + ((l[1] < l[3]) ? 1 : -1) * i;
          map[x][y]++;
        });
      }
    });
    return map.reduce((a,r) => [...a,...r], []).filter(i => i > 1).length;
  };

  console.log("E2: ", count(coords(input)));

});
