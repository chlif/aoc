let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const REGEXP_NODE = /([A-Z]{3}) \= \(([A-Z]{3}), ([A-Z]{3})\)/;

  const steps = input[0];
  const nodes = input.slice(1).map(x => {
      const m = x.match(REGEXP_NODE);
      return [m[1],m[2],m[3]];
    })
    .reduce((a,x) => {
      let obj = {};
      obj[x[0]] = { L: x[1], R: x[2] };
      return { ...a, ...obj };
    }, {});

  let current = 'AAA';
  let stepCount = 0;
  let i = 0;
  do {
    current = nodes[current][steps.charAt(i)];
    stepCount++;
    if (++i === steps.length) i = 0;
  } while (current !== 'ZZZ');

  console.log("E1: ", stepCount);
});
