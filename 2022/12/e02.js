let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0)
  const map = input.flatMap(row => row.split(''));
  const w = input[0].length;
  const e = map.lastIndexOf('E');
  const elevation = l => (l === 'S') ? 1 : (l === 'E') ? 'z'.charCodeAt(0) - 96 : l.charCodeAt(0) - 96;
  const findPossibleNeighbours = (p) => {
    return [p-1,p-w,p+1,p+w]
        .filter(n => n >= 0 && n < map.length)
        .filter(n => Math.abs(p-n) > 1 || Math.floor(p/w) === Math.floor(n/w))
        .filter(n => elevation(map[n]) <= elevation(map[p])+1);
  };

  const findIdOfShortest = (q,d) => q.filter(i => i !== 'X').reduce((a,i) => (a === -1 || d[i] < d[a]) ? i : a, -1);

  const possibleStartingPoints = map.map((a,i) => (a === 'a') ? i : -1).filter(a => a !== -1);
  let routes = [];
  for (let k in possibleStartingPoints) {
    const s = possibleStartingPoints[k];
    let dist = [...new Array(map.length)].map((a,i) => (i === s) ? 0 : Number.MAX_SAFE_INTEGER);
    let queue = [...new Array(map.length)].map((a,i) => i);
    while (queue.length) {
      const curr = findIdOfShortest(queue, dist);
      queue.splice(queue.lastIndexOf(curr), 1);
      findPossibleNeighbours(curr)
          .forEach(i => dist[i] = dist[curr] + 1);
    }
    routes.push(dist[e]);
  }
  
  console.log("E2: ", routes.sort((a,b) => a-b)[0]);
});