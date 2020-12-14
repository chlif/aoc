let fs = require('fs');
const file = './input.txt';
const emptyMask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const regexp = /(?:(mask) = ([X01]{36}))|(?:(mem)\[(\d*)\] = (\d*))/;

const dec2bin = dec => {
    const value = (dec >>> 0).toString(2);
    let preset = '';
    for (let i = 0; i < 36-value.length; i++) {
      preset = preset + '0';
    }
    return preset + value;
}
const bin2dec = bin => parseInt(bin, 2);

const applyMemoryMask = (value, mask) => {
  const valueBin = dec2bin(value);
  const maskArray = mask.split('');
  return valueBin.split('')
      .map((a, i) => (maskArray[i] === '0') ? a : maskArray[i]);
};

const getAlternative = (mask, i) => {
  const bits = dec2bin(i);
  let x = bits.length-1;
  let alternative = [...mask];
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 'X') {
      alternative[i] = bits[x];
      x--;
    } else {
      alternative[i] = mask[i];
    }
  }
  return bin2dec(alternative.join(''));
};

const assignByMask = (value, mask) => {
  const countX = mask.length - [...mask].sort().indexOf('X');
  let obj = {};
  for (let i = 0; i < Math.pow(2,countX); i++) {
    obj[getAlternative(mask, i)] = value;
  }
  return obj;
};

const run = (code, mask, memory) => {
  if (code.length === 0) return memory;
  const parts = code[0].match(regexp);
  if (parts[1] === 'mask') {
    return run(code.slice(1), parts[2], memory);
  }
  else if (parts[3] === 'mem') {
    const tmp = assignByMask(parseInt(parts[5]), applyMemoryMask(parts[4], mask));
    return run(code.slice(1), mask, {...memory, ...tmp});
  }
  throw `Unexpected line of code ${code[0]}`;
};

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const code = data.split('\n')
      .filter(row => row.length > 0);

  const memory = run(code, emptyMask, {});
  console.log(Object.keys(memory).reduce((a,k) => a+memory[k], 0));

});
