let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0)[0];

  for (let i = 4; i < input.length; i++) {
    if (input
        .substring(i-4,i)
        .split('')
        .filter((c,i,seq) => !seq.slice(i+1).join('').includes(c))
        .join('').length === 4) {
          console.log("E1: ",i);
          break;
        }
  }
});
