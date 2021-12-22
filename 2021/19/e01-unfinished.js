/**
 * NOTE! This code does not work
 */

let fs = require('fs');
const file = './test.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const parse = input => {
    const scanners = [];
    let scanner = undefined;
    input.forEach(line => {
      if (line.match(/scanner ([0-9]+)/)) {
        if (scanner !== undefined) scanners.push({...scanner});
        scanner = { id: parseInt(line.match(/scanner ([0-9]+)/)[1]), beacons: [] };
        if (scanner.id === 0) {
          scanner.x = 0; scanner.y = 0; scanner.z = 0;
        }
      } else {
        let [x,y,z] = line.split(',').map(i => parseInt(i));
        scanner.beacons.push({ x: x, y: y, z: z })
      }
    });
    scanners.push(scanner);
    return scanners;
  };

  // All credits for this goes to https://github.com/vincentvanderweele
  const allOrientations = (() => {
    const rotation = ([x,y,z]) => [[x,y,z],[z,x,y],[y,z,x]];
    const sign = ([x,y,z]) => [[x,y,z],[x,-y,-z],[-x,y,-z],[-x,-y,z]];
    const order = ([x,y,z]) => [[x,y,z],[x,y,-z]];
    return (v) => order(v).flatMap(sign).flatMap(rotation);
  })();

  const findCommon = (b1,b2) => {
    const sb1 = b1.map(b => JSON.stringify(b));
    const sb2 = b2.map(b => JSON.stringify(b));
    let found = [];
    for (let i = 0; i < sb1.length; i++) {
      for (let j = 0; j < sb2.length; j++) {
        console.log(sb1[i],sb2[j]);
        if (sb1[i] === sb2[j]) found.push([i,j]);
      }
    }
    return found;
  };

  const getOverlap = (s1,s2) => {
    const ns2 = s2.beacons;
    const ns1a = s1.beacons.map(b => allOrientations([b.x,b.y,b.z]));
    for (let i = 0; i < ns1a.length; i++) {
      for (let j = 0; j < ns1a[i].length; j++) {
        const z1 = {...ns1a[i][j]};
        const ns1z = ns1a[i].map(b => ({ x: b[0]-z1[0], y: b[1]-z1[1], z: b[2]-z1[2] }));
        for (let k = 0; k < ns2.length; k++) {
          const z2 = ((b) => [b.x,b.y,b.z])(ns2[k]);
          const ns2z = ns2.map(b => ({ x: b.x-z2[0], y: b.y-z2[1], z: b.z-z2[2] }));
          const found = findCommon(ns1z,ns2z);
          console.log(found);
          if (found.length >= 12) {
            console.log(found);
          }
        }
      }
    }
    return false;
  }

  const getPossible = (s2, b2,b1) => ({
    x: ['x','y','z'].flatMap(d => [ s2.x + b2.x + b1[d], s2.x + b2.x - b1[d]] ),
    y: ['x','y','z'].flatMap(d => [ s2.y + b2.y + b1[d], s2.y + b2.y - b1[d]] ),
    z: ['x','y','z'].flatMap(d => [ s2.z + b2.z + b1[d], s2.z + b2.z - b1[d]] )
  });

  const findScannerPos = (s1,s2,overlap) => {
    let possible = getPossible(s2, s2.beacons[overlap[0][1]], s1.beacons[overlap[0][0]]);
    for (let i = 1; i < overlap.length; i++) {
      let r = getPossible(s2, s2.beacons[overlap[i][1]], s1.beacons[overlap[i][0]]);
      possible.x = r.x.filter(a => possible.x.includes(a));
      possible.y = r.y.filter(a => possible.y.includes(a));
      possible.z = r.z.filter(a => possible.z.includes(a));
    }
    return [ possible.x[0], possible.y[0], possible.z[0] ];
  };

  const findOrientation = (s1,s2,overlap) => {
    const b1 = s1.beacons[overlap[0][0]];
    const b2 = s2.beacons[overlap[0][1]];
    const possible = [[1,0,0],[0,1,0],[0,0,1],[-1,0,0],[0,-1,0],[0,0,-1]];
    const vectors = [[],[],[]];
    for (let i = 0; i < possible.length; i++) {
      let v = possible[i];
      if (s1.x + v[0]*b1.x + v[1]*b1.y + v[2]*b1.z === b2.x) vectors[0] = v;
      if (s1.y + v[0]*b1.x + v[1]*b1.y + v[2]*b1.z === b2.y) vectors[1] = v;
      if (s1.z + v[0]*b1.x + v[1]*b1.y + v[2]*b1.z === b2.z) vectors[2] = v;
    }
    return vectors;
  };

  const findScannerLocations = scanners => {
    let found = scanners.map((s,i) => (s.x !== undefined) ? i : -1).filter(a => a > -1);
    let unfound = scanners.map((s,i) => (s.x === undefined) ? i : -1).filter(a => a > -1);
    while (unfound.length) {
      let s1 = scanners[unfound[0]];
      for (let i = 0; i < found.length; i++) {
        let s2 = scanners[found[i]];
        const overlap = getOverlap(s1,s2);
        if (overlap) {
          const [x,y,z] = findScannerPos(s1,s2,overlap);

          scanners[s1.id].x = x;
          scanners[s1.id].y = y;
          scanners[s1.id].z = z;

          const [fx,fy,fz] = findOrientation(s1,s2,overlap);
          scanners[s1.id].beacons = scanners[s1.id].beacons.map(b => ({
            x: s1.x + fx[0]*b.x + fx[1]*b.y + fx[2]*b.z,
            y: s1.x + fy[0]*b.x + fy[1]*b.y + fy[2]*b.z,
            z: s1.x + fz[0]*b.x + fz[1]*b.y + fz[2]*b.z
          }));

          found.push(s1.id);
          unfound = unfound.slice(1);
          break;
        }
      }
      break;
      if (unfound[0] === s1.id) unfound = [...unfound.slice(1), unfound[0]];
    }
    console.log(scanners.map(s => [s.x,s.y,s.z]))
  };

  console.log("E1: ", findScannerLocations(parse(input)));
});
