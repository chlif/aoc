let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const N = 1000000000;
  const W = input[0].length;
  const H = input.length;
  let map = input.flatMap(x => x.split(''));

  const coordToPoint = (x,y) => y*W+x;

  const findHighestEmptyPoint = (m,p) => {
    if (Math.floor(p/W) === 0) return p;
    let prev = p;
    while (true) {
      const next = prev-W;
      if (m[next] !== '.') return prev;
      if (Math.floor(next/W) === 0) return next;
      prev = next;
    }
  };  

  const transpose = (m) => {
    let t = [...new Array(m.length)];
    for (let i = 0; i < m.length; i++) {
      const x = i%W;
      const y = Math.floor(i/W);
      t[coordToPoint(W-1-y,x)] = m[i];
    }
    return t;
  };

  const print = m => { for (let i = 0; i < H; i++) console.log(m.slice(i*W,(i+1)*W).join('')); console.log(''); };
  const getKey = m => m.map((x,i) => (x === 'O') ? i : -1).filter(x => x > -1).join('-');

  const tilt = m => {
    let t = [...new Array(m.length)].map((x,i) => m[i]);
    for (let y = 1; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const p = coordToPoint(x,y);
        if (t[p] === 'O') {
          const next = findHighestEmptyPoint(t,p);
          if (next !== p) {
            t[next] = 'O';
            t[p] = '.';
          }
        }
      }
    }
    return t;
  };

  const cycle = m => {
    let r = [...m];
    for (let i = 0; i < 4; i++) {
      r = tilt(r);
      r = transpose(r);
    }
    return r;
  };

  let cache = {};
  let i = 0;
  while (true) {
    i++;
    map = cycle(map);
    const key = getKey(map);
    if (Object.keys(cache).includes(key)) {
      const loop = i-cache[key];
      const remainder = (N-cache[key])%loop;
      for (let j = 0; j < remainder; j++) map = cycle(map);
      break;
    } else {
      cache[key] = i;
    }
  }
  const weight = map.reduce((a,x,i) => {
    if (x !== 'O') return a;
    return a + H - Math.floor(i/W);
  }, 0);

  console.log("E2: ", weight);
});
