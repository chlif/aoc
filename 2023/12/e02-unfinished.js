let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);
  const N = 5;

  const rows = input.map(r => {
    const chars = r.split(' ')[0];
    const broken = r.split(' ')[1];
    
    return {
      chars: [...new Array(2)].map((x,i) => [...new Array(i+1)].map(x => chars).join('?')),
      broken: [...new Array(2)].map((x,i) => [...new Array(i+1)].map(x => broken).join(',').split(',').map(x => eval(x))),
    }
  });

  let counts = [];
  for (let r = 0; r < rows.length; r++) {
    counts.push([...new Array(rows[r].chars.length)].map(x => 0));
    for (let c = 0; c < rows[r].chars.length; c++) {
      const BR = rows[r].broken[c];
      let next = [rows[r].chars[c]];
      let springCount = BR.reduce((a,x) => a+x, 0);
      let minLength = springCount+BR.length-1;

      for (let b = 0; b < BR.length; b++) {
        const l = BR[b];
        const last = b === BR.length-1;
        springCount -= l;
        minLength -= (last) ? l : l+1;
        let mem = [];
        
        for (let n = 0; n < next.length; n++) {
          for (let i = 0; i < next[n].length; i++) {
            if (next[n].length-i < minLength) break;
            if (next[n].substring(0,i).includes('#')) break;
            const partial = next[n].substring(i,i+l);
            const rest = next[n].substring(i+l);
            const following = rest.charAt(0);
            
            if (
                partial.length === l &&
                !partial.includes('.') &&
                (
                  ( !last && following !== '#' ) ||
                  ( last && !rest.includes('#') )
                )) {
              
              if (last) counts[r][c]++;
              else {
                let possible = rest.substring(1);
                let isLongEnough = possible.length > (minLength-BR[b+1]-BR.length-1);
                let isNotEmpty = possible.includes('#') || possible.includes('?');
                let hasEnoughSprings = possible.replaceAll('.','').length >= springCount;
                if (isLongEnough && isNotEmpty && hasEnoughSprings) mem.push(possible);
              }

            }
          }
        }
        next = [...mem];
      }
    }
  }
  
  const totals = counts.map((x,i) => {
    const f = x[0];
    const m = x[1]/x[0];
    return Math.pow(m,N-1)*f;
  }).reduce((a,x) => a+x, 0);

  console.log("E2: ", totals);
});
