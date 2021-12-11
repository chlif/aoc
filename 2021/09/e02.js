let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const w = input[0].length;
  const field = input.reduce((a,r) => a+r, "").split("").map(i => parseInt(i));

  const findAdjacentIds = (i,m) => [i-w,i-1,i+1,i+w].filter(j => j >= 0 && j < m.length && (Math.abs(j-i) > 1 || Math.floor(j/w) === Math.floor(i/w)) );

  const lowpoints = f => {
    return f.map((p,i,m) => {
      const isLowpoint = findAdjacentIds(i,m)
          .map(j => parseInt(m[j]))
          .reduce((a,j) => a && j > parseInt(p), true);
      return (isLowpoint) ? i : -1;
    }).filter(i => i > -1);
  };

  const countBasin = (basin,idx,f) => {
    if (idx > basin.length) return basin.length;
    const neighboursInBasin = findAdjacentIds(basin[idx],f).filter(j => f[j] < 9).filter(j => !basin.includes(j));
    return countBasin([...basin,...neighboursInBasin],idx+1,f);
  }

  const basins = f => {
    return lowpoints(f).map(lp => countBasin([lp], 0, f));
  };

  const multiplyTopThree = b => b.sort((i1,i2) => i2-i1).slice(0,3).reduce((a,i) => a*i, 1);

  console.log("E2: ", multiplyTopThree(basins(field)));
});
