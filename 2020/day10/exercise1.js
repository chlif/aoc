let fs = require('fs');
const file = './input.txt';

const findDiffernces = (current, chargers) => {
  if (chargers.length === 0) return [];
  return [chargers[0] - current, ...findDiffernces(chargers[0], chargers.slice(1))];
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const chargers = data.split('\n')
      .filter(row => row.length > 0)
      .map(n => parseInt(n))
      .sort((a,b) => a-b);

  const differences = findDiffernces(0, chargers).sort((a,b) => a-b);

  console.log(differences.indexOf(3) * (differences.length-differences.indexOf(3)+1));

});
