let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const isSmallCave = cave => cave === cave.toLowerCase();

  const connections = (raw) => {
    return raw
        .map(s => s.split('-'))
        .reduce((a,p) => {
          let obj = {};
          obj[p[0]] = (p[0] in a) ? [...a[p[0]], p[1]] : [p[1]];
          obj[p[1]] = (p[1] in a) ? [...a[p[1]], p[0]] : [p[0]];
          return {...a, ...obj}
        }, {});
  };

  const findPaths = (conn, path, smallTwice = false) => {
    return conn[path[path.length-1]]
        .reduce((acc, cave) => {
          let nextHasSmallTwice = smallTwice;
          if (cave === 'start') return acc;
          if (cave === 'end') return [...acc, [...path, cave]];
          if (isSmallCave(cave) && path.includes(cave)) {
              if (smallTwice) return acc;
              else nextHasSmallTwice = true;
          }
          return [
            ...acc,
            ...findPaths(conn, [...path, cave], nextHasSmallTwice)
          ];
        }, []);
  };

  console.log("E2: ", findPaths(connections(input), ['start']).length);
});
