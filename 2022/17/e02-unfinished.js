/**
 * THIS TASK IS NOT READY. I LEFT IT HERE IN CASE I FEEL LIKE CONTINUING SOMETIME.
 * AS IF...
 */

let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const winds = data.split('\n').filter(row => row.length > 0)[0].split('');
  const width = 7;
  const rockCount = 1000000000000;
  const rocks = [
    '..@@@@.'.replaceAll(' ','').split(''),
    '...@... ..@@@.. ...@...'.replaceAll(' ','').split(''),
    '....@.. ....@.. ..@@@..'.replaceAll(' ','').split(''),
    '..@.... ..@.... ..@.... ..@....'.replaceAll(' ','').split(''),
    '..@@... ..@@...'.replaceAll(' ','').split('')
  ];
  const newLine = '.......'.split('');

  let r = 0;
  let w = -1;
  let offset = 0;
  let map = [...new Array(3)].flatMap(r => newLine);
  const validate = rock => Math.max(...rock) < map.length && rock.filter(r => map[r] === '#').length === 0;
  while (true) {
    let rock = rocks[r%rocks.length].map((a,i) => (a === '@') ? i : -1).filter(a => a !== -1);
    const emptyRows = (map.indexOf('#') > -1) ? Math.floor( map.indexOf('#') / 7 ) : 3;
    if (emptyRows > 3) map.splice(0, (emptyRows-3)*width);
    else if (emptyRows < 3) map = [...[...new Array(3-emptyRows)].flatMap(r => newLine), ...map];
    map = [...rocks[r%rocks.length].map(a => '.'), ...map];

    while (true) {
      let wind = winds[++w%winds.length];
      if (wind === '<' && Math.min(...rock.map(r => r%width)) > 0) {
        const wr = rock.map(p => p-1);
        if (validate(wr)) rock = wr;
      } else if (wind === '>' && Math.max(...rock.map(r => r%width)) < width-1) {
        const wr = rock.map(p => p+1);
        if (validate(wr)) rock = wr;
      }

      const dr = rock.map(r => r+width);
      if (validate(dr)) {
        rock = dr;
      } else {
        rock.forEach(r => map[r] = '#');
        const fullLines = rock.map(r => Math.floor(r/width))
            .filter(a => map.slice(a*width, (a+1)*width).join('') === '#######');
        if (fullLines.length > 0) {
          offset += map.length / width - fullLines[0] - 1;
          map.splice((fullLines[0]+1)*width);
        }
        break;
      }
    }

   // console.log("---");
   // for (let i = 0; i < map.length/width; i++) console.log(map.slice(i*width, (i+1)*width).join(''));
   // console.log("---")

    if (r%1000000 === 0) console.log(r, map.length, offset);
    //if (++r === rockCount) break;
    if (++r === 10000000) break;
  }

  const height = map.length/width - Math.floor(map.indexOf('#')/width) + offset;
  console.log("E2: ", height);
});

const gcd = (a,b) => {
  if (a === b) return a;
  if (a > b) return gcd(a-b, b);
  else return gcd(a, b-a);
};
const lcm = (a,b) => a*b/gcd(a,b);
const isPrime = a => {
  if (a === 1) return false;
  for (let k = 2; k < Math.sqrt(a); k++) {
    if (a%k === 0) return false;
  }
  return true;
}