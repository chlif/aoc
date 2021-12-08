let fs = require('fs');
const file = './input.txt';
const stepRegex = /([a-z]*)\ ([0-9]*)/;

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  console.log("E1: " + input);
});
