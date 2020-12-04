const input = require('./input1.json');

const findTrio = (arr, goal) => {
    if (arr.length === 0) return null;
    const pair = findPair(arr.slice(1), goal-arr[0]);
    if (pair !== null) return [arr[0]].concat(pair);
    return findTrio(arr.slice(1), goal);
}

const findPair = (arr, goal) => {
  if (arr.length == 0) return null;
  return findPairIt(arr[0], arr.slice(1), goal) || findPair(arr.slice(1), goal);
}

const findPairIt = (num, arr, goal) => {
  if (arr.length === 0) return null;
  if (num + arr[0] === goal) return [num, arr[0]];
  return findPairIt(num, arr.slice(1), goal);
}

const r = findTrio(input, 2020);
console.log(r);
console.log(r[0] + r[1] + r[2]);
console.log(r[0] * r[1] * r[2]);
