let fs = require('fs');
const file = './input.txt';
const testSet = 'L.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL\n';
const adjacentSeats = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

const round = (seats) => {
  const m = seats.map((r,i) => r.map((s, j) => {
    if (s === '.') return '.';
    const occupiedAdjacentSeats = adjacentSeats.reduce((acc, d) => {
          for (let k = 1; k < Math.max(seats.length, r.length); k++) {
            if (i+k*d[0] < 0 || i+k*d[0] >= seats.length) continue;
            if (j+k*d[1] < 0 || j+k*d[1] >= r.length) continue;
            if (seats[i+k*d[0]][j+k*d[1]] === '#') return acc + 1;
            if (seats[i+k*d[0]][j+k*d[1]] === 'L') return acc;
          }
          return acc;
        }, 0);
    if (s === 'L' && occupiedAdjacentSeats === 0) return '#';
    if (s === '#' && occupiedAdjacentSeats >= 5) return 'L';
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
