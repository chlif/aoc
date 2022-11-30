let fs = require('fs');
const file = './test.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const parse = input => input.map(row => {
    let r = { o: (row.split(' ')[0] === 'on') ? 1 : 0 };
    row.split(' ')[1].split(',').forEach(d => {
      const a = d.match(/([xyz]{1})\=([\-0-9]+)\.\.([\-0-9]+)/);
      r[a[1]] = [parseInt(a[2]),parseInt(a[3])];
    });
    return r;
  });

  // c1 is always the order and c2 the segment already in reactor
  const C = ['x','y','z'];
  const hasOverlap = (c1,c2) => !C.reduce((a,d) => a || ( c1[d][1] < c2[d][0] || c2[d][1] < c1[d][0] || c1[d][0] > c2[d][1] || c2[d][0] > c1.x[1] ), false);
  const getOutsideSegments = (c1,c2) => {
    let segments = [];
    if (c2.x[0] < c1.x[0]) segments.push({ x: [c2.x[0],c1.x[0]-1], y: [...c2.y], z: [...c2.z] });
    if (c2.x[1] > c1.x[1]) segments.push({ x: [c1.x[1]+1,c2.x[1]], y: [...c2.y], z: [...c2.z] });
    if (c2.y[0] < c1.y[0]) segments.push({
      x: [Math.max(c1.x[0],c2.x[0]), Math.min(c1.x[1],c2.x[1])],
      y: [c2.y[0],c1.y[0]-1],
      z: [...c2.z] });
    if (c2.y[1] > c1.y[1]) segments.push({
      x: [Math.max(c1.x[0],c2.x[0]), Math.min(c1.x[1],c2.x[1])],
      y: [c1.y[1]+1,c2.y[1]],
      z: [...c2.z] });
    if (c2.z[0] < c1.z[0]) segments.push({
      x: [Math.max(c1.x[0],c2.x[0]), Math.min(c1.x[1],c2.x[1])],
      y: [Math.max(c1.y[0],c2.y[0]), Math.min(c1.y[1],c2.y[1])],
      z: [c2.z[0],c1.z[0]-1] });
    if (c2.y[1] > c1.y[1]) segments.push({
      x: [Math.max(c1.x[0],c2.x[0]), Math.min(c1.x[1],c2.x[1])],
      y: [Math.max(c1.y[0],c2.y[0]), Math.min(c1.y[1],c2.y[1])],
      z: [c1.z[1]+1,c2.z[1]] });
    return segments;
  };

  const apply = (orders, reactor) => {
    if (orders.length === 0) return reactor;
    if (reactor.length === 0) return apply(orders.slice(1), [orders[0]]);

    const o = {...orders[0]};
    for (let i = 0; i < reactor.length; i++) {
      if (!hasOverlap(orders[0],reactor[i])) continue;
      const segment = {...reactor[i]};
      reactor = [...reactor.slice(0,i),...reactor.slice(i+1),...getOutsideSegments(o,segment)];
    }
    if (o.o === 1) reactor = [...reactor,o];
    return apply(orders.slice(1), [...reactor]);
  };

  const count = segments => segments.reduce((a,s) => a + C.reduce((b,d) => b * (Math.abs(s[d][1]-s[d][0])+1),1 ), 0);

  console.log("E2: ", count(apply(parse(input)), []));
});
