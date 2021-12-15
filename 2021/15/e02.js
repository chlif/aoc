let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const field = input => {
    const tiles = [0,1,2,3,4];
    const rows = input.map(r => r.split('').map(i => parseInt(i)));
    return tiles.flatMap(y => rows.flatMap(row => tiles.flatMap(x => row.map(v => ((v+y+x) % 9 === 0) ? 9 : (v+y+x)%9))));
  };


  const getAdjacentIds = (i,w) => [i-w,i-1,i+1,i+w].filter(j => j >= 0 && j < w*w && ( Math.abs(i-j) > 1 || Math.floor(i/w) === Math.floor(j/w) ));
  const getIndexOfMinValue = (q,d) => q.reduce((acc, id) => (acc === -1 || d[id] < d[acc]) ? id : acc, -1);

  const findShortestPath = (field) => {
    const w = Math.sqrt(field.length);
    let queue = [...Array(field.length)].map((x,i) => i);
    let dist = [...Array(field.length)].map((x,i) => (i === 0) ? 0 : Number.MAX_SAFE_INTEGER);
    while (queue.length > 0) {
      let curr = getIndexOfMinValue(queue, dist);
      queue.splice(queue.indexOf(curr), 1);
      getAdjacentIds(curr,w)
          .filter(id => queue.includes(id))
          .forEach(id => {
            const d = dist[curr] + field[id];
            if (d < dist[id]) dist[id] = d;
          });
    }
    return dist[dist.length-1];
  };

  console.log("E2: ", findShortestPath(field(input)));
});
