let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const times = input[0].split(':')[1].split(' ').filter(x => x != '').map(x => eval(x));
  const records = input[1].split(':')[1].split(' ').filter(x => x != '').map(x => eval(x));

  const results = times.map((t,i) => {
      const r = records[i];
      for (let s = 1; s < t; s++) {
        if ((t-s)*s > r) return (t+1)-2*s;
      }
    }).reduce((a,x) => a*x, 1);

  console.log("E1: ", results);
});
