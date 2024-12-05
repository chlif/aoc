let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const regexInstruction = /([0-9]+)\|([0-9]+)/;
  const instructions = input
      .filter(r => r.indexOf('|') > -1)
      .map(r => {
        const parts = [...r.match(regexInstruction)];
        const a = parseInt(parts[1]);
        const b = parseInt(parts[2]);
        return [a,b]
      });
  const pages = input
      .filter(r => r.indexOf('|') === -1)
      .map(r => r.split(',').map(n => parseInt(n)));

  let rules = {};
  instructions.forEach(i => {
      if (rules[i[0]] === undefined) rules[i[0]] = [ [], [] ];
      if (rules[i[1]] === undefined) rules[i[1]] = [ [], [] ];
      rules[i[0]][1].push(i[1]);
      rules[i[1]][0].push(i[0]);
    });
  
  const common = (a,b) => {
      let result = [];
      for (let i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) > -1) result.push(a[i]);
      }
      return result;
    };

  const ruleSort = (a,b) => {
      if (rules[a][0].indexOf(b) > -1) return 1;
      if (rules[a][1].indexOf(b) > -1) return -1;
      return 0;
    };

  const fixed = pages.filter(p => {
      for (let i = 0; i < p.length; i++) {
        const x = p[i];
        const left = p.slice(0,i);
        const right = p.slice(i+1);
        if ( common(left, rules[x][1]).length > 0 || common(right, rules[x][0]).length > 0 ) {
          return true;
        }
      }
      return false;
    }).map(r => r.sort(ruleSort));
  
  const count = fixed.reduce((a, p) => {
      const i = Math.floor(p.length/2);
      return a = a + p[i];
    }, 0);

  console.log("E2: ", count);
});
