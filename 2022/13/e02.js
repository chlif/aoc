let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const pairs = [...input.map(row => JSON.parse(row)), ...[[[2]], [[6]]]].sort(compare);
  let a = 1;
  for (let i in pairs) {
    if (
        pairs[i].length === 1 &&
        Array.isArray(pairs[i][0]) &&
        pairs[i][0].length === 1 &&
        (pairs[i][0][0] === 2 || pairs[i][0][0] === 6)
      ) {
      a *= (parseInt(i)+1);
    }
  }

  console.log("E2: ", a);
});

const compare = (left, right) => {
  if (left.length === 0 && right.length === 0) return 'even';
  else if (left.length === 0) return -1;
  else if (right.length === 0) return 1;

  let l = left[0];
  let r = right[0];

  if (!isNaN(l) && !isNaN(r) && r > l) return -1;
  if (!isNaN(l) && !isNaN(r) && r < l) return 1;

  if (Array.isArray(l) || Array.isArray(r)) {
    if (!Array.isArray(l)) l = [l];
    if (!Array.isArray(r)) r = [r];
    const c = compare(l,r);
    if (c !== 'even') return c;
  }

  return compare(left.slice(1), right.slice(1));
};