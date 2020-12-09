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


fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const code = data.split('\n').filter(row => row.length > 0).map(n => parseInt(n));
  const c = code
      .filter((item, i) => !((i < 25) || validate(i, code)))[0];

  console.log(c);


});
