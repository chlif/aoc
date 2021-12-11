let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const w = input[0].length;
  const map = input.reduce((a,r) => a+r, "");
  const findAdjacentIds = (i,m) => [i-w,i-1,i+1,i+w].filter(j => j >= 0 && j < m.length && (Math.abs(j-i) > 1 || Math.floor(j/w) === Math.floor(i/w)) );
  const lowpoints = map => {
    return map.split('').filter((p,i,m) => {
      return findAdjacentIds(i,m)
          .map(j => parseInt(m[j]))
          .reduce((a,j) => a && j > parseInt(p), true);
    }).map(i => parseInt(i));
  };

  console.log("E1: " + lowpoints(map).map(i => i+1).reduce((a,i) => a+i, 0));
});
