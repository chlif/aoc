let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const rows = input.map(r => {
    const chars = r.split(' ')[0];
    const broken = r.split(' ')[1];
    return {
      chars: [...new Array(5)].map(x => chars).join('?'),
      broken: [...new Array(5)].map(x => broken).join(',').split(',').map(x => eval(x)),
    }
  });

  const getNextMeaningfulIndex = c => ['#','?'].map(x => c.indexOf(x)).filter(x => x > -1).sort((a,b) => a-b)[0];
  const getCacheKey = (c,b) => c.length + '---' + b.length;

  let cache = {};

  const findCombinations = (chars,broken) => {
    const cacheKey = getCacheKey(chars, broken);
    if (Object.keys(cache).includes(cacheKey)) return cache[cacheKey];

    const l = broken[0];
    const nmiChars = getNextMeaningfulIndex(chars);
    if (isNaN(nmiChars)) {
      cache[cacheKey] = 0;
      return 0;
    }
    let possible = chars.substring(nmiChars);
    let count = 0;
    
    for (let i = 0; i < possible.length; i++) {
      if (possible.substring(0,i).indexOf('#') > -1) break;
      const next = possible.substring(i,i+l);
      if (next.length < l) break;
      if (next.indexOf('.') > -1) continue;
      let rest = possible.substring(i+l);
      const nmiRest = getNextMeaningfulIndex(rest);
      if (isNaN(nmiRest) && broken.length > 1) break;
      if (broken.length === 1 && rest.indexOf('#') > -1) continue;
      if (rest.charAt(0) === '#') continue;
      
      if (broken.length === 1) {
        count++;
      } else {
        const nmiCutoff = getNextMeaningfulIndex(rest.substring(1));
        const nextChars = (isNaN(nmiCutoff)) ? rest.substring(1) : rest.substring(nmiCutoff+1);
        count += findCombinations(nextChars,broken.slice(1));
      }
    }
    
    cache[cacheKey] = count;
    return count;
  };

  const counts = rows.map((r,i) => {
    cache = {};
    let c = findCombinations(r.chars, r.broken);
    if (c === 0) console.log(i);
    return c;
  }).reduce((a,x) => a+x, 0);
  
  console.log("E2: ", counts);
});
