let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const getHASH = str => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = hash + str.charCodeAt(i);
      hash = hash * 17;
      hash = hash % 256;
    }
    return hash;
  };

  const codes = input[0].split(',');
  const total = codes.map(x => getHASH(x)).reduce((a,x) => a+x, 0);

  console.log("E1: ", total);
});
