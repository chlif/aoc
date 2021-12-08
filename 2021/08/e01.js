let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const outputs = input => input.map(i => i.split('|')[1].match(/[a-g]{1,8}/g)).reduce((a,b) => [...a,...b], []);
  const findSelected = o => o.filter(a => a.length === 2 || a.length === 3 || a.length === 4 || a.length === 7);

  console.log("E1: ", findSelected(outputs(input)).length);
});
