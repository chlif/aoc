let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const W = input[0].length+2;
  const H = input.length+2;

  const emptyRow = [...new Array(W)].map(x => '.').join('');
  const extendedInput = [emptyRow,...input.map(x => `.${x}.`),emptyRow];

  const map = extendedInput.join('').split('');
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

  // PIPE

  let curr = getConnected(S);
  let prev = [S,S];
  let pipe = [...curr];

  while (true) {
    const left = getConnected(curr[0]);
    const right = getConnected(curr[1]);
    
    const inter = [...curr];
    
    if (prev[0] === left[0]) curr[0] = left[1];
    else curr[0] = left[0];
    if (prev[1] === right[0]) curr[1] = right[1];
    else curr[1] = right[0];

    if (pipe.indexOf(curr[0]) > -1 || pipe.indexOf(curr[1]) > -1) break;

    if (curr[0] === curr[1]) pipe.push(curr[0])
    else pipe.push(...curr);
    prev = [...inter];
  }

  // AREAS

  const open = [...new Array(map.length)].map((x,i) => (pipe.indexOf(i) > -1) ? -1 : i).filter(x => x > -1);
  const outside = [];
  let queue = [0];
  do {
    const p = queue.shift();
    outside.push(...open.splice(open.indexOf(p),1));
    queue.push(...getAdjentive(p).filter(x => open.indexOf(x) > -1 && queue.indexOf(x) === -1));
  } while (queue.length)
  
  const revert  = (m) => (m === 'O') ? 'I' : 'O';

  for (let r = 0; r < H; r++) {
    let mem = 'O';
    let memTurn = 'O';
    for (let x = 1; x < W; x++) {
      const p = r*W + x;
      if (outside.indexOf(p) > -1) mem = 'O';
      else if (pipe.indexOf(p) > -1) {
        if (map[p] === '|' || map[p] === 'F' || map[p] === 'L') {
          mem = revert(mem);
          memTurn = map[p];
        }
        else if (map[p] === '7' || map[p] === 'J') {
          if (map[p] === '7' && memTurn === 'F') mem = revert(mem);
          if (map[p] === 'J' && memTurn === 'L') mem = revert(mem);
          memTurn = map[p];
        }
        else if (map[p] === 'S') {
          const conn = getConnected(p);
          const shape = '-';
          if (conn[0] === p-W && conn[1] === p+W) shape = '|';
          if (conn[0] === p-W && conn[1] === p+1) shape = 'L';
          if (conn[0] === p-W && conn[1] === p+1) shape = 'J';
          if (conn[0] === p-1 && conn[1] === p+W) shape = '7';
          if (conn[0] === p+1 && conn[1] === p+W) shape = 'F';
          if (shape === '|' || shape === 'F' || shape === 'L') mem = revert(mem);
          else if (shape === '7' && memTurn === 'F') mem = revert(mem);
          else if (shape === 'J' && memTurn === 'L') mem = revert(mem);
          memTurn = shape;
        }
      }
      else {
        if (mem === 'O' && open.indexOf(p) > -1) {
          outside.push(...open.splice(open.indexOf(p),1));
        }
      }
    }

    if (r.length === 1) break;
  }

  // DEBUG

  const printMap = () => {
    const y = map.map((x,i) => {
      if (outside.indexOf(i) > -1) return 'O';
      if (open.indexOf(i) > -1) return '?';
      return '.';
    });
    for (let r = 0; r < H; r++) {
      console.log(y.slice(r*W, (r+1)*W).join(''));
    }
  };

  printMap();

  console.log("E2: ", open.length);
});
