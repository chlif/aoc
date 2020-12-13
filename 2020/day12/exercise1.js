part 1:

let fs = require('fs');
const file = './input.txt';
const testSet = 'F10\nN3\nF7\nR90\nF11\n';
const directions = ['E','N','W','S'];

const next = (ns, ew, orientation, instructions) => {
  if (instructions.length === 0) return [ns, ew];
  console.log("%s %s %s => %s", ns, ew, orientation, instructions[0]);

  const m = instructions[0].match(/([A-Z]{1})(\d*)/);

  if (['L','R'].includes(m[1])) {
    let nextOrientation = directions.indexOf(orientation) +
        ((m[1] === 'L') ? 1 : -1) * (parseInt(m[2])/90);
    if (nextOrientation < 0) nextOrientation = nextOrientation + 4;
    if (nextOrientation > 3) nextOrientation = nextOrientation - 4;
    return next(ns, ew, directions[nextOrientation], instructions.slice(1));
  }
  if ([...directions,'F'].includes(m[1])) {
    const change = move(ns, ew, (m[1] === 'F') ? orientation : m[1], parseInt(m[2]));
    return next(change[0], change[1], orientation, instructions.slice(1));
  }

  throw 'False instructions found '+m[1];
};

const move = (ns, ew, direction, amount) => {
  switch (direction) {
    case 'N':
      return [ns+amount, ew];
    case 'S':
      return [ns-amount, ew];
    case 'E':
      return [ns, ew+amount];
    case 'W':
      return [ns, ew-amount];
    default:
      throw 'False direction '+direction;
  }
};

const manhattanDistance = pos => Math.abs(pos[0]) + Math.abs(pos[1]);

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const instructions = data.split('\n')
//  const instructions = testSet.split('\n')
      .filter(row => row.length > 0);

  console.log(manhattanDistance(next(0, 0, 'E', instructions)));

});
