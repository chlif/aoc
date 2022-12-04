let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const overlappingPairs = input.map(r => {
    const parts = r.match(/([0-9]*)\-([0-9]*)\,([0-9]*)\-([0-9]*)/);
    return parts.slice(1,5).map(n => parseInt(n));
  }).filter(contains);

  console.log("E1: " + overlappingPairs.length);
});

const contains = p => {
  return (p[0] <= p[2] && p[1] >= p[3]) || (p[2]<= p[0] && p[3] >= p[1]);
};
