let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const reactor = {};

  const parse = input => input.map(row => {
    let r = { o: (row.split(' ')[0] === 'on') ? 1 : 0 };
    row.split(' ')[1].split(',').forEach(d => {
      const a = d.match(/([xyz]{1})\=([\-0-9]+)\.\.([\-0-9]+)/);
      r[a[1]] = [parseInt(a[2]),parseInt(a[3])];
    });
    return r;
  });

  const gap = c => [ (c[0] < -50) ? -50 : c[0], (c[1] > 50) ? 50 : c[1] ];

  const apply = o => {
    if (![o.x,o.y,o.z].reduce((a,c) => a && c[0] >= -50 && c[1] <= 50, true)) return;
    const [dx,dy,dz] = [o.x,o.y,o.z].map(gap);
    for (let x = dx[0]; x <= dx[1]; x++) {
      for (let y = dy[0]; y <= dy[1]; y++) {
        for (let z = dz[0]; z <= dz[1]; z++) {
          const key = [x,y,z].join(',');
          reactor[key] = o.o;
        }
      }
    }
  };

  const run = o => o.forEach(apply);

  const count = () => Object.keys(reactor).reduce((a,k) => a + reactor[k], 0);

  run(parse(input));

  console.log("E1: ", count(reactor));
});
