let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const w = 10;
  const buildMap = raw => raw.reduce((a,s) => a+s, '').split('').map(i => parseInt(i));
  const findAdjacentIds = (i,m) => [i-w-1,i-w,i-w+1,i-1,i+1,i+w-1,i+w,i+w+1]
      .filter(j => {
        if (j < 0 && j >= m.length) return false;
        if (Math.abs(j-i) === 1 && Math.floor(j/w) !== Math.floor(i/w)) return false;
        if (j-i < -1 && Math.floor(j/w) !== Math.floor((i-w)/w)) return false;
        if (j-i > 1 && Math.floor(j/w) !== Math.floor((i+w)/w)) return false;
        return true;
      });

  const round = m => {
    let mR = m.map(i => i+1);
    let flashes = [];
    let flashesOnThisRound = 0;
    const flash = j => findAdjacentIds(j,m).forEach(k => mR[k]++);
    while (true) {
      mR
        .map((p,i) => (p > 9) ? i : -1)
        .filter(p => p !== -1 && !flashes.includes(p))
        .forEach(p => {
          flash(p);
          flashes.push(p)
          flashesOnThisRound++;
        });
      if (flashesOnThisRound === 0) break;
      flashesOnThisRound = 0;
    }
    return [flashes.length, mR.map(p => (p > 9) ? 0 : p)];
  };

  const run = m => {
    let counter = 0;
    let mR = [...m];
    for (let i = 0; i < 100; i++) {
      let tmp = round(mR);
      counter += tmp[0];
      mR = tmp[1];
      //print(mR);
    }
    return counter;
  };

  const print = m => {
    let str = '';
    for (let i = 0; i < 100; i++) {
      if (i%10 === 0) str += '\n';
      str += m[i];
    }
    console.log(str);
  };

  console.log("E1: ", run(buildMap(input)));
});
