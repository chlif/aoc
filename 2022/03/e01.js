let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const priorities = input.map(sack => {
    const l = sack.slice(0,sack.length/2);
    const r = sack.slice(sack.length/2,sack.length);

    const common = l.split('').filter(c => r.includes(c))[0];
    return priority(common);
  }).reduce((a,b) => a+b, 0);

  console.log("E1: " + priorities);
});

const priority = char => {
  const code = char.charCodeAt(0);
  if (code >= 97 && code <= 122) return code-96;
  if (code >= 65 && code <= 90) return code-64+26;
  return 0;
};
