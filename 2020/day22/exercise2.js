let fs = require('fs');
const file = './input.txt';
//const file = './test.txt';

let game = (d1,d2) => {
  let history = [];
  const isRepetive = (sd1,sd2) => {
    for (let i = 0; i < history.length; i++) {
      if (history[i][0].join(',') === sd1.join(',') ||
          history[i][1].join(',') === sd2.join(',')) return true;
    }
    return false;
  };

  let p1 = [...d1];
  let p2 = [...d2];
  while (p1.length > 0 && p2.length > 0) {
    if (isRepetive(p1,p2)) return [[...p1,...p2], []];
    history.push([[...p1],[...p2]]);
    const c1 = p1.shift();
    const c2 = p2.shift();
    if (c1 <= p1.length && c2 <= p2.length) {
      if (game(p1.slice(0,c1), p2.slice(0,c2))[0].length > 0)
        p1.push(c1,c2);
      else
        p2.push(c2,c1);
    } else {
      if (c1 > c2) p1.push(c1,c2);
      else p2.push(c2,c1);
    }
  }

  return [p1,p2];
};

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

  const results = game(decks[0], decks[1]);
  const winningDeck = (results[0].length > 0) ? results[0] : results[1];
  const score = winningDeck.reduceRight((a,c,i,d) => a + c * (d.length-i), 0);
  console.log(score);

});
