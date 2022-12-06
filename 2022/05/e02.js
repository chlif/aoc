let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const stackRow = findStackRow(input);
  const numberOfStacks = findNumberOfStacks(stackRow, input);
  let stacks = buildStacks(numberOfStacks, input);
  const instructions = buildInstructions(stackRow, input);

  for (let i in instructions) {
    stacks[instructions[i][2]] = [...stacks[instructions[i][1]].slice(0,instructions[i][0]), ...stacks[instructions[i][2]]];
    stacks[instructions[i][1]] = [...stacks[instructions[i][1]].slice(instructions[i][0])];
  }

  console.log("E2: ", stacks.map(s => s[0]).join(''));
});

const findStackRow = input => {
  for (let row in input) {
    if (input[row].match(/^ 1/)) return parseInt(row);
  }
};

const findNumberOfStacks = (stackRow, input) => parseInt(input[stackRow].match(/([0-9]*) $/)[1]);

const buildStacks = (numberOfStacks, input) => {
  let stacks = [...new Array(numberOfStacks)].map(a => []);
  input.slice(0,numberOfStacks).forEach(r => {
    for (let i = 0; i < numberOfStacks; i++) {
      const c = r.charAt(i*4+1);
      if (c !== ' ') {
        stacks[i].push(c);
      }
    }
  });
  return stacks;
};

const buildInstructions = (stackRow, input) => {
  return input
      .slice(stackRow+1)
      .map(r => {
        const parts = r.match(/move ([0-9]*) from ([0-9]*) to ([0-9]*)/);
        return [
          parseInt(parts[1]),
          parseInt(parts[2])-1,
          parseInt(parts[3])-1
        ]
      });
};