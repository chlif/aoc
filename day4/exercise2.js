let fs = require('fs');
const file = './input.txt';
const eclOptions = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
const fields = {
  byr: value => (value !== undefined) && (value.length === 4) && (parseInt(value) >= 1920) && (parseInt(value) <= 2002),
  iyr: value => (value !== undefined) && (value.length === 4) && (parseInt(value) >= 2010) && (parseInt(value) <= 2020),
  eyr: value => (value !== undefined) && (value.length === 4) && (parseInt(value) >= 2020) && (parseInt(value) <= 2030),
  hgt: value => {
    if (value === undefined) return false;
    const parts = value.match(/([0-9]{2,3})(cm|in)/);
    if (parts === null) return false;
    const hgt = parseInt(parts[1]);
    return (parts[2] === "cm" && hgt >= 150 && hgt <= 193) || (parts[2] === "in" && hgt >= 59 && hgt <= 76);
  },
  hcl: value => (value !== undefined) && !!value.match(/\#[0-9a-f]{6}$/),
  ecl: value => (value !== undefined) && eclOptions.includes(value),
  pid: value => (value !== undefined) && !!value.match(/^[0-9]{9}$/),
  cid: value => true,
};

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
  return Object.keys(fields).reduce((mem, key) => {
    return mem && fields[key].call(this, passport[key]);
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
