let fs = require('fs');
const file = './input.txt';

const parseInstructions = raw => {
  return raw.map(l => {
        const parts = l.match(/([\w ]*): ([\d]{1,3})-([\d]{1,3}) or ([\d]{1,3})-([\d]{1,3})/);
        if (parts !== null) {
          return [ [parseInt(parts[2]),parseInt(parts[3])], [parseInt(parts[4]),parseInt(parts[5])] ];
        } else {
          return [];
        }
      })
      .reduce((a,i) => [...a, ...i], []);
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const tickets = data.split('\n')
      .filter(row => row.length > 0);

  const y = tickets.indexOf('your ticket:');
  const instr = parseInstructions(tickets.slice(0,y));
  const nearby = tickets.slice(y+3);

  console.log(nearby
        .join(',').split(',')
        .map(n => parseInt(n))
        .reduce((a,n) => {
          const valid = instr.reduce((b, i) => b || (i[0] <= n && i[1] >= n), false);
          return (!valid) ? a+n : a;
        }, 0)
      );
});
