let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const dotRegex = /([0-9]*),([0-9]*)/;
  const foldRegex = /fold along ([xy]{1})\=([0-9]*)/;

  const paper = input => input.map(l => l.match(dotRegex))
      .filter(l => l !== null)
      .map(l => ({ x: parseInt(l[1]), y: parseInt(l[2]) }));

  const folds = input => input.map(l => l.match(foldRegex))
      .filter(l => l !== null)
      .map(l => ({ dir: l[1], coord: parseInt(l[2]) }));

  const fold = (f,p) => p.map(dot => {
        if (f.dir === 'x' && dot.x < f.coord) return dot;
        if (f.dir === 'y' && dot.y < f.coord) return dot;
        if (f.dir === 'x') return { x: f.coord - (dot.x - f.coord), y: dot.y };
        if (f.dir === 'y') return { x: dot.x, y: f.coord - (dot.y - f.coord) };
      })
      .filter((dot, i, p) => {
        if (i === p.length-1) return true;
        for (let j = i+1; j < p.length; j++) {
          if (dot.x === p[j].x && dot.y === p[j].y) return false;
        }
        return true;
      });

  console.log("E1: ", fold(folds(input)[0], paper(input)).length);
});
