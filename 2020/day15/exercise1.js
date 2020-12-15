const input = '19,0,5,1,10,13';
//const input = '0,3,6';
//const input = '1,3,2';
//const input = '3,1,2';

(() => {
  let steps = 2020;
  let state = input.split(',').map(n => parseInt(n));
  let p = state.slice(-1)[0];

  for (let i = state.length; i < steps; i++) {
    let l = state.lastIndexOf(p, -2);
    p = (l === -1) ? 0 : i-1-l;
    state.push(p);
  }

  console.log(p);
})();
