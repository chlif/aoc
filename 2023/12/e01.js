let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const rows = input.map(r => ({
    chars: r.split(' ')[0],
    broken: r.split(' ')[1].split(',').map(x => eval(x))
  }));

  let count = 0;
  for (let r = 0; r < rows.length; r++) {
    let next = [rows[r].chars];

    for (let b = 0; b < rows[r].broken.length; b++) {
      const l = rows[r].broken[b];
      const last = b === rows[r].broken.length-1;
      const minLength = rows[r].broken.slice(b).reduce((a,x) => a+x+1, 0)-1;
      let mem = [];
      
      for (let n = 0; n < next.length; n++) {
        for (let i = 0; i < next[n].length; i++) {
          if (next[n].length-i < minLength) break;
          const pre = next[n].substring(0,i);
          const partial = next[n].substring(i,i+l);
          const rest = next[n].substring(i+l);
          const following = rest.charAt(0);
          
          if (
              !pre.includes('#') &&
              partial.length === l &&
              !partial.includes('.') &&
              (
                ( !last && following !== '#' ) ||
                ( last && !rest.includes('#') )
              )) {
            
            if (last) count++;
            else mem.push(rest.substring(1));
          }
        }
      }
      next = [...mem];
    }
  }

  console.log("E1: ", count);
});
