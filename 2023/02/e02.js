let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const LIMITS = { red: 12, green: 13, blue: 14 };

  const regGame = /Game ([0-9]*)\:/;
  const regColor = / ([0-9]*) (red|green|blue)/g;
  const games = input.map(x => {
    const id = eval(x.match(regGame)[1]);
    let colors = { red: 0, blue: 0, green: 0 };
    [...x.matchAll(regColor)]
        .forEach(y => { if (colors[y[2]] < eval(y[1])) colors[y[2]] = eval(y[1]) });
    return { id, colors };
  });

  const sum = games
      .map(x => Object.keys(x.colors).reduce((a,c) => a * x.colors[c], 1))
      .reduce((a,x) => a+x, 0)

  console.log("E2: " + sum);
});
