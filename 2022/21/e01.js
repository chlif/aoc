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
        ready: false,
        value: undefined,
        left: calc[2],
        right: calc[4],
        op: calc[3]
      };
    }
    else {
      obj[numb[1]] = {
        ready: true,
        value: parseInt(numb[2])
      };
    }
    return { ...a, ...obj };
  }, {});

  while (true) {
    if (monkeys.root.ready) break;
    Object.keys(monkeys)
      .filter(m => !monkeys[m].ready)
      .forEach(m => {
        if (monkeys[monkeys[m].left].ready && monkeys[monkeys[m].right].ready) {
          monkeys[m].ready = true;
          switch (monkeys[m].op) {
            case '+': 
              monkeys[m].value = monkeys[monkeys[m].left].value + monkeys[monkeys[m].right].value;
              break;
            case '-':
              monkeys[m].value = monkeys[monkeys[m].left].value - monkeys[monkeys[m].right].value;
              break;
            case '*':
              monkeys[m].value = monkeys[monkeys[m].left].value * monkeys[monkeys[m].right].value;
              break;
            case '/':
              monkeys[m].value = monkeys[monkeys[m].left].value / monkeys[monkeys[m].right].value;
              break;
            default: 
              throw new Error("Faulty monkey");
          }
        }
      });
  }

  console.log("E1: ", monkeys.root.value);
});
