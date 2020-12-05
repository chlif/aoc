let fs = require('fs');
let passwordReg = /([0-9]*)\-([0-9]*) ([a-z]{1}): (.*)/
const file = './input.txt';

const isValidPassword = (line) => {
  if (line.length === 0) return false;
  const parts = line.match(passwordReg);
  const p1 = parseInt(parts[1])-1; // No index zero
  const p2 = parseInt(parts[2])-1; // No index zero
  return validate(parts[4], parts[3], p1, p2);
}

const validate = (str, c, p1, p2) => {
  return (str.charAt(p1) === c) ^ (str.charAt(p2) === c);
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const result = data.split("\n").filter(isValidPassword).length;
  console.log(result);
});
