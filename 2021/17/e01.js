let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const target = input => input[0]
        .match(/([\-0-9]*)\.\.([\-0-9]*)/g)
        .flatMap(s => s.split('..'))
        .map(s => parseInt(s, 10));

  const isSolution = (y,h,l) => {
    let d = y;
    let p = 0;
    while (true) {
      p = p+d;
      if (p >= l && p <= h) return true;
      if (p < l) return false;
      d = d-1;
    }
  };

  const initialSpeed = t => {
    const xMin = Math.ceil( -0.5+0.5*Math.sqrt(1+8*t[0]) );
    const yMin = Math.ceil(t[2]/(xMin+1)+xMin/2);
    const yMax = Math.ceil(( t[3]-t[2] ) / 0.1 - 1);
    let solutions = [];

    for (let y = yMin; y < yMax; y++) {
      if (isSolution(y,t[3],t[2])) solutions.push(y);
    }

    return solutions.reduce((a,b) => (a === undefined || b > a) ? b : a, undefined);
  };

  const highestPosition = y => y*(y+1)/2;

  console.log("E1: ", highestPosition(initialSpeed(target(input))));
});
