let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const rawSeeds = input[0].split(':')[1].trim().split(' ').map(x => eval(x));
  let seeds = [];
  for (let i = 0; i < rawSeeds.length/2; i++) {
    seeds.push([rawSeeds[i*2],rawSeeds[i*2]+rawSeeds[i*2+1]-1]);
  }

  const REG_TITLE = /([a-z]*)\-to\-([a-z]*) map\:/;
  let maps = {};
  let current = -1;
  for (let i = 1; i < input.length; i++) {
    if (input[i].match(REG_TITLE)) {
      current = input[i].split(' ')[0].split('-').slice(1).join('-');
      maps[current] = [];
    } else if (current !== -1) {
      const p = input[i].split(' ').map(x => eval(x));
      maps[current].push([p[1],p[1]+p[2]-1,p[0],p[0]+p[2]-1]);
    }
  }

  const convert = (range, dest) => {
    const m = [...maps[dest]];
    let r = [range];
    let res = [];
    for (let i = 0; i < m.length; i++) {
      let j = 0;
      while (j < r.length) {
        if (r[j][1] < m[i][0] || r[j][0] > m[i][1]) {
          j += 1;
          continue;
        }
        if (r[j][0] >= m[i][0] && r[j][1] <= m[i][1]) {
          res.push( [ m[i][2] + (r[j][0]-m[i][0]), m[i][2] + (r[j][1]-m[i][0]) ] );
          r.splice(j,1);
          continue;
        }
        if (r[j][0] < m[i][0] && r[j][1] > m[i][1]) {
          res.push([ m[i][2], m[i][3] ]);
          r.splice(j,1, [ r[j][0], m[i][0]-1 ], [ m[i][1]+1, r[j][1] ] );
          j += 2;
          continue;
        }
        if (r[j][0] >= m[i][0]) {
          res.push([ m[i][2] + (r[j][0]-m[i][0]), m[i][3] ]);
          r.splice(j,1, [ m[i][1]+1, r[j][1] ]);
          j += 1;
        } else {
          res.push([ m[i][2], m[i][2] + (r[j][1]-m[i][0]) ]);
          r.splice(j,1, [ r[j][0], m[i][0]-1 ]);
          j += 1;
        }
      }
    }
    return [...r, ...res];
  };

  const locations = seeds
      .flatMap(x => convert(x, "to-soil"))
      .flatMap(x => convert(x, "to-fertilizer"))
      .flatMap(x => convert(x, "to-water"))
      .flatMap(x => convert(x, "to-light"))
      .flatMap(x => convert(x, "to-temperature"))
      .flatMap(x => convert(x, "to-humidity"))
      .flatMap(x => convert(x, "to-location"));
  
  const lowest = locations.map(x => x[0]).reduce((a,x) => (a === -1 || x < a) ? x : a, -1);

  console.log("E2: ", lowest);
});
