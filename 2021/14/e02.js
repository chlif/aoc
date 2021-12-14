let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const ruleRegex = /([A-Z]{2}) \-\> ([A-Z]{1})/;
  const charRegex = /([A-Z]{1})/g;

  const template = input => input[0];
  const rules = input => input.slice(1).reduce((acc,row) => {
    let obj = {};
    const parts = row.match(ruleRegex);
    obj[parts[1]] = parts[2];
    return {...acc, ...obj};
  }, {});
  const chars = input => input.reduce((acc,row) => {
    let obj = {};
    row.match(charRegex).forEach(k => obj[k] = 0);
    return {...acc, ...obj};
  }, {});

  const buildCache = (rules,maxDepth) => {
    let cache = {};
    for (let i = 0; i < maxDepth; i++) {
      Object.keys(rules).forEach(key => {
        const uniq = key+eval(i+1);
        let obj = {};

        if (i === 0) {
          if (key.charAt(0) === rules[key]) {
            obj[key.charAt(0)] = 2;
          } else {
            obj[key.charAt(0)] = 1;
            obj[rules[key]] = 1;
          }
        } else {
          [key.charAt(0)+rules[key]+i, rules[key]+key.charAt(1)+i].forEach(cacheKey => {
            Object.keys(cache[cacheKey]).forEach(c => {
              if (c in obj) obj[c] = obj[c] + cache[cacheKey][c];
              else obj[c] = cache[cacheKey][c];
            });
          });
        }

        cache[uniq] = obj;
      });
    }
    return cache;
  };

  const run = (tmpl, cache, depth) => {
    let chars = {};
    tmpl.split('').forEach((a,i) => {
      if (i === tmpl.length-1) {
        chars[tmpl.charAt(i)] = chars[tmpl.charAt(i)] + 1;
        return;
      }
      const uniq = tmpl.substring(i,i+2) + depth;
      Object.keys(cache[uniq]).forEach(c => {
        if (c in chars) chars[c] = chars[c] + cache[uniq][c];
        else chars[c] = cache[uniq][c];
      });
    });
    return chars;
  };

  const countScore = chars => {
    const highest = Object.keys(chars).reduce((a,c) => (chars[c] > a) ? chars[c] : a, 0);
    const lowest = Object.keys(chars).reduce((a,c) => (chars[c] < a) ? chars[c] : a, highest);
    return highest-lowest;
  };

  const rounds = 40;
  console.log("E2: ", countScore(run(template(input),buildCache(rules(input), rounds), rounds)));
});
