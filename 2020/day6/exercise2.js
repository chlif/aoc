let fs = require('fs');
const file = './input.txt';

const findCommon = group => {
  if (group.length === 1) return group[0];
  return group
      .slice(1)
      .reduce((mem, member) => intersection(mem, member), group[0]);
};

const intersection = (str1, str2) => {
  return str1.split('')
      .filter(char => str2.includes(char))
      .join('');
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const groups = data
      .split('\n\n')
      .map(group => group.split('\n').filter(member => member.length > 0))
      .map(findCommon)
      .reduce((mem, group) => mem + group.length, 0);


  console.log(groups);
});
