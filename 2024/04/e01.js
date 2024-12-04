let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const w = input[0].length;
  const h = input.length;
  const map = input.join('');
  const masks = [
    [0,1,2,3], [0,-1,-2,-3],
    [0,w,2*w,3*w], [0,-w,-2*w,-3*w],
    [0,w+1,2*w+2,3*w+3], [0,w-1,2*w-2,3*w-3],
    [0,-w+1,-2*w+2,-3*w+3], [0,-w-1,-2*w-2,-3*w-3]
  ];
  const check = (word) => (word === 'XMAS') ? 1 : 0;
  const pull = (i, mask) => mask.reduce((a,m) => [...a, map.charAt(i+m)], []).join('')

  let count = 0;
  for (let i = 0; i < map.length; i++) {
    if (map.charAt(i) !== 'X') continue;
    if (i%w < w-3) count = count + check(pull(i,masks[0]));
    if (i%w >= 3) count = count + check(pull(i,masks[1]));
    if (Math.floor(i/w) < h-3) count = count + check(pull(i,masks[2]));
    if (Math.floor(i/w) >= 3) count = count + check(pull(i,masks[3]));
    if ( (i%w < w-3) && (Math.floor(i/w) < h-3) ) count = count + check(pull(i,masks[4]));
    if ( (i%w >= 3) && (Math.floor(i/w) < h-3) ) count = count + check(pull(i,masks[5]));
    if ( (i%w < w-3) && (Math.floor(i/w) >= 3) ) count = count + check(pull(i,masks[6]));
    if ( (i%w >= 3) && (Math.floor(i/w) >= 3) ) count = count + check(pull(i,masks[7]));
  }

  console.log("E1: ", count);
});
