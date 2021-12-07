let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const crabs = (d => d[0].split(',').map(i => parseInt(i)))(input);
  const min = c => c.reduce((a,b) => (a === undefined || b < a) ? b : a, undefined);
  const max = c => c.reduce((a,b) => (a === undefined || b > a) ? b : a, undefined);

  const fib = a => (a <= 1) ? a : a + fib(a-1);
  const fuel = (point,c) => c.reduce((acc,b) => acc + fib(Math.abs(point-b)), 0);

  const bruteFind = c => {
    const lowest = min(c);
    const highest = max(c);
    return min(
        [...Array(highest-lowest)].map((a,i) => lowest+i)
        .map(p => fuel(p,c))
    );
  };

  console.log("E2: ", bruteFind(crabs));
});
