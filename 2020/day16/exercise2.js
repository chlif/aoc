let fs = require('fs');
const file = './input.txt';

const parseInstructions = raw => {
  return raw.reduce((a, l) => {
        const parts = l.match(/([\w ]*): ([\d]{1,3})-([\d]{1,3}) or ([\d]{1,3})-([\d]{1,3})/);
        if (parts === null) return a;
        let obj = {};
        obj[parts[1]] = [ [parseInt(parts[2]),parseInt(parts[3])], [parseInt(parts[4]),parseInt(parts[5])] ];
        return {...a, ...obj};
      }, {});
};

const validate = (t, i) => {
  return t.reduce((a,n) => {
    return a && Object.keys(i).reduce((b,k) => {
      return b ||
          (i[k][0][0] <= n && i[k][0][1] >= n) ||
          (i[k][1][0] <= n && i[k][1][1] >= n);
    }, false);
  }, true);
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const tickets = data.split('\n')
      .filter(row => row.length > 0);

  const y = tickets.indexOf('your ticket:');
  const instr = parseInstructions(tickets.slice(0,y));
  const nearby = tickets.slice(y+3)
      .map(t => t.split(',').map(n => parseInt(n)))
      .filter(t => validate(t, instr));;
  let match = (row => {
    let arr = [];
    for (let i = 0; i < row.length; i++) arr.push(Object.keys(instr));
    return arr;
  })(nearby[0]);

  for (let r = 0; r < nearby.length; r++) {
    for (let c = 0; c < nearby[r].length; c++) {
      const n = nearby[r][c];
      for (let m = 0; m < match[c].length; m++) {
        const i = instr[match[c][m]];
        if ( (i[0][0] <= n && i[0][1] >= n) ||
            (i[1][0] <= n && i[1][1] >= n) ) continue;
        match[c] = [...match[c].slice(0,m),...match[c].slice(m+1)];
        m--;
      }
    }
  }

  let changed = 1;
  while (changed > 0) {
    changed = 0;
    const found = match
      .reduce((a,c) => (c.length === 1) ? [...a, c[0]] : a, []);
    for (let c = 0; c < match.length; c++) {
      if (match[c].length > 1) {
        for (let f = 0; f < found.length; f++) {
          const m = match[c].indexOf(found[f]);
          if (m > -1) {
            match[c] = [...match[c].slice(0,m),...match[c].slice(m+1)];
            changed++;
          }
        }
      }
    }
  }

  const departures = match
      .map((m,i) => (m[0].match(/departure/) ? i : -1))
      .filter(m => m > -1);

  const myTicket = tickets[y+1].split(',').map(n => parseInt(n));

  console.log(departures.reduce((a,i) => a * myTicket[i], 1));

});
