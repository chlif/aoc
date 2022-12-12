let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  let monkeys = parseMonkeys(input);

  for (let round = 0; round < 20; round++) {
    for (let i in monkeys) {
      monkeys[i].handled += monkeys[i].items.length;
      monkeys[i].items = monkeys[i].items.map(monkeys[i].calc)
      while (monkeys[i].items.length) {
        const next = monkeys[i].items.shift();
        monkeys[((next % monkeys[i].divider === 0) ? monkeys[i].dest[0] : monkeys[i].dest[1])].items.push(next);
      }
    }
  }

  console.log("E1: ", monkeys.map(m => m.handled).sort((a,b) => b-a).slice(0,2).reduce((a,b) => a*b, 1));
});

const parseMonkeys = (input) => {
  // All monkeys are 6 lines of specs
  const count = Math.floor(input.length/6);
  let monkeys = [...new Array(count)].map(a => ({ handled: 0 }));

  for (let i = 0; i < count; i++) {
    const raw = input.slice(i*6, (i+1)*6);
    monkeys[i].items = raw[1].split(':')[1].split(',').map(a => parseInt(a));
    monkeys[i].calc = buildCalculation(raw[2].split('old ')[1].split(' '));
    monkeys[i].divider = parseInt(raw[3].split('by ')[1]);
    monkeys[i].dest = [ parseInt(raw[4].split('ey ')[1]), parseInt(raw[5].split('ey ')[1]) ];
  }

  return monkeys;
};

const buildCalculation = (parts) => {
  if (parts[1] === 'old') {
    return (parts[0] === '+') ? (x) => Math.floor((x+x)/3) : (x) => Math.floor((x*x)/3);
  }
  const factor = parseInt(parts[1]);
  return (parts[0] === '+') ? (x) => Math.floor((x+factor)/3) : (x) => Math.floor((x*factor)/3);
};