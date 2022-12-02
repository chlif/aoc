let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const score = input.reduce((a,r) => {
    const parts = r.match(/([ABC]) ([XYZ])/);
    const opp = parts[1];
    const me = pickResponse(opp, parts[2]);
    return a + winScore(opp, me) + rpsScore(me);
  }, 0);
  
  console.log("E2: " + score);
});

const pickResponse = (a,b) => {
  if (a === 'A') {
    switch (b) {
      case 'X': return 'Z';
      case 'Y': return 'X';
      case 'Z': return 'Y';
      default: return;
    }
  } else if (a === 'B') {
    switch (b) {
      case 'X': return 'X';
      case 'Y': return 'Y';
      case 'Z': return 'Z';
      default: return;
    }
  } else {
    switch (b) {
      case 'X': return 'Y';
      case 'Y': return 'Z';
      case 'Z': return 'X';
      default: return;
    }
  }
}

const winScore = (a,b) => {
  if (a === 'A' && b === 'X' || a === 'B' && b === 'Y' || a === 'C' && b === 'Z') return 3;
  if (a === 'A' && b === 'Y' || a === 'B' && b === 'Z' || a === 'C' && b === 'X') return 6;
  return 0;
}

const rpsScore = (a) => {
  switch (a) {
    case 'X': return 1;
    case 'Y': return 2;
    case 'Z': return 3;
    default: return 0;
  }
}