/**
 *  NOTE! This code is not working. The logic is fully there, but it gives false results
 */

let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const parse = input => input.map(p => {
    const r = p.match(/[0-9]/g);
    return parseInt(r[1]);
  });

  const l = 21;
  const D = [1,2,3];
  let cache = {};

  const key = (d,p,c,s) => JSON.stringify([d,p,c,s]);
  const turn = (() => D.flatMap(a => D.flatMap(b => D.map(c => a+b+c))))();

  const cast = (d,p,c,s) => {
    const k = key(d,p,c,s);
    if (k in cache) {
      return cache[k];
    }

    const n = (s[p]+d-1) % 10 + 1;
    const x = c[p] + n;
    if (x >= l) {
      return [0,0].map((a,i) => (i===p) ? 1 : 0);
    }

    const ns = s.map((a,i) => (i===p) ? n : a);
    const nc = c.map((a,i) => (i===p) ? x : a);
    const u = turn.map(nd => cast(nd, 1-p, [...nc], [...ns])).reduce((a,w) => [a[0]+w[0],a[1]+w[1]], [0,0]);

    cache[k] = u;
    return u;
  };

  const play = () => turn.map(d => cast(d,0,[0,0],parse(input))).reduce((a,w) => [a[0]+w[0],a[1]+w[1]], [0,0]);

  console.log("E2: ", play());
});
