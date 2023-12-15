let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const getHASH = str => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = hash + str.charCodeAt(i);
      hash = hash * 17;
      hash = hash % 256;
    }
    return hash;
  };

  const REGEX_LENS = /([a-z]+)([\=\-]{1})([0-9]*)/
  const codes = input[0].split(',')
      .map(c => {
        let obj = {};
        const m = c.match(REGEX_LENS);
        obj.label = m[1];
        obj.box = getHASH(m[1]);
        obj.opr = m[2];
        if (m[3] !== '') obj.focal = eval(m[3]);
        return obj;
      });
  let boxes = [...new Array(256)].map(x => []);

  const removeLens = (box, label) => {
    for (let i = 0; i < boxes[box].length; i++) {
      if (boxes[box][i].label === label) {
        boxes[box].splice(i,1);
        return;
      }
    }
  };

  const addLens = (box, label, focal) => {
    for (let i = 0; i < boxes[box].length; i++) {
      if (boxes[box][i].label === label) {
        boxes[box][i].focal = focal;
        return;
      }
    }
    boxes[box].push({ label, focal });
  };

  codes.forEach(c => {
    switch (c.opr) {
      case '-':
        removeLens(c.box, c.label);
        break;
      case '=':
        addLens(c.box, c.label, c.focal);
        break;
      default: break;
    }
  });

  const total = boxes.reduce((a,box,i) => a + box.reduce((b,lens,j) => b + (i+1)*(j+1)*lens.focal, 0), 0);

  console.log("E2: ", total);
});
