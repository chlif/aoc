let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  
  // BUILD IMAGE
  
  let w = input[0].length;
  let h = input.length;
  let image = input.flatMap(x => x.split(''));
  
  let emptyRows = input.map((r,i) => r.split('').reduce((a,x) => a && x === '.', true) ? i : -1).filter(x => x > -1);
  let emptyCols = [];
  for (let x = 0; x < input[0].length; x++) {
    let a = true;
    for (let y = 0; y < input.length; y++) {
      if (input[y].charAt(x) !== '.') {
        a = false;
        break;
      }
    }
    if (a) emptyCols.push(x);
  }

  // FIND ROUTE
  const galaxies = image.map((x,i) => (x === '#') ? i : -1).filter(x => x > -1);
  const pairs = galaxies.flatMap((a,i) => galaxies.filter((b,j) => j>i).map(b => [a,b]));
  const distances = pairs.map(p => {
    let sx = Math.min(p[0]%w, p[1]%w);
    let lx = Math.max(p[0]%w, p[1]%w);
    let dx = lx-sx;
    for (let x = sx; x < lx; x++) if (emptyCols.includes(x)) dx += 999999;

    let sy = Math.min( Math.floor(p[0]/w), Math.floor(p[1]/w) );
    let ly = Math.max( Math.floor(p[0]/w), Math.floor(p[1]/w) );
    let dy = ly-sy;
    for (let y = sy; y < ly; y++) if (emptyRows.includes(y)) dy += 999999;

    return dx+dy;
  });
  const total = distances.reduce((a,x) => a+x, 0);

  console.log("E1: ", total);
});
