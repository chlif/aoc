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

  const symm = patterns.map(pattern => {

    // Horizontal
    for (let i = 0; i < pattern.length-1; i++) {
      if (pattern[i] === pattern[i+1] && checkHorizontalSymmetry(pattern,i)) return 100*(i+1);
    }

    // Vertical
    const tPattern = transpose(pattern);
    for (let i = 0; i < tPattern.length-1; i++) {
      if (tPattern[i] === tPattern[i+1] && checkHorizontalSymmetry(tPattern, i)) return i+1;
    }

    return -1;
  }).reduce((a,x) => a+x, 0);

  console.log("E1: ", symm);
});
