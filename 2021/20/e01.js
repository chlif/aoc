let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const enhancer = input[0];
  const buffer = 5;
  const w = buffer*2+input[1].length;
  const paddingTB = [...Array(w*buffer)].map(i => '.').join('');
  const paddingLR = [...Array(buffer)].map(i => '.').join('');
  const original = paddingTB + input.slice(1).map(row => paddingLR+row+paddingLR).join('') + paddingTB;

  const findAdjacentIds = (i,l) => [i-w-1,i-w,i-w+1,i-1,i,i+1,i+w-1,i+w,i+w+1]
      .map(j => {
        if (j < 0 || j >= l) return -1;
        if (Math.abs(j-i) === 1 && Math.floor(j/w) !== Math.floor(i/w)) return -1;
        if (j-i < -1 && Math.floor(j/w) !== Math.floor((i-w)/w)) return -1;
        if (j-i > 1 && Math.floor(j/w) !== Math.floor((i+w)/w)) return -1;
        return j;
      });

  const enhance = image => image.split('').map((c,i) => {
      const bits = findAdjacentIds(i,image.length).map(id => (id === -1) ? '.' : image.charAt(id)).map(c => (c === '#') ? 1 : 0).join('');
      return enhancer.charAt(parseInt(bits,2));
    }).join('');

  const count = image => image.split('').filter(c => c === '#').length;

  // In the actual input the 0 index is # and last one . -> Borders get colored
  const trim = image => image.substring(w,image.length-w).split('').filter((c,i) => !(i%w === 0 || i%w === w-1)).join('');

  const print = image => image.split('').map((c,i) => (i%(w-2) === 0) ? '\n'+c : c).join('');

  console.log(print(trim(enhance(enhance(original)))));
  console.log("E1: ", count(trim(enhance(enhance(original)))));
});
