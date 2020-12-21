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

    const suspected = Object.keys(allergenes)
        .reduce((a,x) => {
          return [...a, ...allergenes[x]];
        }, [])
        .filter((x,i,arr) => {
          return arr.slice(i+1).reduce((a,x1) => a && x1 !== x, true);
        });

    const safe = data.split('\n')
        .filter(r => r !== '')
        .reduce((a,r) => {
          return [...a, ...[...r.substr(0,r.indexOf('(')).matchAll(/(\w+)/g)]
            .map(p => p[1]).filter(p => p !== '')];
        }, [])
        .filter(w => !suspected.includes(w));

    console.log(safe.length);

});
