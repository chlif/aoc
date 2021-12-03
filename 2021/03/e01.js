let fs = require('fs');
const file = './input.txt';


fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  // Exercise 1
  const gamma = s => s.reduce((a,r) =>
    a.map((v,i) => v + ((r.charAt(i) === '1') ? 1 : -1))
    , Array.from(Array(s[0].length)).map(i => 0))
    .map(v => (v > 0) ? 1 : 0);
  const reverse = a => a.map(v => (v === 0) ? 1 : 0);
  const epsilon = s => reverse(gamma(s));
  const multiply = (s1,s2) => {
    return parseInt(s1.join(''), 2) * parseInt(s2.join(''), 2);
  };

  console.log("E1: ", multiply(gamma(input), epsilon(input)));
});
