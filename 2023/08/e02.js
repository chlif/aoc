let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const REGEXP_NODE = /([0-9A-Z]{3}) \= \(([0-9A-Z]{3}), ([0-9A-Z]{3})\)/;

  // Parse
  const steps = input[0];
  const nodes = input.slice(1).map(x => {
      const m = x.match(REGEXP_NODE);
      return [m[1],m[2],m[3]];
    })
    .reduce((a,x) => {
      let obj = {};
      obj[x[0]] = { L: x[1], R: x[2] };
      return { ...a, ...obj };
    }, {});

  // Run
  const As = Object.keys(nodes).filter(x => x.charAt(2) === 'A');
  const Zs = Object.keys(nodes).filter(x => x.charAt(2) === 'Z');

  let register = {};
  let unfound = [...As];
  let current = [...As];
  let step = 0;
  let round = steps.length;

  while (true) {
    current = current.map(x => nodes[x][steps.charAt(step%round)]);
    current.forEach((x,i) => {
      if (Zs.includes(x) && unfound.includes(As[i])) {
        register[As[i]] = step+1;
        unfound.splice(unfound.indexOf(As[i]), 1);
      }
    });
    step++;
    if (current.reduce((a,x) => a && Zs.includes(x), true)) break;
    if (unfound.length === 0) break;
  }

  const min = (n1,n2) => (n1 <= n2) ? n1 : n2;
  const max = (n1,n2) => (n1 >= n2) ? n1 : n2;

  const gcd = (n1,n2) => {
    if (min(n1,n2) === BigInt(0)) return max(n1,n2);
    return gcd( max(n1,n2) % min(n1,n2), min(n1,n2) );
  };

  const gcdOverArray = (a) => {
    if (a.length > 2) return gcd(a[0], gcdOverArray(a.slice(1)));
    return gcd(a[0],a[1]);
  };

  const ghosts = Object.keys(register).map(k => BigInt(register[k]));
  const lcm = ghosts.reduce((a,b) => a*b, BigInt(1)) / ghosts.slice(1).reduce((a,b) => a*gcdOverArray(ghosts), BigInt(1));

  console.log("E2: ", lcm.toString());
});
