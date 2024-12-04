let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const w = input[0].length;
  const h = input.length;
  const map = input.join('');
  const masks = [
    [-w-1,0,w+1], [-w+1,0,w-1]
  ];
  const check = (word) => (word === 'XMAS') ? 1 : 0;
  const pull = (i, mask) => mask.reduce((a,m) => [...a, map.charAt(i+m)], []).join('')

  let count = 0;
  for (let i = 0; i < map.length; i++) {
    if (map.charAt(i) !== 'A') continue;
    if ( (i%w < w-1) && (i%w > 0) && (Math.floor(i/w) < h-1) && (Math.floor(i/w) > 0) ) {
      let x = masks.map((mask) => pull(i,mask));
      if ( ( x[0] === "SAM" || x[0] === "MAS" ) && ( x[1] === "SAM" || x[1] === "MAS" ) ) {
        count = count + 1;
      }
    }
  }

  console.log("E2: ", count);
});
