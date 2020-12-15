const input = '19,0,5,1,10,13';
//const input = '0,3,6';

const update = (i, x, state) => {
  let obj = {};
  if (state[x] === undefined) obj[x] = [i];
  else obj[x] = [i, state[x][0]];
  return {...state, ...obj};
}

const turn = (i, p, state) => {
  if (i === 2020) return p;
  if (state[p].length === 1 && state[p][0] === i-1)
    return turn(i+1, 0, update(i, 0, state));
  const x = (state[p].length === 1) ? i-state[p][0] : state[p][0]-state[p][1];
  return turn(i+1, x, update(i, x, state));
};

(() => {
  const i = input.split(',').length;
  const p = input.split(',').slice(-1)[0];
  const state = input
    .split(',')
    .reduce((a, x, i) => {
      let obj = {};
      obj[x] = [i];
      return {...a, ...obj};
    }, {});

  console.log(turn(i, p, state));
})();
