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
  let result = [...new Array(rows*cols)].map(a => 0);

  for (let i = 0; i < cols; i++) {
    result[i] = 1;
    result[map.length-1-i] = 1;
  }
  for (let i = 0; i < rows; i++) {
    result[cols*i] = 1;
    result[cols*(i+1)-1] = 1;
  }

  // TOP
  for (let i = 1; i < cols-1; i++) {
    let h = -1;
    for (let j = 0; j < rows; j++) {
      if (map[j*cols+i] > h) {
        h = map[j*cols+i];
        result[j*cols+i] = 1;
      }
      if (h === 9) break;
    }
  }

  // BOTTOM
  for (let i = 1; i < cols-1; i++) {
    let h = -1;
    for (let j = rows-1; j >= 0; j--) {
      if (map[j*cols+i] > h) {
        h = map[j*cols+i];
        result[j*cols+i] = 1;
      }
      if (h === 9) break;
    }   
  }

  // LEFT
  for (let i = 1; i < rows-1; i++) {
    let h = -1;
    for (let j = 0; j < cols; j++) {
      if (map[i*cols+j] > h) {
        h = map[i*cols+j];
        result[i*cols+j] = 1;
      }
      if (h === 9) break;
    }
  }

  // RIGHT
  for (let i = 1; i < rows-1; i++) {
    let h = -1;
    for (let j = cols-1; j >= 0; j--) {
      if (map[i*cols+j] > h) {
        h = map[i*cols+j];
        result[i*cols+j] = 1;
      }
      if (h === 9) break;
    }
  }

  console.log("E1: ", result.filter(a => a === 1).length);
  /*for (i = 0; i < rows; i++) {
    console.log(result.slice(i*cols,(i+1)*cols));
  }*/
});
