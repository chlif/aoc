let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const instructions = data.split('\n').filter(row => row.length > 0);

  let currInstr = 0;
  let register = 1;
  let working = false;

  let screen = [...new Array(6*40)].map(p => '.');
  
  for (let cycle = 1; cycle <= screen.length; cycle++) {
    let pos = (cycle-1) % 40;
    if (Math.abs(register-pos) < 2) screen[cycle-1] = '#';

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

  console.log("E2: ");
  for (let i = 0; i < 6; i++) {
    console.log(screen.slice(i*40,(i+1)*40).join(''));
  }
});
