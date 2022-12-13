let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const correctPairs = [...new Array(input.length/2)].map((a,i) => {
    const pair = input.slice(i*2,(i+1)*2).map(lr => JSON.parse(lr));
    return pair;
  }).map(pair => compare(pair[0], pair[1])).map((a,i) => (a) ? i+1 : -1).filter(a => a !== -1);

  console.log("E1: ", correctPairs.reduce((a,b) => a+b, 0));
});

const compare = (left, right) => {
  if (left.length === 0 && right.length === 0) return 'even';
  else if (left.length === 0) return true;
  else if (right.length === 0) return false;

  let l = left[0];
  let r = right[0];

  if (!isNaN(l) && !isNaN(r) && r > l) return true;
  if (!isNaN(l) && !isNaN(r) && r < l) return false;

  if (Array.isArray(l) || Array.isArray(r)) {
    if (!Array.isArray(l)) l = [l];
    if (!Array.isArray(r)) r = [r];
    const c = compare(l,r);
    if (c !== 'even') return c;
  }

  return compare(left.slice(1), right.slice(1));
};