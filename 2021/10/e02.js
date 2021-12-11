let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const scoreboard = {
    ')': 1, ']': 2, '}': 3, '>': 4
  };
  const score = chars => chars.reduce((a,c) => a*5 + scoreboard[c], 0)

  const closingCharacters = {
    '(': ')', '[': ']', '{': '}', '<': '>'
  };
  const isCorrectClosingCharacter = (open, close) => closingCharacters[open] === close;

  const autocorrect = (l,s) => {
    if (l.length === 0)
      return s.map(c => closingCharacters[c]);

    const c = l.charAt(0);
    if (c === '(' || c === '[' || c === '{' || c === '<')
      return autocorrect(l.substring(1), [c, ...s]);
    if (s.length > 0 && isCorrectClosingCharacter(s[0],c))
      return autocorrect(l.substring(1), s.slice(1));
    return false;
  }

  const findAdditionalCharacters = raw => raw.map(line => autocorrect(line, [])).filter(c => c !== false);

  const findMiddleScore = chars => chars.map(score).sort((i1,i2) => i2-i1)[Math.floor(chars.length/2)];

  console.log("E2: ", findMiddleScore(findAdditionalCharacters(input)));
});
