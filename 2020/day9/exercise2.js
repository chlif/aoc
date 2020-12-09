let fs = require('fs');
const file = './input.txt';

const validate = (i, code) => {
  return code.slice(i-25, i)
    .map((num1, j) => {
      return code.slice(i-25+j, i)
        .reduce((acc, num2) => {
          return acc || (num1 !== num2 && num1+num2 === code[i]);
        }, false)
    })
    .reduce((acc, b) => acc || b, false);
};

const findParts = (needle, code) => {
  const recFind = (c, i, code) => {
    if (i >= code.length) return false;
    if (code[i] > c) return false;
    if (code[i] === c) return [c];
    const next = recFind(c-code[i], i+1, code);
    if (!next) return false;
    return [code[i], ...next];
  };

  if (code.length === 0) return false;
  if (code[0] === needle) return findParts(needle, code.slice(1));
  return recFind(needle, 0, code) || findParts(needle, code.slice(1));
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);

  const code = data
      .split('\n')
      .filter(row => row.length > 0)
      .map(n => parseInt(n));

  const needle = code
      .filter((item, i) => !((i < 25) || validate(i, code)))[0];
  const parts = findParts(needle, code).sort((a,b) => a-b);

  console.log(parts[0] + parts[parts.length-1]);

});
