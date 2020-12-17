let fs = require('fs');
const file = './input.txt';

const check = (x,y,z,w,map) => {
  let count = 0;
  for (let dw = -1; dw <= 1; dw++)
    for (let dz = -1; dz <= 1; dz++)
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++)
          if (!(dw === 0 && dz === 0 && dy === 0 && dx === 0) &&
              map[w+dw-1] !== undefined &&
              map[w+dw-1][z+dz-1] !== undefined &&
              map[w+dw-1][z+dz-1][y+dy-1] !== undefined &&
              map[w+dw-1][z+dz-1][y+dy-1][x+dx-1] === '#') count++;

  if (map[w-1] !== undefined && map[w-1][z-1] !== undefined && map[w-1][z-1][y-1] !== undefined &&
      map[w-1][z-1][y-1][x-1] === '#') {
    if (count === 2 || count === 3) return '#';
    else return '.';
  } else {
    if (count === 3) return '#';
  }
  return '.';
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  let map = [[data.split('\n')
      .filter(row => row.length > 0)
      .map(r => r.split(''))]];

  let xs = map[0][0][0].length;
  let ys = map[0][0].length;
  let zs = map[0].length;
  let ws = map.length;
  let cycles = 6;

  for (let i = 0; i < cycles; i++) {
    let updated = [];
    for (let w = 0; w < ws+i+2; w++) {
      let za = [];
      for (let z = 0; z < zs+i+2; z++) {
        let ya = [];
        for (let y = 0; y < ys+i+2; y++) {
          let xa = [];
          for (let x = 0; x < xs+i+2; x++) {
            xa.push(check(x,y,z,w,map));
          }
          ya.push(xa);
        }
        za.push(ya);
      }
      updated.push(za);
    }
    map = updated;
    xs++; ys++; zs++; ws++;
  }

  let count = 0;
  for (let w = 0; w < map.length; w++)
    for (let z = 0; z < map[w].length; z++)
      for (let y = 0; y < map[w][z].length; y++)
        for (let x = 0; x < map[w][z][y].length; x++)
          if (map[w][z][y][x] === '#') count++;
  console.log(count);

});
