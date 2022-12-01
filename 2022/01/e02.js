let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n');

  let elves = [];
  let curr = 0;
  for (let i in input) {
    if (isNaN(parseInt(input[i]))) {
      elves.push(curr);
      curr = 0;
      continue;
    }
    curr += parseInt(input[i]);
  }
  elves.push(curr);

  const cals = elves
      .sort((a,b) => b-a)
      .slice(0,3)
      .reduce((a,c) => a+c, 0);

  console.log("E2: " + cals);
});
