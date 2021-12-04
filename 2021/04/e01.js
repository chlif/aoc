let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const stack = input[0].split(',').map(v => parseInt(v,10));

  const boards = input.slice(1)
      .reduce((acc, row, i) => {
        const c = (i % 5 === 0) ? [] : [...acc.slice(-1)];
        const r = row.match(/([0-9]{1,2})/g).map(v => parseInt(v,10));
        if (i % 5 === 0) return [...acc, r];
        else return [...acc.slice(0,acc.length-1), [...acc[acc.length-1], ...r]];
      }, [])
      .map(b => ({
        keys: b,
        marked: Array.from(Array(b.length)).map(i => 0)
      }));

  const findNeedle = (b, needle) => {
    const i = b.keys.indexOf(needle);
    if (i > -1) b.marked[i] = 1;
    return b;
  };

  const bingo = b => {
    const idx = [0,1,2,3,4];
    return idx.reduce((a1,i) => a1 || idx.reduce((a2,j) => a2 && b.marked[i*5+j] === 1, 1), 0) ||
    idx.reduce((a1,i) => a1 || idx.reduce((a2,j) => a2 && b.marked[i+5*j] === 1, 1), 0);
  };

  const run = (s,b,i) => {
    const winner = b.filter(a => bingo(a));
    if (winner.length > 0) return [i-1, winner[0]];
    if (s.length === 0) return undefined;
    const n = s[0];
    return run(s.slice(1), b.map(a => findNeedle(a,n)), i+1);
  };

  const score = (s,w) => {
    return s[w[0]] * w[1].marked.reduce((a,b,i) => a + ((!b) ? w[1].keys[i] : 0), 0);
  };

  console.log("E1: ", score(stack, run(stack, boards, 0)));
});
