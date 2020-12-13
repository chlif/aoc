let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const notes = data.split('\n')
      .filter(row => row.length > 0);

  const arrival = parseInt(notes[0]);
  const r = notes[1].split(',')
      .filter(b => b !== 'x' && b.length > 0)
      .map(b => parseInt(b))
      .reduce((acc, b) => {
        const wait = Math.ceil(arrival/b)*b - arrival;
        if (acc[1] === -1 || acc[1] > wait) return [b, wait];
        return acc;
      }, [-1, -1])
      .reduce((acc, m) => acc * m, 1);

  console.log(r);

});
