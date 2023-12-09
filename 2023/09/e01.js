let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const series = input.map(x => x.split(' ').map(y => eval(y)));


  const getNextValue = (s) => {
    if (s.reduce((a,x) => a && x === 0, true)) return 0;
    let next = [];
    for (let i = 1; i < s.length; i++) next.push(s[i]-s[i-1]);
    return s[s.length-1] + getNextValue(next);
  };

  const future = series.map(s => getNextValue(s)).reduce((a,x) => a+x, 0);

  console.log("E1: ", future);
});
