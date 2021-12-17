let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const target = input => input[0]
        .match(/([\-0-9]*)\.\.([\-0-9]*)/g)
        .flatMap(s => s.split('..'))
        .map(s => parseInt(s, 10));

  const isSolutionY = (y,h,l) => {
    let d = y;
    let p = 0;
    while (true) {
      p = p+d;
      if (p >= l && p <= h) return true;
      if (p < l) return false;
      d = d-1;
    }
  };

  const isSolution = (x,y,t) => {
    let pd = [0,0,x,y];
    while (true) {
      pd[0] = pd[0] + pd[2];
      pd[1] = pd[1] + pd[3];

      if (pd[0] >= t[0] && pd[0] <= t[1] && pd[1] >= t[2] && pd[1] <= t[3]) return true;
      if (pd[0] > t[1]) return false;
      if (pd[1] < t[2]) return false;

      pd[2] = (pd[2] === 0) ? 0 : (pd[2] < 0) ? pd[2]+1 : pd[2]-1;
      pd[3] = pd[3] - 1;
    }
  }

  const countMaxY = t => {
    const xMin = Math.ceil( -0.5+0.5*Math.sqrt(1+8*t[0]) );
    const yMin = Math.ceil(t[2]/(xMin+1)+xMin/2);
    const yMax = Math.ceil(( t[3]-t[2] ) / 0.1 - 1);
    let solutions = [];

    for (let y = yMin; y < yMax; y++) {
      if (isSolutionY(y,t[3],t[2])) solutions.push(y);
    }

    return solutions.reduce((a,b) => (a === undefined || b > a) ? b : a, undefined);
  };

  const findAllTrajectories = t => {
    const yMax = countMaxY(t);
    let tc = [];
    for (let x = 0; x <= t[1]; x++) {
      for (let y = t[2]; y <= yMax; y++) {
        if (isSolution(x,y,t)) tc.push([x,y]);
      }
    }
    return tc;
  }

  console.log("E2: ", findAllTrajectories((target(input))).length);
});
