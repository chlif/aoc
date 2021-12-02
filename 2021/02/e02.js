let fs = require('fs');
const file = './input.txt';
const stepRegex = /([a-z]*)\ ([0-9]*)/;

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  // Exercise 1
  const findTarget = i => i.reduce((a,s) => {
    const r = s.match(stepRegex);
    console.log(a);
    console.log(s);
    if (r === null) return a;
    if (r[1] === 'forward') return [a[0]+parseInt(r[2]), a[1]+a[2]*parseInt(r[2]), a[2]];
    if (r[1] === 'up') return [a[0], a[1], a[2]-parseInt(r[2])];
    if (r[1] === 'down') return [a[0], a[1], a[2]+parseInt(r[2])];
    return [...a];
  }, [0,0,0]);
  const m = a => a[0]*a[1];

  console.log("E2: " + m(findTarget(input)));
});
