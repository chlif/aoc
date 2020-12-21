let fs = require('fs');
const file = './input.txt';
//const file = './test.txt';

const validate = (c, r, i) => {
   //console.log(c, i, r[i]);
  if (c.length === 0) return -1;
  if (!Array.isArray(r[i][0])) return (c[0] === r[i][0]) ? 1 : -1;

  let n = 0;
  for (let j = 0; j < r[i].length; j++) {
    for (let k = 0; k < r[i][j].length; k++) {
      let tmp = validate(c.slice(n), r, r[i][j][k]);
      if (tmp === -1) {
        n = 0;
        break;
      }
      n = n + tmp;
    }
    if (n > 0) break;
  }

  return (n === 0) ? -1 : n;
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const raw = data.split('\n')
      .filter(row => row.length > 0);

  const rules = raw
      .filter(r => r.indexOf(':') !== -1)
      .reduce((a,r) => {
        const key = r.substr(0,r.indexOf(':'));
        const rest = r.substr(r.indexOf(':'));
        if (rest.match(/\"/)) {
          let obj = {};
          obj[key] = [rest.match(/\"(\w+)\"/)[1]];
          return {...a,...obj};
        } else {
          let obj = {};
          if (rest.indexOf('|') !== -1) {
              obj[key] = [rest.substr(0, rest.indexOf('|')),
                  rest.substr(rest.indexOf('|'))]
                .map(r => [...r.matchAll(/(\d+)/g)].map(n => n[1]));
          } else {
            obj[key] = [ [...rest.matchAll(/(\d+)/g)].map(n => n[1]) ];
          }
          return {...a,...obj};
        }
      }, {});
  const codes = raw.slice(Object.keys(rules).length);

  const r = codes.reduce((a,c,i) => {
    const n = validate(c,rules,0);
    //console.log(n, n === c.length);
    return  a + (n === c.length);
  }, 0);
  console.log("=== %s ===", r);

});
