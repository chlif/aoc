let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const steps = input.flatMap(row => {
    const parts = row.split(' ');
    return [...new Array(parseInt(parts[1]))].map(c => parts[0]);
  });

  let rope = [...new Array(10)].map(a => ({x:0,y:0}));
  let visited = {};

  steps.forEach(step => {
    switch (step) {
      case 'U':
        rope[0].y++; break;
      case 'D':
        rope[0].y--; break;
      case 'R':
        rope[0].x++; break;
      case 'L':
        rope[0].x--; break;
      default: break;
    }

    for (let i = 1; i < rope.length; i++) moveKnot(rope[i], rope[i-1]);

    visited[rope[rope.length-1].x+'-'+rope[rope.length-1].y] = 1;
  });

  console.log("E2: " + Object.keys(visited).length);
});

const moveKnot = (k, prev) => {
  if (k.x === prev.x && Math.abs(k.y-prev.y) > 1) {
    k.y += (k.y > prev.y) ? -1 : 1;
  }
  if (k.y === prev.y && Math.abs(k.x-prev.x) > 1) {
    k.x += (k.x > prev.x) ? -1 : 1;
  }
  if (Math.abs(k.x-prev.x) > 1 || Math.abs(k.y-prev.y) > 1) {
    k.y += (k.y > prev.y) ? -1 : 1;
    k.x += (k.x > prev.x) ? -1 : 1;
  }
};