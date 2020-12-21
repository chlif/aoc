let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const allergenes = data.split('\n')
      .filter(r => r !== '')
      .reduce((o,r) => {
        let obj = {};
        const i = [...r.substr(0,r.indexOf('(')).matchAll(/(\w+)/g)]
          .map(p => p[1]).filter(p => p !== '');
        const a = [...r.substr(r.indexOf('contains')+9).matchAll(/(\w+)/g)]
          .map(p => p[1]).filter(p => p !== '');

        for (let j = 0; j < a.length; j++) {
          if (o[a[j]] !== undefined) {
            let p = [];
            for (let k = 0; k < i.length; k++) {
              if (o[a[j]].includes(i[k])) p.push(i[k]);
            }
            obj[a[j]] = p;
          }
          else obj[a[j]] = i;
        }
        return {...o, ...obj};
      },{});

    // PART 2
    let changed = true;
    const keys = Object.keys(allergenes).sort();
    let updated = {...allergenes};
    while (changed) {
      changed = false;
      for (let i = 0; i < keys.length; i++) {
        if (updated[keys[i]].length === 1) {
          for (let j = 0; j < keys.length; j++) {
            if (i === j) continue;
            for (let k = 0; k < updated[keys[j]].length; k++) {
              if (updated[keys[i]][0] === updated[keys[j]][k]) {
                updated[keys[j]] = [...updated[keys[j]].slice(0,k),...updated[keys[j]].slice(k+1)];
                changed = true;
              }
            }
          }
        }
      }
    }

    console.log(keys.reduce((a,k) => [...a,updated[k]], []).join(','));

});
