let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const scoreboard = {
    ')': 3, ']': 57, '}': 1197, '>': 25137
  };

  const isCorrectClosingCharacter = (open, close) => {
    switch (open) {
      case '(':
        return close === ')';
      case '[':
        return close === ']';
      case '{':
        return close === '}';
      case '<':
        return close === '>';
      default:
        return false;
    }
  };

  const validate = (l,s) => {
    if (l.length === 0) return true;
    const c = l.charAt(0);
    if (c === '(' || c === '[' || c === '{' || c === '<')
      return validate(l.substring(1), [c, ...s]);
    if (s.length > 0 && isCorrectClosingCharacter(s[0],c))
      return validate(l.substring(1), s.slice(1));
    return c;
  }

  const findInvalidClosingCharacters = raw => raw.map(line => validate(line, [])).filter(c => c !== true);

  const score = chars => chars.reduce((a,c) => a + scoreboard[c], 0)

  console.log("E1: ", score(findInvalidClosingCharacters(input)));
});
