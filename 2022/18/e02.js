let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  let sides = 0;
  const scan = input.map(row => row.split(',').map(n => parseInt(n)));
  const checklist = scan.map(r => r.join(','));
  const isAdjacent = (a,b) => {
    const diff = a.map((c,i) => (c === b[i]) ? -1 : i).filter(c => c !== -1);
    if (diff.length !== 1) return false;
    return Math.abs(a[diff[0]] - b[diff[0]]) === 1;
  };
  for (let i = 0; i < scan.length; i++) sides += 6 - scan.slice(0,i).reduce((a,d) => (isAdjacent(d, scan[i])) ? a+2 : a, 0);

  const min = scan.reduce((a,d) => Math.min(...d, a), Number.MAX_SAFE_INTEGER);
  const max = scan.reduce((a,d) => Math.max(...d, a), Number.MIN_SAFE_INTEGER);
  const w = max-min+1;

  const map = [...new Array(w*w*w)].map(n => '?');
  const coord = (x,y,z) => (z-min)*w*w + (y-min)*w + (x-min);
  for (let y = min; y <= max; y++) for (let z = min; z <= max; z++) { map[coord(min,y,z)] = 'f'; map[coord(max,y,z)] = 'f'; }
  for (let x = min; x <= max; x++) for (let z = min; z <= max; z++) { map[coord(x,min,z)] = 'f'; map[coord(x,max,z)] = 'f'; }
  for (let x = min; x <= max; x++) for (let y = min; y <= max; y++) { map[coord(x,y,min)] = 'f'; map[coord(x,y,max)] = 'f'; }
  scan.forEach(d => map[coord(...d)] = 'd');
  
  const b = map.indexOf('?');
  const e = map.lastIndexOf('?');
  const adjacent = idx => [idx+1,idx-1,idx+w,idx-w,idx+w*w,idx-w*w].filter(i => i > 0 && i < map.length);
  for (let i = 0; i < map.length; i++) {
    [b+i,e-i].forEach(idx => {
      if (map[idx] !== '?') return;
      const a = adjacent(idx).map(j => map[j]);
      if (a.includes('f')) map[idx] = 'f';
    });
  }

  map.map((a,i) => (a === '?') ? i : -1)
      .filter(idx => idx > -1)
      .forEach(idx => {
        const a = adjacent(idx).map(j => map[j]);
        if (a.includes('f')) return;
        sides -= a.filter(c => c === 'd').length;
      });

  // PRINT
  for (let i = 0; i < map.length/w; i++) {
    if (i % w*w === 0) console.log(' ');
    console.log(map.slice(i*w, (i+1)*w).join(''));
  }
  
  console.log("E2: ", sides);
});
