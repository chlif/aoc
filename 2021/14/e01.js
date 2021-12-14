let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const ruleRegex = /([A-Z]{2}) \-\> ([A-Z]{1})/;

  const template = input => input[0];
  const rules = input => input.slice(1).reduce((acc,row) => {
    let obj = {};
    const parts = row.match(ruleRegex);
    obj[parts[1]] = parts[2];
    return {...acc, ...obj};
  }, {});

  const run = (tmpl, rules, rounds) => {
    if (rounds === 0) return tmpl;
    return run(
      tmpl.split('').reduce((str,c,i,t) => {
        if (i === t.length-1) return str + c;
        return str + c + rules[tmpl.substring(i,i+2)];
      }, ''),
      rules,
      rounds-1
    );
  };

  const countScore = tmpl => {
    let chars = tmpl.split('').reduce((acc, c) => {
      let obj = {};
      if (c in acc) obj[c] = acc[c] + 1;
      else obj[c] = 1;
      return {...acc,...obj};
    }, {});
    let highest = Object.keys(chars).reduce((a,b) => (chars[b] > a) ? chars[b] : a, 0);
    let lowest = Object.keys(chars).reduce((a,b) => (chars[b] < a) ? chars[b] : a, highest);
    return highest-lowest;
  };

  console.log("E1: ", countScore(run(template(input),rules(input),10)));
});
