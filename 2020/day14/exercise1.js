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

const apply = (value, mask) => {
  const valueBin = dec2bin(value);
  const maskArray = mask.split('');
  const maskedBin = valueBin.split('')
      .map((a, i) => (maskArray[i] === 'X') ? a : maskArray[i]);
  return bin2dec(maskedBin.join(''));
};

const run = (code, mask, memory) => {
  if (code.length === 0) return memory;
  const parts = code[0].match(regexp);
  if (parts[1] === 'mask') {
    return run(code.slice(1), parts[2], memory);
  }
  else if (parts[3] === 'mem') {
    let tmp = {};
    tmp[parts[4]] = apply(parts[5], mask);
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
