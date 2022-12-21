let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  let monkeys = input.reduce((a,r) => {
    const calc = r.match(/([a-z]{4})\: ([a-z]{4}) ([\+\-\*\/]{1}) ([a-z]{4})/);
    const numb = r.match(/([a-z]{4})\: ([0-9]*)/);
    let obj = {};
    if (calc) {
      obj[calc[1]] = {
        number: false,
        value: undefined,
        left: calc[2],
        right: calc[4],
        op: calc[3]
      };
    }
    else {
      obj[numb[1]] = {
        number: true,
        value: (numb[1] === 'humn') ? 'x' : parseInt(numb[2])
      };
    }
    return { ...a, ...obj };
  }, {});

  const parse = (key) => {
    if (monkeys[key].number) return monkeys[key].value;
    const sub = '(' + parse(monkeys[key].left) + monkeys[key].op + parse(monkeys[key].right) + ')';
    if (!sub.includes('x')) return eval(sub);
    return sub;
  };

  const resolve = (key, a) => {
    if (monkeys[key].number) return monkeys[key].value;
    
    if (monkeys[key].left === 'humn' || monkeys[key].rigth === 'humn') {
      const y = (monkeys[key].left === 'humn') ? parse(monkeys[key].right) : parse(monkeys[key].left);
      const isL = (monkeys[key].left === 'humn');

      if (isL) {
        switch (monkeys[key].op) {
          case '+': return a - y; 
          case '-': return a + y; 
          case '*': return a / y; 
          case '/': return a * y; 
          default: return 0;
        }
      } else {
        switch (monkeys[key].op) {
          case '+': return a - y; 
          case '-': return a + y;
          case '*': return a / y;
          case '/': return y / a;
          default: return 0;
        } 
      }

      console.log(y, monkeys[key], a);
      return;
    }

    const l = parse(monkeys[key].left);
    const r = parse(monkeys[key].right);

    if (!isNaN(l)) {
      let na;
      switch (monkeys[key].op) {
        case '+': na = a - l; break;
        case '-': na = l - a; break;
        case '*': na = a / l; break;
        case '/': na = l / a; break;
        default: break;
      }
      return resolve(monkeys[key].right, na);
    }
    if (!isNaN(r)) {
      let na;
      switch (monkeys[key].op) {
        case '+': na = a - r; break;
        case '-': na = a + r; break;
        case '*': na = a / r; break;
        case '/': na = a * r; break;
        default: break;
      }
      return resolve(monkeys[key].left, na);
    }
  }

  const left = parse(monkeys.root.left);
  const right = parse(monkeys.root.right);
  let x = (isNaN(left)) ? resolve(monkeys.root.left, right) : resolve(monkeys.root.right, left);
  console.log("E2: ", x);

});
/*
l + r = a => r = a - l
l - r = a => r = l - a
l * r = a => r = a / l 
l / r = a => r = l / a

l + r = a => l = a - r
l - r = a => l = a + r
l * r = a => l = a / r
l / r = a => l = a * r
*/