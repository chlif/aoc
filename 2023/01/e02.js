let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  
  const nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',0,1,2,3,4,5,6,7,8,9];

  const values = input
      .map(x => {
        const b = nums.map((y,i) => [x.indexOf(y),isNaN(y)?i:y]).filter(y => y[0] > -1);
        const l = nums.map((y,i) => [x.lastIndexOf(y),isNaN(y)?i:y]).filter(y => y[0] > -1);
        return [...b,...l].sort((a,b) => a[0]-b[0]).map(y => y[1]);
      })
      .map(x => eval( x[0] + '' + x[x.length-1] ))
      .reduce((a,x) => a+x, 0);

  console.log("E1: " + values);
});
