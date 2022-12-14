let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const rocks = input.flatMap(row => {
    const coords = [...row.matchAll(/([0-9]*\,[0-9]*)/g)]
        .map(m => {
          const p = m[0].split(',');
          return [parseInt(p[0]),parseInt(p[1])];
        });
    let rock = [];
    for (let i = 1; i < coords.length; i++) {
      if (coords[i-1][0] === coords[i][0]) {
        rock.push((coords[i-1][1] < coords[i][1]) ? [coords[i-1],coords[i]] : [coords[i],coords[i-1]]);
      } else {
        rock.push((coords[i-1][0] < coords[i][0]) ? [coords[i-1],coords[i]] : [coords[i],coords[i-1]]);
      }
    }
    return rock;
  });

  const dim = rocks.reduce((a,rock) => {
    return [
      (a[0] < rock[0][0]) ? a[0] : rock[0][0],
      (a[1] > rock[1][0]) ? a[1] : rock[1][0],
      (a[2] > rock[1][1]) ? a[2] : rock[1][1]
    ];
  }, [500,500,0]);

  const w = dim[1]-dim[0]+1;
  const h = dim[2]+1;
  const offset = dim[0];
  const sp = 500-offset;
  let map = [...new Array(w*h)].map(a => '.');
  map[sp] = '+';
  rocks.forEach(rock => {
    if (rock[0][0] === rock[1][0]) for (let y = rock[0][1]; y <= rock[1][1]; y++) map[y*w+rock[0][0]-offset] = '#';
    else for (let x = rock[0][0]; x <= rock[1][0]; x++) map[rock[0][1]*w+x-offset] = '#';
  });
  const printMap = () => { for (let i = 0; i < map.length/w; i++) console.log(map.slice(i*w,(i+1)*w).join('')) };


  let counter = 0;
  let inf = false;
  while (true) {
    let curr = sp;
    while (true) {
      if (curr+w > map.length || (curr+w-1)%w === w-1 || (curr+w+1)%w === 0) {
        inf = true;
        break;
      }
      const next = [curr+w, curr+w-1, curr+w+1].filter(p => map[p] !== '#' && map[p] !== 'o');
      if (next.length === 0) {
        map[curr] = 'o';
        break;
      }
      curr = next[0];
    }
    if (inf) break;
    counter++;
  }

  //printMap();

  console.log("E1: ", counter);
});