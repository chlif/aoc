const input = '19,0,5,1,10,13';
//const input = '0,3,6';
//const input = '1,3,2';
//const input = '3,1,2';

(() => {
  let steps = 30000000;
  let state = input.split(',')
      .reduce((a,n,i) => {
        let obj = {}; obj[n] = i; return {...a, ...obj};
      }, {});
  let p;
  let s = input.split(',').length;
  let l = -1;

  for (let i = s; i < steps; i++) {
    p = (l === -1) ? 0 : i-1-l;
    l = (state[p] === undefined) ? -1 : state[p];
    state[p] = i;

    if (i%10000000 === 0) console.log('.');
  }
  console.log(p);
})();
