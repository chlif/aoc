let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const series = input.map(x => x.split(' ').map(y => eval(y)));


  const getPrevValue = (s) => {
    if (s.reduce((a,x) => a && x === 0, true)) return 0;
    let next = [];
    for (let i = 1; i < s.length; i++) next.push(s[i]-s[i-1]);
    return s[0] - getPrevValue(next);
  };

  const prev = series.map(s => getPrevValue(s)).reduce((a,x) => a+x, 0);

  console.log("E2: ", prev);
});
