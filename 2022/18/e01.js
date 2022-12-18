let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  let sides = 0;
  const scan = input.map(row => row.split(',').map(n => parseInt(n)));
  const isAdjacent = (a,b) => {
    const diff = a.map((c,i) => (c === b[i]) ? -1 : i).filter(c => c !== -1);
    if (diff.length !== 1) return false;
    return Math.abs(a[diff[0]] - b[diff[0]]) === 1;
  };
  for (let i = 0; i < scan.length; i++) sides += 6 - scan.slice(0,i).reduce((a,d) => (isAdjacent(d, scan[i])) ? a+2 : a, 0);

  console.log("E1: ", sides);
});
