let fs = require('fs');
let passwordReg = /([0-9]*)\-([0-9]*) ([a-z]{1}): (.*)/
const file = './input.txt';

const isValidPassword = (line) => {
  if (line.length === 0) return false;
  const parts = line.match(passwordReg);
  const lowerLimit = parseInt(parts[1]);
  const higherLimit = parseInt(parts[2]);
  const charCount = count(parts[4], parts[3]);
  return (charCount >= lowerLimit) && (charCount <= higherLimit);
}

const count = (haystack, needle) => {
  const r = new RegExp(needle, 'g');
  return ((haystack || '').match(r) || []).length;
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const result = data.split("\n").filter(isValidPassword).length;
  console.log(result);
});
