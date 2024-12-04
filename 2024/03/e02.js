let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  
  const input = data.split('\n').filter(row => row.length > 0).join('');

  const regex = /mul\(([0-9]{1,3})\,([0-9]{1,3})\)/g;

  const getCount = (s) => [...s.matchAll(regex)]
      .map(x => parseInt(x[1]) * parseInt(x[2]))
      .reduce((a,x) => a+x, 0);

  let str = input;
  let counting = true;
  let count = 0;
  do {
    if (counting) {
      const i = str.indexOf("don't()");
      if (i > -1) {
        const s = str.substring(0,i);
        str = str.slice(i);
        count = count + getCount(s);
      } else {
        count = count + getCount(str);
        break;
      }
      counting = false;
    } else {
      const i = str.indexOf("do()");
      if (i > -1) {
        const s = str.substring(0,i);
        str = str.slice(i);
      } else {
        break;
      }
      counting = true;
    }
  } while (str.length > 0)


  console.log("E1: ", count);
});
