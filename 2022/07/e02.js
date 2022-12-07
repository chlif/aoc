let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const total = 70000000;
  const needed = 30000000;

  let system = [];
  let curr = -1;
  input.forEach(row => {
    const parts = row.split(' ');

    if (parts[0] === '$') {
      if (parts[1] === 'cd') {
        if (parts[2] === '/') {
          if (system.length === 0) {
            system.push(buildDir('/', null));
          }
          curr = 0;
        } else if (parts[2] === '..') {
          curr = (system[curr].parent !== null) ? system[curr].parent : curr;
        } else {
          curr = system[curr].children.filter(c => c.name === parts[2])[0].id;
        }
      }
      // Add ls logic here, if needed
    } else {
      if (parts[0] === 'dir') {
        system.push(buildDir(parts[1], curr));
      } else {
        system.push(buildFile(parts[1], curr, parseInt(parts[0])));
      }
      system[curr].children.push(buildChild(parts[1], system.length-1));
    }
  });

  for (let i = system.length-1; i >= 1; i--) {
    system[system[i].parent].size += system[i].size;
  }

  const minDelete = needed - (total - system[0].size);
  const out = system
      .filter(o => o.type === 'DIR' && o.size >= minDelete)
      .sort((a,b) => a.size-b.size)[0].size;

  console.log("E2: " + out);
});

const buildDir = (name, parent) => ({
  name, parent, size: 0, type: 'DIR', children: []
});

const buildFile = (name, parent, size) => ({
  name, parent, size, type: 'FILE'
});

const buildChild = (name, id) => ({name, id});