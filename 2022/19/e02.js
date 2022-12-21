let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const blueprints = input.map(row => {
    const parts = [...row.matchAll(/([0-9]{1,2})/g)].map(m => parseInt(m[0]));
    return [
      [parts[1], 0, 0, 0],
      [parts[2], 0, 0, 0],
      [parts[3], parts[4], 0, 0],
      [parts[5], 0, parts[6], 0]
    ]
  });

  const maxMap = blueprints.map(bp => [Math.max(...bp.map(r => r[0])), Math.max(...bp.map(r => r[1])), Math.max(...bp.map(r => r[2])), Math.max(...bp.map(r => r[3]))]);

  const buildNextBranches = (now, bp, resources, robots, max) => {

    const ore = (() => {
      if (robots[0] >= max[0]) return false; // Don't build if enough can be collected in one round
      const t = (resources[0] >= bp[0][0]) ? 1 : Math.ceil((bp[0][0]-resources[0])/robots[0]) + 1;
      if (now+t > 32) return false;
      const res = resources.map((a,i) => a+robots[i]*t).map((a,i) => a - bp[0][i]);
      const rob = robots.map((a,i) => (i === 0) ? a+1 : a);
      return { t, resources: res, robots: rob };
    })();

    const clay = (() => {
      if (robots[1] >= max[1]) return false;
      const t = (resources[0] >= bp[1][0]) ? 1 : Math.ceil((bp[1][0]-resources[0])/robots[0]) + 1;
      if (now+t > 32) return false;
      const res = resources.map((a,i) => a+robots[i]*t).map((a,i) => a - bp[1][i]);
      const rob = robots.map((a,i) => (i === 1) ? a+1 : a);
      return { t, resources: res, robots: rob };
    })();

    const obsidian = (() => {
      if (robots[1] === 0) return false;
      if (robots[2] >= max[2]) return false;
      const tOre = (resources[0] >= bp[2][0]) ? 1 : Math.ceil((bp[2][0]-resources[0])/robots[0]) + 1;
      const tClay = (resources[1] >= bp[2][1]) ? 1 : Math.ceil((bp[2][1]-resources[1])/robots[1]) + 1;
      const t = Math.max(tOre, tClay);
      if (now+t > 32) return false;
      const res = resources.map((a,i) => a+robots[i]*t).map((a,i) => a - bp[2][i]);
      const rob = robots.map((a,i) => (i === 2) ? a+1 : a);
      return { t, resources: res, robots: rob };
    })();

    const geode = (() => {
      if (robots[1] === 0 || robots[2] === 0) return false;
      const tOre = (resources[0] >= bp[3][0]) ? 1 : Math.ceil((bp[3][0]-resources[0])/robots[0]) + 1;
      const tObsidian = (resources[2] >= bp[3][2]) ? 1 : Math.ceil((bp[3][2]-resources[2])/robots[2]) + 1;
      const t = Math.max(tOre, tObsidian);
      if (now+t > 32) return false;
      const res = resources.map((a,i) => a+robots[i]*t).map((a,i) => a - bp[3][i]);
      const rob = robots.map((a,i) => (i === 3) ? a+1 : a);
      return { t, resources: res, robots: rob };
    })();

    const direct = (() => {
      if (now === 32) return false;
      const t = 32 - now;
      const res = resources.map((a,i) => a+robots[i]*t);
      return { t, resources: res, robots: [...robots] };
    })();

    return [ore, clay, obsidian, geode, direct].filter(r => r !== false);
  };

  const sim = (t, bp, resources, robots, max) => {
    if (t === 32) return resources[3];
    const next = buildNextBranches(t, bp, resources, robots, max);
    return Math.max(...next.map(n => sim(t+n.t, bp, n.resources, n.robots, max)));
  };

  const mul = [0,1,2].reduce((a,b,i) => a * sim(0, blueprints[b], [0,0,0,0], [1,0,0,0], maxMap[b]), 1);

  console.log("E2: ", mul);
});
