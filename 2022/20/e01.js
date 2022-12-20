let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const numbers = data.split('\n').filter(row => row.length > 0).map(r => parseInt(r));
  const l = numbers.length;
  const indexes = [...new Array(l)].map((a,i) => i);
  
  for (let i = 0; i < l; i++) {
    const a = numbers[i];
    const j = indexes.indexOf(i);
    let nj = j+a;
    if (nj < 0) nj = l - 1 + nj;
    else if (nj > l-1) nj = nj % l + 1;
    indexes.splice(j,1);
    indexes.splice(nj,0,i);
  }

  const zIdx = indexes.indexOf(numbers.indexOf(0));
  let sum = 0;
  for (let i = 1; i <= 3; i++) {
    sum += numbers[indexes[(zIdx+(i*1000))%l]];
  }
  
  console.log("E1: ", sum);
});
