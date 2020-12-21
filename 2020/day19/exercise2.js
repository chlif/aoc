let fs = require('fs');
const file = './input2.txt';
//const file = './test2.txt';
//const file = './test3.txt';

const validate = (c, r, i) => {
  // console.log(c, i, r[i]);
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

const begin = (c, r) => {
  // The compination can be any N*42 followed by M*31
  // Where M < N

  let i = 0;
  let N = 0;
  let M = 0;
  while (true) {
    let l = validate(c.slice(i), r, 42);
    if (l !== -1) { N++; i = i + l; }
    else if (i === 0 || N < 2) { return false; }
    else { break; }
  }
  while (true) {
    let l = validate(c.slice(i), r, 31);
    if (l !== -1) {
      M++; i = i + l;
      if (i === c.length) return M < N;
    } else {
      return false;
    }
  }
}

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
              obj[key] = rest.split('|')
                .map(r => [...r.matchAll(/(\d+)/g)].map(n => n[1]));
          } else {
            obj[key] = [ [...rest.matchAll(/(\d+)/g)].map(n => n[1]) ];
          }
          return {...a,...obj};
        }
      }, {});
  const codes = raw.slice(Object.keys(rules).length);

  const r = codes.reduce((a,c,i) => {
    const n = begin(c,rules);
    return  a + ((n) ? 1 : 0);
  }, 0);
  console.log("=== %s ===", r);

});
