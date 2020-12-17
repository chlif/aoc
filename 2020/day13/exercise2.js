let fs = require('fs');
const file = './input.txt';
const testSet = ['7,13,x,x,59,x,31,19','17,x,13,19','67,7,59,61','67,x,7,59,61','67,7,x,59,61','1789,37,47,1889'];

const absoluteModulo = (a,b) => (a % b + b) % b;

const egcd = (a,b) => {
  if (a === 0) return [b, 0, 1];
  const gxy = egcd(b % a, a);
  return [gxy[0], gxy[2] - Math.floor(b/a) * gxy[1], gxy[1]];
}

const modinv = (a, m) => {
  const gxy = egcd(a, m);
  if (gxy[0] !== 1) throw `Modular inverse doesn\'t exist (${a} (mod ${m}))`;
  return absoluteModulo(gxy[1], m);
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const notes = data.split('\n')
      .filter(row => row.length > 0);

  const set  = [...testSet, notes[1]];
  for (let t = 0; t < set.length; t++) {

    const buses = set[t].split(',')
      .map((b, i) => ({ n: b, a: i }))
      .filter(b => !isNaN(b.n))
      .map(b => ({...b, n: parseInt(b.n)}));

    const N = buses.reduce((a,b) => a * b.n, 1);
    const withZ = buses
        .map(b => ({ ...b, a: absoluteModulo(b.n-b.a, b.n) }))
        .map(b => ({ ...b, y: N/b.n }))
        .map(b => ({ ...b, z: modinv(b.y, b.n) }));

    console.log(withZ.reduce((a,b) => a + BigInt(BigInt(b.a)*BigInt(b.y)*BigInt(b.z)), 0n)%BigInt(N))
  }

});
