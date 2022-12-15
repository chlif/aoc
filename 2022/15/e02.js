let fs = require('fs');
//const file = './test.txt'; const max = 20;
const file = './input.txt'; const max = 4000000;

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const sensors = input.map(row => {
    const p = [...row.matchAll(/x\=([\-0-9]*)\, y\=([\-0-9]*)/g)].flatMap(m => [m[1],m[2]]).map(m => parseInt(m));
    return [p[0],p[1],Math.abs(p[0]-p[2])+Math.abs(p[1]-p[3])];
  });

  let segments = [];
  const addSegment = (s) => {
    segments.push(s);
    while (true) {
      let combined = false;
      for (let i = 0; i < segments.length; i++) {
        for (let j = i+1; j < segments.length; j++) {
          const c = combine(segments[i], segments[j]);
          if (c) {
            combined = true;
            segments.splice(i,1,c[0]);
            segments.splice(j,1);
            break;
          }
        }
      }
      if (!combined) break;
    }
  };

  let freq = 0;
  for (let y = 0; y <= max; y++) {
    let segments = sensors
        .filter(s => Math.abs(y-s[1]) <= s[2])
        .map(s => {
          const e = s[2] - Math.abs(y-s[1]);
          return [
            (s[0]-e < 0) ? 0 : s[0]-e,
            (s[0]+e > max) ? max : s[0]+e
          ];
        });

    while (true) {
      let combined = false;
      for (let i = 0; i < segments.length; i++) {
        for (let j = i+1; j < segments.length; j++) {
          const c = combine(segments[i], segments[j]);
          if (c) {
            combined = true;
            segments.splice(i,1,c[0]);
            segments.splice(j,1);
            break;
          }
        }
      }
      if (!combined) break;
    }

    if (segments.length === 2) {
      const x = (segments[0][0] < segments[1][0]) ? segments[0][1]+1 : segments[1][1]+1;
      freq = 4000000*x+y;
      break;
    }
  }

  console.log("E2: ", freq);
});


const combine = (s1, s2) => {
  if (s1[0] < s2[0] && s1[1] < s2[0]-1) return false;
  if (s1[0] > s2[0] && s2[1] < s1[0]-1) return false;
  return [[ Math.min(s1[0],s2[0]), Math.max(s1[1],s2[1]) ]];
};
