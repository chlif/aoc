let fs = require('fs');
const file = './input.txt';

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
  console.log(travel(map, 0, 0, 3, 1));
});
