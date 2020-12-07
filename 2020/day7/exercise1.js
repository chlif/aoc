let fs = require('fs');
const file = './input.txt';

const findAllHolderColors = (seed, rules, known, i) => {
  if (i === known.length) return known;
  return findAllHolderColors(seed, rules, [
    ...known,
    ...findHolderColors((i === -1) ? seed : known[i], rules)
        .filter(holder => !known.includes(holder))
  ], i+1);
};

const findHolderColors = (color, rules) => {
  const regexp = new RegExp(`([a-z]* [a-z]*) bags contain .* ${color} bag.*`);
  return rules
      .filter(line => regexp.test(line))
      .map(line => line.match(/([a-z]* [a-z]*)/)[1]);
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const rules = data.split('\n');
  console.log(findAllHolderColors('shiny gold', rules, [], -1).length);
});
