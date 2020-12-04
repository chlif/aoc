let fs = require('fs');
const file = './input.txt';
const fields = ['byr','iyr','eyr','hgt','hcl','ecl','pid','cid'];

const parsePassport = raw => {
  return raw
    .split(/\n|[ ]/)
    .reduce((mem, item) => {
      let obj = {};
      const parts = item.match(/([a-z]{3}):(.*)/);
      if (parts !== null) obj[parts[1]] = parts[2];
      return {...mem, ...obj};
    }, {});
}

const validatePassport = passport => {
  return fields.reduce((mem, key) => {
    return mem && ((key === 'cid') || (key in passport));
  }, true);
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  console.log(
    data
      .split("\n\n")
      .map(parsePassport)
      .filter(validatePassport)
      .length
    );
});
