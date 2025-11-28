let fs = require('fs');
const file = './test.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const regexEq = /([0-9]+)/g;
  const input = data.split('\n').filter(row => row.length > 0);
  const eqs = input.map(x => {
      const m = x.matchAll(regexEq);
      return [...m].map(n => parseInt(n[0]));
    });

  const count = 0;
  eqs.forEach(eq => {
      const opCount = eq.length - 2;
      console.log(opCount);
    });

  console.log("E1: ", eqs);
});
