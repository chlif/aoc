let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const REG_NUM = /([0-9]*)/g;

  const cards = input
      .map(x => x.split(':')[1].split('|'))
      .map(x => ({
        winning: x[0].split(' ').filter(y => y != '').map(y => eval(y)),
        ticket: x[1].split(' ').filter(y => y != '').map(y => eval(y))
      }))
      .map(x => x.ticket.reduce((a,y) => (x.winning.includes(y))?a+1:a, 0));
  
  let count = 0;
  let amounts = [...cards].map(x => 1);
  for (let i = 0; i < cards.length; i++) {
    count += amounts[i];
    for (let j = 1; j <= cards[i]; j++) {
      amounts[i+j] += amounts[i];
    }
  }

  console.log("E2: ", count);
});
