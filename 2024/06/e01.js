let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const w = input[0].length;
  const h = input.length;
  let map = input.join('').split('');

  const print = (m) => {
      for (let i = 0; i < h; i++) console.log(map.slice(i*w,(i+1)*w).join(''));
    };

  let pos = map.indexOf('^');
  let dir = 'U';
  while (true) {
    if (map[pos] === '#') {
      if (dir === 'U') {
        dir = 'R';
        pos = pos + w + 1;
        continue;
      }
      if (dir === 'R') {
        dir = 'D';
        pos = pos + w - 1;
        continue;
      }
      if (dir === 'D') {
        dir = 'L';
        pos = pos - w - 1;
        continue;
      }
      if (dir === 'L') {
        dir = 'U';
        pos = pos - w + 1;
        continue;
      }
    }

    map[pos] = 'X';
    //print(map);

    if (dir === 'U') pos = pos - w;
    if (dir === 'R') pos = pos + 1;
    if (dir === 'D') pos = pos + w;
    if (dir === 'L') pos = pos - 1;

    if (pos < 0 || pos > map.length-1) break;
    if (dir === 'R' && pos % w === 0) break;
    if (dir === 'L' && pos % w === w-1) break;
  }

  const count = map.filter(x => x === 'X').length;

  console.log("E1: ", count);
});
