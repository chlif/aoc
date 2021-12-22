let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const parse = input => input.map(p => {
    const r = p.match(/[0-9]/g);
    return {
      id: r[0],
      space: parseInt(r[1]),
      score: 0
    };
  });

  let next = 1;
  let rolls = 0;
  const roll = () => {
    const r = next;
    rolls = rolls+1;
    next = (next === 100) ? 1 : next+1;
    return r;
  }

  const turn = () => [...Array(3)].map(x => roll());

  const play = players => {
    while (true) {
      for (let i = 0; i < players.length; i++) {
        const steps = turn().reduce((a,b) => a+b, 0);
        let space = players[i].space + steps;
        players[i].space = (space % 10 === 0) ? 10 : space % 10;
        players[i].score = players[i].score + players[i].space;
        if (players[i].score >= 1000) break;
      }
      if (players.reduce((a,b) => (a === undefined || b.score > a) ? b.score : a, 0) >= 1000) break;
    }
    return players.reduce((a,b) => (a === undefined || b.score < a) ? b.score : a, undefined) * rolls;
  };

  console.log("E1: ", play(parse(input)));
});
