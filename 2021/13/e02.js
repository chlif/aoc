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

  const run = (instr, paper) => {
    if (instr.length === 0) return paper;
    return run(instr.slice(1), fold(instr[0], paper));
  };

  const print = (paper) => {
    const w = paper.reduce((a,d) => (d.x > a) ? d.x : a, 0)+1;
    const h = paper.reduce((a,d) => (d.y > a) ? d.y : a, 0)+1;
    let str = '';
    for (let x = 0; x < w; x++) {
      str += '\n';
      for (let y = 0; y < w; y++) {
        str += (paper.find(p => p.x === x && p.y === y)) ? '#' : '.';
      }
    }
    return str;
  };

  console.log("E2: ", print(run(folds(input), paper(input))));
});
