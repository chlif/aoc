let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const instructions = data.split('\n').filter(row => row.length > 0);

  const cyclesOfInterest = [20,60,100,140,180,220];
  let result = 0;
  let currInstr = 0;
  let register = 1;
  let working = false;
  
  for (let cycle = 1; cycle <= 220; cycle++) {
    if (cyclesOfInterest.includes(cycle)) result += cycle * register;

    if (instructions[currInstr] === 'noop') {
      currInstr++;
      continue;
    }

    if (working) {
      register += parseInt(instructions[currInstr].split(' ')[1]);
      working = false;
      currInstr++;
    } else {
      working = true;
    }
  }

  console.log("E1: " + result);
});
