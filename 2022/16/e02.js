let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const valves = input.reduce((a,row) => {
    let obj = {...a};
    obj[row.substring(6,8)] = {
      flow: parseInt(row.split('=')[1].match(/([0-9]*)\;/)[1]),
      conn: row.split('to valve')[1].split(', ').map(s => s.slice(-2))
    };
    return obj;
  }, {});

  const dist = (v1,v2) => {
    if (v1 === v2) return 0;
    let s = 1;
    let q = [...valves[v1].conn];
    while (true) {
      if (q.includes(v2)) return s;
      s++;
      q.push(...q.flatMap(v => valves[v].conn).filter(v => !q.includes(v)));
    }
  };

  const flows = ['AA', ...Object.keys(valves).filter(a => valves[a].flow > 0)];
  const distMap = flows.reduce((a,v1) => {
    let obj = {};
    for (let k in flows) {
      const key = v1+'->'+flows[k];
      const reverse = flows[k]+'->'+v1;
      if (!a.hasOwnProperty(key)) {
        obj[key] = dist(v1,flows[k]);
        obj[reverse] = dist(v1,flows[k]);
      }
    }
    return { ...a, ...obj };
  }, {});

  
  const maxFlow = (cd,ed,cp,ep,t,q,f) => {
    if (t >= 26) return f;

    let fn = f;
    if (cp === 0) fn += valves[cd].flow * (26-t);
    if (ep === 0) fn += valves[ed].flow * (26-t);
    if (cp <= 0 && ep <= 0 && q.length === 0) return fn;

    if (cp === 0 && ep === 0) {
      if (q.length === 1) { 
        if (distMap[cd+'->'+q[0]] < distMap[ed+'->'+q[0]]) {
          return maxFlow(q[0], null, distMap[cd+'->'+q[0]], -1, t+1, [], fn);
        } else {
          return maxFlow(null, q[0], -1, distMap[ed+'->'+q[0]], t+1, [], fn);
        }
      } else {
        const pairs = q.flatMap(v1 => q.map(v2 => [v1,v2])).filter(p => p[0] !== p[1]);
        return Math.max(...pairs.map(p => maxFlow(p[0], p[1], distMap[cd+'->'+p[0]], distMap[ed+'->'+p[1]], t+1, q.filter(v => v !== p[0] && v !== p[1]), fn)));
      }
    } else if (cp === 0 && q.length > 0) {
      return Math.max(...q.map(v => maxFlow(v, ed, distMap[cd+'->'+v], ep-1, t+1, q.filter(qv => qv !== v), fn)));
    } else if (ep === 0 && q.length > 0) {
      return Math.max(...q.map(v => maxFlow(cd, v, cp-1, distMap[ed+'->'+v], t+1, q.filter(qv => qv !== v), fn)));
    }

    return maxFlow(cd,ed,cp-1,ep-1,t+1,q,fn);
  }

  const result = maxFlow(flows[0], flows[0], 0, 0, 0, flows.slice(1), 0);

  console.log("E2: ", result);
});
