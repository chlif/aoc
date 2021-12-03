let fs = require('fs');
const file = './input.txt';


fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  // Exercise 2
  const common = s => s.reduce((a,r) =>
    a.map((v,i) => v + ((r.charAt(i) === '1') ? 1 : -1))
    , Array.from(Array(s[0].length)).map(i => 0));
  const rate = (s,i, needle) => {
    if (s.length === 1) return s[0];
    const n = needle(s,i);
    return rate(s.filter(v => v.charAt(i) === n), i+1, needle);
  };
  const oxygen = (s,i) => rate(s,i,(s1,i1) => (common(s1)[i1] < 0) ? '0' : '1');
  const co2 = (s,i) => rate(s,i,(s1,i1) => (common(s1)[i1] >= 0) ? '0' : '1');

  const multiply = (s1,s2) => {
    return parseInt(s1, 2) * parseInt(s2, 2);
  };

  console.log("E2: ", multiply(oxygen(input, 0), co2(input, 0)));
});
