let fs = require('fs');
const file = './input.txt';
const testSet = 'L.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL\n';
const adjacentSeats = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

const round = (seats) => {
  const m = seats.map((r,i) => r.map((s, j) => {
    if (s === '.') return '.';
    const occupiedAdjacentSeats = adjacentSeats.reduce((acc, d) => {
          if (i+d[0] < 0 || i+d[0] >= seats.length) return acc;
          if (j+d[1] < 0 || j+d[1] >= r.length) return acc;
          return acc + (seats[i+d[0]][j+d[1]] === '#');
        }, 0);
    if (s === 'L' && occupiedAdjacentSeats === 0) return '#';
    if (s === '#' && occupiedAdjacentSeats >= 4) return 'L';
    return s;
  }));
  return m;
};

const runRec = (seats, prev) => {
  const next = round(seats);
  const occupied = countOccupied(next);
  if (occupied === prev) return next;
  return runRec(next, occupied);
};

const countOccupied = seats => seats.reduce((acc, r) => [...acc,...r], []).sort().indexOf('.');

// This is for debugging. Not called anywhere in the final solution
const print = seats => console.log('---\n'+seats.map(r => r.join('')).join('\n'));

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const seats = data.split('\n')
      .filter(row => row.length > 0)
      .map(row => row.split(''));

  const rowLength = seats[0].length;
  console.log(countOccupied(runRec(seats, -1)));


});
