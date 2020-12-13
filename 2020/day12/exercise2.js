let fs = require('fs');
const file = './input.txt';
const testSet = 'F10\nN3\nF7\nR90\nF11\n';
const directions = ['E','N','W','S'];

const next = (ship, waypoint, instructions) => {
  if (instructions.length === 0) return ship;
//  console.log("%s %s %s => %s", ship, waypoint, instructions[0]);

  const m = instructions[0].match(/([A-Z]{1})(\d*)/);

  if (['L','R'].includes(m[1])) {
    return next(ship,
      turn(waypoint, m[1], parseInt(m[2])),
      instructions.slice(1)
    );
  }
  if (directions.includes(m[1])) {
    return next(ship,
      move(waypoint, m[1], parseInt(m[2])),
      instructions.slice(1)
    );
  }
  if (m[1] === 'F') {
    const k = parseInt(m[2]);
    return next(
      [ship[0]+k*waypoint[0], ship[1]+k*waypoint[1]],
      waypoint,
      instructions.slice(1)
    );
  }

  throw 'False instructions found '+m[1];
};

const move = (waypoint, direction, amount) => {
  const kns = (direction == 'N') ? 1 : (direction === 'S') ? -1 : 0;
  const kew = (direction == 'E') ? 1 : (direction === 'W') ? -1 : 0;
  return [waypoint[0]+kns*amount, waypoint[1]+kew*amount];
};

const turn = (waypoint, d, t) => {
  if ((d === 'L' && t === 90) || (d === 'R' && t === 270))
      return [waypoint[1], -waypoint[0]];
  if (t === 180)
      return [-waypoint[0], -waypoint[1]];
  if ((d === 'L' && t === 270) || (d === 'R' && t === 90))
    return [-waypoint[1], waypoint[0]];
};

const manhattanDistance = pos => Math.abs(pos[0]) + Math.abs(pos[1]);

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const instructions = data.split('\n')
//  const instructions = testSet.split('\n')
      .filter(row => row.length > 0);

  console.log(manhattanDistance(next([0,0], [1,10], instructions)));

});
