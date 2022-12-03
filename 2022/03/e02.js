let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const groups = [];
  const groupCount = input.length/3;
  for (let i = 0; i < groupCount; i++) {
    groups.push(input.slice(i*3,i*3+3));
  }
  
  const badges = groups.map(g => {
    return g[0].split('').filter(c => g[1].includes(c) && g[2].includes(c))[0];
  }).map(priority).reduce((a,b) => a+b, 0);

  console.log("E2: " + badges);
});

const priority = char => {
  const code = char.charCodeAt(0);
  if (code >= 97 && code <= 122) return code-96;
  if (code >= 65 && code <= 90) return code-64+26;
  return 0;
};
