let fs = require('fs');
const file = './test.txt'; const y = 10;
//const file = './input.txt'; const y = 2000000;

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const sensors = input.map(row => {
    const p = [...row.matchAll(/x\=([\-0-9]*)\, y\=([\-0-9]*)/g)].flatMap(m => [m[1],m[2]]).map(m => parseInt(m));
    return [...p,Math.abs(p[0]-p[2])+Math.abs(p[1]-p[3])];
  });
  const beacons = sensors.map(s => s[2]+','+s[3]);
  const maxD = sensors.reduce((a,b) => (a > b[4]) ? a : b[4], Number.MIN_SAFE_INTEGER);
  const minX = sensors.reduce((a,b) => (a < b[2]) ? a : b[2], Number.MAX_SAFE_INTEGER) - maxD;
  const maxX = sensors.reduce((a,b) => (a > b[2]) ? a : b[2], Number.MIN_SAFE_INTEGER) + maxD;

  let counter = 0;
  for (let x = minX; x <= maxX; x++) {
    if (beacons.includes(x+','+y)) continue;
    for (let i in sensors) {
      if ( (Math.abs(sensors[i][0]-x)+Math.abs(sensors[i][1]-y)) <= sensors[i][4] ) {
        counter++;
        break;
      }
    }
  }

  console.log("E1: ", counter);
});
