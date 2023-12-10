let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const map = input.join('').split('');
  const W = input[0].length;
  const H = input.length;
  const S = map.indexOf('S');

  const getAdjentive = (p) => {
    let adj = [...new Array(4)].map(x => -1);
    if (Math.floor(p/W) > 0) adj[0] = p-W;
    if (p%W > 0) adj[1] = p-1;
    if ((p+1)%W > 0) adj[2] = p+1;
    if (Math.floor(p/W) < H-1) adj[3] = p+W;
    return adj;
  };

  const getConnected = (p) => {
    const c = map[p];
    const a = getAdjentive(p);
    let conn = [];

    if (map[p] === '|') { a[1] = '-1'; a[2] = '-1' };
    if (map[p] === '-') { a[0] = '-1'; a[3] = '-1' };
    if (map[p] === 'L') { a[1] = '-1'; a[3] = '-1' };
    if (map[p] === 'J') { a[2] = '-1'; a[3] = '-1' };
    if (map[p] === '7') { a[0] = '-1'; a[2] = '-1' };
    if (map[p] === 'F') { a[0] = '-1'; a[1] = '-1' };
    
    if (a[0] > -1 && (map[a[0]] === '|' || map[a[0]] === '7' || map[a[0]] === 'F')) conn.push(a[0]);
    if (a[1] > -1 && (map[a[1]] === '-' || map[a[1]] === 'F' || map[a[1]] === 'L')) conn.push(a[1]);
    if (a[2] > -1 && (map[a[2]] === '-' || map[a[2]] === 'J' || map[a[2]] === '7')) conn.push(a[2]);
    if (a[3] > -1 && (map[a[3]] === '|' || map[a[3]] === 'L' || map[a[3]] === 'J')) conn.push(a[3]);

    return conn;
  };

  let curr = getConnected(S);
  let steps = 1;
  let prev = [...curr];
  let visited = [];

  while (true) {
    const left = getConnected(curr[0]);
    const right = getConnected(curr[1]);
    
    const inter = [...curr];
    
    if (prev[0] === left[0]) curr[0] = left[1];
    else curr[0] = left[0];
    if (prev[1] === right[0]) curr[1] = right[1];
    else curr[1] = right[0];

    if (visited.indexOf(curr[0]) > -1 || visited.indexOf(curr[1]) > -1) break;

    visited.push(...curr);
    prev = [...inter];
    steps++;
  }

  console.log("E1: ", steps);
});
