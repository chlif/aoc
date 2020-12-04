const input = require('./input1.json');

const findPair = (arr) => {
  if (arr.length == 0) return null;
  return findPairIt(arr[0], arr.slice(1)) || findPair(arr.slice(1));
}

const findPairIt = (num, arr) => {
  if (arr.length === 0) return null;
  if (num + arr[0] === 2020) return [num, arr[0]];
  return findPairIt(num, arr.slice(1));
}

const r = findPair(input);
console.log(r);
console.log(r[0] + r[1]);
console.log(r[0] * r[1]);
