let fs = require('fs');
const file = './input.txt';
//const file = './test.txt';

const match = (t1,t2) => {
  const b = ['top', 'bottom', 'left', 'right', 'rtop', 'rbottom', 'rleft', 'rright'];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      if ( (t1[b[i]] === t2[b[j]]) ) {
        return true;
      }
    }
  }
  return false;
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const raw = data.split('\n');
  let tiles = [];

  let tmp = null;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '') continue;

    const parts = raw[i].match(/Tile (\d*)\:/);
    if (parts !== null) {
      if (tmp !== null) {
        tiles.push(tmp);
      }
      tmp = { id: parts[1], rows: [] };
    } else {
      tmp.rows.push(raw[i]);
    }
  }
  if (tmp !== null) tiles.push(tmp);

  tiles = tiles.map(t => ({
    id: t.id,
    neighbours: [],
    top: t.rows[0],
    bottom: t.rows[t.rows.length-1],
    left: t.rows.map(r => r.charAt(0)).join(''),
    right: t.rows.map(r => r.charAt(r.length-1)).join(''),
    rtop: t.rows[0].split('').reverse().join(''),
    rbottom: t.rows[t.rows.length-1].split('').reverse().join(''),
    rleft: t.rows.map(r => r.charAt(0)).reverse().join(''),
    rright: t.rows.map(r => r.charAt(r.length-1)).reverse().join('')
  }));

  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles.length; j++) {
      if (i === j || tiles[i].neighbours.includes(tiles[j].id)) continue;
      if (match(tiles[i], tiles[j])) {
        tiles[i].neighbours.push(tiles[j].id);
        tiles[j].neighbours.push(tiles[i].id);
      }
    }
  }



  console.log(
    tiles
    .filter(t => t.neighbours.length === 2)
    .map(t => parseInt(t.id))
    .reduce((a,i) => a*i, 1)
  );

});
