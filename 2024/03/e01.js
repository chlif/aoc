let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  
  const input = data.split('\n').filter(row => row.length > 0).join('');

  const regex = /mul\(([0-9]{1,3})\,([0-9]{1,3})\)/g;
  let count = [...input.matchAll(regex)]
            .map(x => parseInt(x[1]) * parseInt(x[2]))
            .reduce((a,x) => a+x, 0);

  console.log("E1: ", count);
});
