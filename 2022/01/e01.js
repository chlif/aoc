let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n');

  let max = 0;
  let curr = 0;
  for (let i in input) {
    if (isNaN(parseInt(input[i]))) {
      if (curr > max) max = curr;
      curr = 0;
      continue;
    }
    curr += parseInt(input[i]);
  }
  if (curr > max) max = curr;

  console.log("E1: " + max);
});
