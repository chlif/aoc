let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const W = input[0].length;
  const H = input.length;
  const map = input.flatMap(r => r.split(''));

  const isRightBorder = p => p%W === W-1;
  const isBottomBorder = p => Math.floor(p/W) === H-1;
  const isLeftBorder = p => p%W === 0;
  const isTopBorder = p => Math.floor(p/W) === 0;

  let energized = [];
  let beams = [ [0, 'R'] ];

  const energize = p => {
    if (!energized.includes(p)) energized.push(p);
  };

  const move = i => {
    switch (beams[i][1]) {
      case 'R':
        if (isRightBorder(beams[i][0])) {
          beams.splice(i,1);
          return false;
        }
        else beams[i][0] += 1;
        break;
      case 'D':
        if (isBottomBorder(beams[i][0])) {
          beams.splice(i,1);
          return false;
        }
        else beams[i][0] += W;
        break;
      case 'L':
        if (isLeftBorder(beams[i][0])) {
          beams.splice(i,1);
          return false;
        }
        else beams[i][0] -= 1;
        break;
      case 'U':
        if (isTopBorder(beams[i][0])) {
          beams.splice(i,1);
          return false;
        }
        else beams[i][0] -= W;
        break;
    }
    return true;
  }

  const reflect = i => {
    if (map[beams[i][0]] === '/') {
      switch (beams[i][1]) {
        case 'R':
          beams[i][1] = 'U';
          break;
        case 'D':
          beams[i][1] = 'L';
          break;
        case 'L':
          beams[i][1] = 'D';
          break;
        case 'U':
          beams[i][1] = 'R';
          break;
      }
    }
    else if (map[beams[i][0]] === '\\') {
      switch (beams[i][1]) {
        case 'R':
          beams[i][1] = 'D';
          break;
        case 'D':
          beams[i][1] = 'R';
          break;
        case 'L':
          beams[i][1] = 'U';
          break;
        case 'U':
          beams[i][1] = 'L';
          break;
      }        
    }
  }

  const split = i => {
    if (map[beams[i][0]] === '-' && (beams[i][1] === 'D' || beams[i][1] === 'U')) {
      if (!isRightBorder(beams[i][0])) beams.push([beams[i][0]+1, 'R']);
      if (!isLeftBorder(beams[i][0])) beams.push([beams[i][0]-1, 'L']);
      beams.splice(i,1);
      return true;
    }
    else if (map[beams[i][0]] === '|' && (beams[i][1] === 'R' || beams[i][1] === 'L')) {
      if (!isBottomBorder(beams[i][0])) beams.push([beams[i][0]+W, 'D']);
      if (!isTopBorder(beams[i][0])) beams.push([beams[i][0]-W, 'U']);
      beams.splice(i,1);
      return true;
    }
    return false;
  };
  
  const trackerKey = (beam) => beam[0]+'-'+beam[1];
  let tracker = [];

  while (beams.length) {
    for (let i = 0; i < beams.length; i++) {
      if (tracker.includes(trackerKey(beams[i]))) {
        beams.splice(i,1);
        i--;
        continue;
      } else {
        tracker.push(trackerKey(beams[i]));
      }

      energize(beams[i][0]);
      if (split(i)) {
        i--;
        continue;
      }
      reflect(i);
      if (!move(i)) {
        i--;
      }
    }
  }

  const print = () => {
    const m = map.map((x,i) => (energized.includes(i)) ? '#' : x);
    for (let i = 0; i < H; i++) console.log(m.slice(i*W, (i+1)*W).join(''));
  };

  //print();

  console.log("E1: ", energized.length);
});
