let fs = require('fs');
const file = './input.txt';

const check = (x,y,z,map) => {
  let count = 0;
  for (let dz = -1; dz <= 1; dz++)
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++)
        if (!(dz === 0 && dy === 0 && dx === 0) &&
            map[z+dz-1] !== undefined &&
            map[z+dz-1][y+dy-1] !== undefined &&
            map[z+dz-1][y+dy-1][x+dx-1] === '#') count++;

  if (map[z-1] !== undefined && map[z-1][y-1] !== undefined &&
      map[z-1][y-1][x-1] === '#') {
    if (count === 2 || count === 3) return '#';
    else return '.';
  } else {
    if (count === 3) return '#';
  }
  return '.';
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  let map = [data.split('\n')
      .filter(row => row.length > 0)
      .map(r => r.split(''))];

  let xs = map[0][0].length;
  let ys = map[0].length;
  let zs = map.length;
  let cycles = 6;

  for (let i = 0; i < cycles; i++) {
    let updated = [];
    for (let z = 0; z < zs+i+2; z++) {
      let ya = [];
      for (let y = 0; y < ys+i+2; y++) {
        let xa = [];
        for (let x = 0; x < xs+i+2; x++) {
          xa.push(check(x,y,z,map));
        }
        ya.push(xa);
      }
      updated.push(ya);
    }
    map = updated;
    xs++; ys++; zs++;
  }

  let count = 0;
  for (let z = 0; z < map.length; z++)
    for (let y = 0; y < map[z].length; y++)
      for (let x = 0; x < map[z][y].length; x++)
        if (map[z][y][x] === '#') count++;
  console.log(count);

});
