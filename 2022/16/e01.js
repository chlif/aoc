let fs = require('fs');
const file = './test.txt';

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

  const maxFlow = (c,t,q,f) => {
    if (t >= 30) return f;
    const valveFlow = valves[c].flow * ((30-t-1 > 0) ? 30-t-1 : 0);
    if (q.length === 0) return f+valveFlow;
    return Math.max(...q.map(v => maxFlow(v,t+((c !== 'AA')?1:0)+distMap[c+'->'+v],q.filter(qv => qv !== v),f+valveFlow)));
  }

  const result = maxFlow(flows[0], 0, flows.slice(1), 0);

  console.log("E1: ", result);
});

