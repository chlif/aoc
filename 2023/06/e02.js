let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const t = eval(input[0].split(':')[1].replaceAll(' ', ''));
  const r = eval(input[1].split(':')[1].replaceAll(' ',''));

  for (let s = 1; s < t; s++) {
    if ((t-s)*s > r) {
      console.log("E2: ", (t+1)-2*s);
      break;
    }
  }
});
