let fs = require('fs');
const file = './input.txt';
const outerRegex = /([a-z]* [a-z]*) bags contain (.*)/
const innerRegex = /([0-9]*) ([a-z]* [a-z]*)/g

const parseRule = rule => {
  const outer = rule.match(outerRegex);
  const inner = [...outer[2].matchAll(innerRegex)]
      .map(color => ({ count: parseInt(color[1]), name: color[2] }))
      .filter(color => color.name !== 'other bags');

  return {
    name: outer[1],
    contain: inner
  };
};

const countNeededBags = (color, rules) => {
  return rules.filter(rule => rule.name === color)[0]
      .contain.reduce((acc, c) =>
        acc + c.count + c.count * countNeededBags(c.name, rules)
      , 0);
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const rules = data.split('\n')
      .filter(rule => rule.length !== 0)
      .map(parseRule);

  console.log(countNeededBags('shiny gold', rules));
});
