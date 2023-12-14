let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const W = input[0].length;
  const H = input.length;
  const map = input.flatMap(x => x.split(''));

  const coordToPoint = (x,y) => y*W+x;

  const findHighestEmptyPoint = (m,p) => {
    if (Math.floor(p/W) === 0) return p;
    let prev = p;
    while (true) {
      const next = prev-W;
      if (map[next] !== '.') return prev;
      if (Math.floor(next/W) === 0) return next;
      prev = next;
    }
  };

  const tiltNorth = m => {
    for (let y = 1; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const p = coordToPoint(x,y);
        if (m[p] === 'O') {
          const next = findHighestEmptyPoint(m,p);
          if (next !== p) {
            m[next] = 'O';
            m[p] = '.';
          }
        }
      }
    }
  };

  tiltNorth(map);
  const weight = map.reduce((a,x,i) => {
    if (x !== 'O') return a;
    return a + H - Math.floor(i/W);
  }, 0);

  console.log("E1: ", weight);
});
