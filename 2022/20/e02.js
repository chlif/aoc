let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const key = 811589153;
  const numbers = data.split('\n').filter(row => row.length > 0).map(r => parseInt(r)*key);
  const l = numbers.length;
  const indexes = [...new Array(l)].map((a,i) => i);

  for (let k = 0; k < l*10; k++) {
    const i = k % l;
    const a = numbers[i];
    const j = indexes.indexOf(i);
    indexes.splice(j,1);

    let nj = (j+a)%(l-1);
    if (nj < 0) nj = l + nj - 1;
    else if (nj > l-1) nj = nj % l + 1;
    
    indexes.splice(nj,0,i);
  }

  const zIdx = indexes.indexOf(numbers.indexOf(0));
  let sum = 0;
  for (let i = 1; i <= 3; i++) {
    sum += numbers[indexes[(zIdx+(i*1000))%l]];
  }
  
  console.log("E2: ", sum);
});

