let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const REG_NUM = /([0-9]*)/g;

  const sum = input
      .map(x => x.split(':')[1].split('|'))
      .map(x => ({
        winning: x[0].split(' ').filter(y => y != '').map(y => eval(y)),
        ticket: x[1].split(' ').filter(y => y != '').map(y => eval(y))
      }))
      .map(x => x.ticket.reduce((a,y) => (x.winning.includes(y))?((a===0)?1:a*2):a, 0))
      .reduce((a,x) => a+x, 0);

  console.log("E1: ", sum);
});
