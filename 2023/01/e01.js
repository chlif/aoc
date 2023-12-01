let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const values = input
      .map(x => x.split('').filter(a => !isNaN(a)))
      .map(x => eval( x[0] + '' + x[x.length-1] ))
      .reduce((a,x) => a+x, 0);
  
  console.log("E1: " + values);
});
