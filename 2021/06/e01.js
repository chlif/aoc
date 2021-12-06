let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const fish = data => data[0].split(',').map(i => parseInt(i));
  const run = (f,d) => {
    if (d === 0) return f;
    return run(
      [
        ...f.map(i => (i === 0) ? 6 : i-1),
        ...[...Array(f.filter(i => i === 0).length)].map(i => 8)
      ],
      d-1
    );
  }

  console.log("E1: ", run(fish(input), 80).length);

});
