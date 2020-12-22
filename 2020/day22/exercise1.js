let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);

  let decks = [[],[]];
  let player = 0;
  data.split('\n')
      .forEach(c => {
        if (c === '' || c === 'Player 1:') return;
        if (c === 'Player 2:') {
          player = 1;
          return;
        }
        decks[player].push(parseInt(c));
      });

  while (decks[0].length > 0 && decks[1].length > 0) {
    const c1 = decks[0].shift();
    const c2 = decks[1].shift();
    const w = (c1 > c2) ? 0 : 1;
    decks[w].push(Math.max(c1,c2));
    decks[w].push(Math.min(c1,c2));
  }

  const winningDeck = (decks[0].length > 0) ? decks[0] : decks[1];
  const score = winningDeck.reduceRight((a,c,i,d) => a + c * (d.length-i), 0);
  console.log(score);

});
