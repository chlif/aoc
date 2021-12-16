let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const hexToBin = input => input[0].split('')
      .map(hex => '0000'+parseInt('0'+hex,16).toString(2))
      .map(str => str.substring(str.length-4)).join('');

  const initPackage = bin => ({ v: parseInt(bin.substring(0,3),2), t: parseInt(bin.substring(bin.length-3),2), l: 6 });

  const parse = bin => {
    let package = initPackage(bin.substring(0,6));
    if (package.t === 4) {
      package.l = 6;
      package.b = '';
      while (true) {
        package.b = package.b + bin.substring( package.l+1, package.l+5 );
        package.l = package.l + 5;
        if (bin.substring(package.l-5,package.l-4) === '0') break;
      }
      package.b = parseInt(package.b, 2);
    } else {
      package.s = [];
      package.i = bin.substring(6,7);
      const l = parseInt( (package.i === '0') ? bin.substring(7,22) : bin.substring(7,18), 2 );
      if (package.i === '0') {
        package.l = 22;
        while (package.l < 22+l) {
          package.s.push( parse(bin.substring(package.l)) );
          package.l = package.l + package.s[package.s.length-1].l;
        }
      } else {
        package.l = 18;
        for (let k = 0; k < l; k++) {
          package.s.push( parse(bin.substring(package.l)) );
          package.l = package.l + package.s[package.s.length-1].l;
        }
      }
    }
    return package;
  };

  countVersions = p => (!p.s) ? p.v : p.v + p.s.reduce((a,s) => a+countVersions(s), 0);

  console.log("E1: ", countVersions(parse(hexToBin(input))));
});
