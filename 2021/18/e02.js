let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const depth = stack => stack.reduce((a,c) => a + ((c === '[') ? 1 : ((c === ']') ? -1 : 0)), 0)

  const explode = (num, stack) => {
    if (num.length === 0) return false;
    let numeric = num.match(/^([0-9]+)/);
    if (numeric) return explode(num.substring(numeric[0].length), [parseInt(numeric[0]), ...stack]);
    if (num.charAt(0) === ']' && stack.length >= 3 && Number.isInteger(stack[0]) && stack[1] === ',' && Number.isInteger(stack[2]) && depth(stack) > 4) {
      const left = stack[2];
      const right = stack[0];
      const matchForRight = num.match(/([0-9]+)/);
      let numToLeft = '';
      let numToRight = '';

      for (let i = 3; i < stack.length; i++) {
        if (Number.isInteger(stack[i])) {
          stack[i] = stack[i] + left;
          break;
        }
      }
      numToLeft = [...stack.slice(4)].reduceRight((a,b) => a+''+b, '');

      if (matchForRight) {
        numToRight = num.substring(1, matchForRight.index) +
            eval(right + parseInt(matchForRight[0]))
            + num.substring(matchForRight.index + matchForRight[0].length);
      } else {
        numToRight = num.substring(1);
      }

      return numToLeft + '0' + numToRight;
    }
    return explode(num.substring(1), [num.charAt(0), ...stack]);
  };

  const split = num => {
    const high = num.match(/([0-9]{2})/);
    if (high === null) return false;
    const v = parseInt(high[0]);
    return num.substring(0,high.index) +
     '[' + Math.floor(v/2) + ',' + Math.ceil(v/2) + ']' +
      num.substring(high.index+2);
  };

  const add = (n1,n2) => {
    let num = '['+n1+','+n2+']';
    while (true) {
      const e = explode(num, []);
      if (e) {
        num = e;
        continue;
      }
      const s = split(num);
      if (s) {
        num = s;
        continue;
      }
      break;
    }
    return num;
  };

  const addPairs = input => {
    let magnitudes = [];
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (i === j) continue;
        magnitudes.push(magnitude(add(input[i],input[j])));
      }
    }
    return magnitudes.reduce((a,b) => (a === undefined || b > a) ? b : a, undefined);
  };

  const magnitude = (num, stack = []) => {
    if (num.length === 0) return stack[0];
    let numeric = num.match(/^([0-9]+)/);
    if (numeric) return magnitude(num.substring(numeric[0].length), [parseInt(numeric[0]), ...stack]);
    if (num.charAt(0) === ']') {
      return magnitude(num.substring(1), [ 2*stack[0]+3*stack[1], ...stack.slice(2) ]);
    }
    return magnitude(num.substring(1), stack);
  };

  console.log("E2: ", addPairs(input));
});
