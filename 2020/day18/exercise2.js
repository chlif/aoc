let fs = require('fs');
const file = './input.txt';
const testSet = '1 + (2 * 3) + (4 * (5 + 6))\n2 * 3 + (4 * 5)\n5 + (8 * 3 + 9 + 3 * 4 * 3)\n5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))\n((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2\n';

const step = (e, q, s) => {
  if (e.length === 0) return [...q, ...s];
  if (e[0] === ' ') return step(e.slice(1), q, s);
  let num = e.match(/^([\d]+)/);
  if (num !== null) {
    return step(e.slice(num[1].length), [...q, parseInt(num[1])], s);
  }
  const c = e.charAt(0);
  if (c === '+' || c === '*') {
    let i = 0;
    let qn = [];
    while (s[i] === '+' || (c === '*' && s[i] === '*')) {
      qn.push(s[i]);
      i++;
    }
    return step(e.slice(1), [...q,...qn], [c,...s.slice(i)]);
  }
  if (c === '(') {
    return step(e.slice(1), q, [c,...s]);
  }
  if (c === ')') {
    let i = 0;
    let qn = [];
    while (s[i] !== '(' && i < s.length) {
      qn.push(s[i]);
      i++;
    }
    return step(e.slice(1), [...q,...qn], s.slice(i+1));
  }
  throw `Unknown operator or character ${c}`;
}

const reversePolish = q => {
  let i = 0;
  let t = null;
  while (i < q.length && q.length > 1) {
    if (!isNaN(q[i])) {
      i++;
      continue;
    }
    if (q[i-2] === undefined || q[i-1] === undefined) throw `Error counting the queue`;
    if (q[i] === '+') t = q[i-2] + q[i-1];
    if (q[i] === '*') t = q[i-2] * q[i-1];
    q = [...q.slice(0,i-2), t, ...q.slice(i+1)];
    i = i-2;
  }
  return q[0];
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  let expressions = data.split('\n')
  //let expressions = testSet.split('\n')
      .filter(row => row.length > 0);

  const r = expressions.reduce((a,e) => a + reversePolish(step(e,[],[])), 0);
  console.log(r);

});
