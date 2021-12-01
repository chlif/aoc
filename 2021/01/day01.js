let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const code = data.split('\n').filter(row => row.length > 0).map(n => parseInt(n));

  // Exercise 1
  const increases = collection => collection.reduce((a,n,i,c) => {
    if (i === 0) return a;
    if (c[i-1] < n) return 1+a;
    return a;
  }, 0);

  console.log("E1: " + increases(code));

  // Exercise 2
  const windows = collection => collection.map((n,i,c) => {
    if (i > c.length-3) return undefined;
    return c[i] + c[i+1] + c[i+2];
  }).filter(w => w !== undefined);

  console.log("E2: " + increases(windows(code)));
});
