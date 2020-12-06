let fs = require('fs');
const file = './input.txt';

const uniq = group =>
    group
      .split('')
      .reduce((mem, char) => (mem.includes(char)) ? mem : [...mem, char], [])
      .join('');

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const groups = data.split("\n\n")
    .map(group => group.replace(/\n/g, ''))
    .map(uniq)
    .reduce((mem, group) => mem + group.length, 0);

  console.log(groups);

});
