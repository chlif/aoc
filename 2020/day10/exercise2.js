let fs = require('fs');
const file = './input.txt';

const countPaths = (chargers) => {
  let pathLengths = {};
  let sorted = chargers.sort((a,b) => a-b);
  for (let i = 0; i < sorted.length; i++) {
    pathLengths[sorted[i]] = (sorted[i] <= 3) +
        sorted
          .filter(c => sorted[i]-c >= 1 && sorted[i]-c <= 3)
          .reduce((acc, c) => acc + pathLengths[c], 0);
  }
  return pathLengths;
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const chargers = data.split('\n')
      .filter(row => row.length > 0)
      .map(n => parseInt(n));

  const r = countPaths(chargers);

  console.log(r[chargers.sort((a,b) => b-a)[0]]);


});
