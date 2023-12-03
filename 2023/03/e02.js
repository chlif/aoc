let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const mapArray = input.flatMap(x => x.split(''));
  const w = input[0].length;
  const h = input.length;

  const getAdjencentive = (first,last) => {
    let a = [];
    if (first%w != 0) a.push(first-1,first-w-1,first+w-1);
    if ((last+1)%w != 0) a.push(last+1,last-w+1,last+w+1);
    for (let i = first; i <= last; i++) a.push(i-w,i+w);
    return a.filter(i => i >= 0 && i < (w*h));
  };

  const nums = input.flatMap((r,i) => {
      return [...r.matchAll(/([0-9]*)/g)]
        .filter(p => p[0] !== '')
        .map(p => [eval(p[0]), p.index])
        .map(p => {
          const first = i*w + p[1];
          const last = first + (""+p[0]).length-1;
          return [p[0],...getAdjencentive(first,last)];
        });
      });

  const sum = mapArray
      .map((p,i) => (p === '*') ? i : -1)
      .filter(p => p > -1)
      .map(p => nums.filter(n => n.slice(1).includes(p)).map(n => n[0]))
      .filter(p => p.length === 2)
      .reduce((a,p) => a + (p[0]*p[1]), 0);

  console.log("E2: ", sum);
});
