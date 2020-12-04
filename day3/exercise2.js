let fs = require('fs');
const file = './input.txt';
const slopes = [
  { dx: 1, dy: 1 },
  { dx: 3, dy: 1 },
  { dx: 5, dy: 1 },
  { dx: 7, dy: 1 },
  { dx: 1, dy: 2 }
];

const travel = (map, x, y, dx, dy) => {
  if (y > map.length-1) return 0;
  return parseInt(isTree(map[y], x)) + travel(map, x+dx, y+dy, dx, dy);
}

const isTree = (row, pos) => {
  if (row.length === 0) return 0;
  return (row.charAt(pos % row.length) === '#') ? 1 : 0;
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const map = data.split("\n");
  const result = slopes.reduce((mem, d) => mem * travel(map, 0, 0, d.dx, d.dy), 1);
  console.log(result);
});
