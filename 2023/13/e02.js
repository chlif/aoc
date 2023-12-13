let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n');

  let patterns = [];
  let current = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== '') current.push(input[i]);
    if (input[i] === '' || i === input.length-1) {
      patterns.push([...current]);
      current = [];
    }
  }

  const checkHorizontalSymmetry = (pattern, row) => {
    for (let i = 0; i < row+1; i++) {
      if (row+i+1 === pattern.length) break;
      if (pattern[row-i] !== pattern[row+i+1]) return false;
    }
    return true;
  };

  const transpose = (pattern) => {
    return [...new Array(pattern[0].length)]
        .map((x,i) => [...new Array(pattern.length)].map((y,j) => pattern[j].charAt(i)).join(''));
  };

  const findCorrectedPattern = (pattern,a,b) => [...pattern.slice(0,a),pattern[b],...pattern.slice(a+1)];

  const findOneOffPos = (a,b) => {
    let diff = -1;
    for (let i = 0; i < a.length; i++) {
      if (a.charAt(i) !== b.charAt(i)) {
        if (diff === -1) diff = i;
        else return -1;
      }
    }
    return diff;
  };

  const symm = patterns.map((pattern,k) => {

    // Horizontal
    for (let i = 0; i < pattern.length-1; i++) {
      for (let j = i+1; j < pattern.length; j = j+2) {
        const oneOff = findOneOffPos(pattern[i], pattern[j])
        if (oneOff > -1) {
          const symmetryLine = i+Math.floor((j-i)/2);
          const cPattern = findCorrectedPattern(pattern,i,j);
          if (checkHorizontalSymmetry(cPattern, symmetryLine)) return 100*(symmetryLine+1);
        }
      }
    }

    // Vertical
    const tPattern = transpose(pattern);
    for (let i = 0; i < tPattern.length-1; i++) {
      for (let j = i+1; j < tPattern.length; j = j+2) {
        const oneOff = findOneOffPos(tPattern[i], tPattern[j])
        if (oneOff > -1) {
          const symmetryLine = i+Math.floor((j-i)/2);
          const cPattern = findCorrectedPattern(tPattern,i,j);
          if (checkHorizontalSymmetry(cPattern, symmetryLine)) return (symmetryLine+1);
        }
      }
    }

    return -1;
  }).reduce((a,x) => a+x, 0);

  console.log("E2: ", symm);
});
