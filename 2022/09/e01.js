let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const steps = input.flatMap(row => {
    const parts = row.split(' ');
    return [...new Array(parseInt(parts[1]))].map(c => parts[0]);
  });

  let H = {x: 0, y: 0};
  let T = {x: 0, y: 0};
  let visited = {};

  steps.forEach(step => {
    switch (step) {
      case 'U':
        H.y++; break;
      case 'D':
        H.y--; break;
      case 'R':
        H.x++; break;
      case 'L':
        H.x--; break;
      default: break;
    }
    
    if (T.x === H.x && Math.abs(T.y-H.y) > 1) {
      T.y += (T.y > H.y) ? -1 : 1;
    }
    if (T.y === H.y && Math.abs(T.x-H.x) > 1) {
      T.x += (T.x > H.x) ? -1 : 1;
    }
    if (Math.abs(T.x-H.x) > 1 || Math.abs(T.y-H.y) > 1) {
      T.y += (T.y > H.y) ? -1 : 1;
      T.x += (T.x > H.x) ? -1 : 1;
    }

    visited[T.x+'-'+T.y] = 1;
  });

  console.log("E1: " + Object.keys(visited).length);
});
