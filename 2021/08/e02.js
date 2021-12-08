let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const segments = ['a','b','c','d','e','f','g'];
  const fetchGroup = (input,out) => input.map(i => i.split('|')[(out) ? 1 : 0].match(/[a-g]{1,8}/g));
  const notes = input => fetchGroup(input, false);
  const outputs = input => fetchGroup(input, true);
  const intersection = (str1, str2) => str1.split('').filter(l => str2.split('').includes(l)).join('');
  const division = (str1, str2) => str1.split('').filter(l => !str2.split('').includes(l)).join('');
  const alphabetical = str => str.split('').sort().join('');
  const decodeDisplay = note => {
    const one = note.filter(n => n.length === 2)[0];
    const four = note.filter(n => n.length === 4)[0];
    const seven = note.filter(n => n.length === 3)[0];
    const eight = note.filter(n => n.length === 7)[0];

    const three = note.filter(n => n.length === 5 && intersection(n,one).length === 2)[0];
    const five = note.filter(n => n.length === 5 && intersection(n, division(four,three)).length === 1)[0];
    const two = note.filter(n => n.length === 5 && ![three,five].includes(n))[0];

    const zero = note.filter(n => n.length === 6 && intersection(five, division('abcdefg',n)))[0];
    const six = note.filter(n => n.length === 6 && intersection(seven, division('abcdefg',n)))[0];
    const nine = note.filter(n => n.length === 6 && ![zero,six].includes(n))[0];

    return [zero, one, two, three, four, five, six, seven, eight, nine].map(alphabetical);
  };

  const decodeAll = input => {
    const mapping = notes(input).map(decodeDisplay);
    return outputs(input).map((r,i) => parseInt( r.map(n => mapping[i].indexOf(alphabetical(n))).join('')));
  };

  console.log("E2: ", decodeAll(input).reduce((a,b) => a+b, 0));
});
