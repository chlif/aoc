let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const seeds = input[0].split(':')[1].trim().split(' ').map(x => eval(x));

  const REG_TITLE = /([a-z]*)\-to\-([a-z]*) map\:/;
  let maps = {};
  let current = -1;
  for (let i = 1; i < input.length; i++) {
    if (input[i].match(REG_TITLE)) {
      current = input[i].split(' ')[0].split('-').slice(1).join('-');
      maps[current] = [];
    } else if (current !== -1) {
      maps[current].push(input[i].split(' ').map(x => eval(x)));
    }
  }

  const convert = (x, dest) => {
    const m = [...maps[dest]];
    for (let i = 0; i < m.length; i++) {
      if (x >= m[i][1] && x <= m[i][1]+m[i][2]-1) return m[i][0]+(x-m[i][1]);
    }
    return x;
  };

  const locations = seeds
      .map(x => convert(x, "to-soil"))
      .map(x => convert(x, "to-fertilizer"))
      .map(x => convert(x, "to-water"))
      .map(x => convert(x, "to-light"))
      .map(x => convert(x, "to-temperature"))
      .map(x => convert(x, "to-humidity"))
      .map(x => convert(x, "to-location"));
  
  const lowest = locations.reduce((a,x) => (a === -1 || x < a) ? x : a, -1);

  console.log("E1: ", lowest);
});
