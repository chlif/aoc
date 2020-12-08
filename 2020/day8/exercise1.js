let fs = require('fs');
const file = './input.txt';
const codeRegex = /(nop|acc|jmp) ([\+\-0-9]*)/;

const run = (acc, line, code) => {
  if (line === code.length || code[line] === 'visited') return acc;
  const command = code[line].match(codeRegex);
  const nextCode = [...code.slice(0,line), 'visited', ...code.slice(line+1)];
  switch (command[1]) {
    case 'nop':
      return run(acc, line+1, nextCode)
    case 'acc':
      return run(acc+parseInt(command[2]), line+1, nextCode);
    case 'jmp':
      return run(acc, line+parseInt(command[2]), nextCode);
    default:
      throw 'Failed to find a correct command';
  }
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const code = data.split('\n').filter(row => row.length > 0);

  console.log(run(0, 0, code));

});
