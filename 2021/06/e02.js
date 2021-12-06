let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const fish = data => data[0].split(',').map(i => parseInt(i));
  const run = (f,days) => {
    let map = [...Array(9)].map(i => 0);
    f.forEach(i => map[i]++);

    for (let d = days; d > 0; d--) {
      let zero = map[0];
      for (let i = 0; i < map.length-1; i++) {
        map[i] = map[i+1];
      }
      map[6] += zero;
      map[map.length-1] = zero;
    }

    return map.reduce((a,i) => a+i, 0);
  }

  console.log("E2: ", run(fish(input), 256));

});
