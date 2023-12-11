let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  
  // BUILD IMAGE
  
  let w = input[0].length;
  let h = input.length;
  let image = input.flatMap(x => x.split(''));
  
  input.map((r,i) => r.split('').reduce((a,x) => a && x === '.', true) ? i : -1)
      .filter(x => x > -1)
      .forEach((r,i) => {
        image.splice((r+i)*w,0,...[...new Array(w)].map(x => '.'));
        h++;
      });

  let emptyCols = [];
  for (let x = 0; x < input[0].length; x++) {
    let a = true;
    for (let y = 0; y < input.length; y++) {
      if (input[y].charAt(x) !== '.') {
        a = false;
        break;
      }
    }
    if (a) emptyCols.push(x);
  }
  emptyCols.forEach((x,i) => {
    for (let y = 0; y < h; y++) {
      image.splice(y*w+x+i+y, 0, '.');
    }
    w++;
  });

  // FIND ROUTE
  const galaxies = image.map((x,i) => (x === '#') ? i : -1).filter(x => x > -1);
  const pairs = galaxies.flatMap((a,i) => galaxies.filter((b,j) => j>i).map(b => [a,b]));
  const distances = pairs.map(p => {
    const a = Math.min(...p);
    const b = Math.max(...p);
    return ( Math.floor(b/w) - Math.floor(a/w) ) + Math.abs( b%w - a%w );
  });
  const total = distances.reduce((a,x) => a+x, 0);

  // HELPER

  const printImage = () => {
    for (let i = 0; i < h; i++) {
      console.log(image.slice(i*w,(i+1)*w).join(''));
    }
  };

  //printImage();

  console.log("E1: ", total);
});
