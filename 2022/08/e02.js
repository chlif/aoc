let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0)
      .map(row => row.split('')
      .map(c => parseInt(c)));

  const rows = input.length;
  const cols = input[0].length;
  const map = input.reduce((a,b) => [...a, ...b], []);
  let result = [...new Array(rows*cols)].map(a => 1);

  for (let i = 0; i < map.length; i++) {
    if (i < cols || i > map.length - cols || i % cols === 0 || i % cols === cols-1) {
      result[i] = 0;
      continue;
    }
    
    let j;

    // TOP
    j = 1;
    while ((i - j*cols) > 0) {
      if (map[i - j*cols] >= map[i] || Math.floor((i-j*cols)/cols) === 0) {
        result[i] *= j;
        break;
      }
      j++;
    }

    // BOTTOM
    j = 1;
    while ((i + j*cols) < map.length) {
      if (map[i + j*cols] >= map[i] || (i+(j+1)*cols) >= map.length) {
        result[i] *= j;
        break;
      }
      j++;
    }

    // LEFT
    j = 1;
    while ((i - j)%cols >= 0) {
      if (map[i - j] >= map[i] || (i-j)%cols === 0) {
        result[i] *= j;
        break;
      }
      j++;
    }

    // RIGHT
    j = 1;
    while ((i + j)%cols <= cols-1) {
      if (map[i + j] >= map[i] || (i+j)%cols === cols-1) {
        result[i] *= j;
        break;
      }
      j++;
    }

  }

  console.log("E1: ", Math.max(...result));
});
