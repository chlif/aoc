let fs = require('fs');
const file = './input.txt';
const codeRegex = /(nop|acc|jmp) ([\+\-0-9]*)/;

const run = (acc, line, code, visited) => {
  if (line >= code.length) return acc;
  if (visited.includes(line)) return null;

  const command = code[line].match(codeRegex);
  switch (command[1]) {
    case 'acc':
      return run(acc+parseInt(command[2]), line+1, code, [...visited, line]);
    case 'nop':
      return run(acc, line+1, code, [...visited, line]);
    case 'jmp':
      return run(acc, line+parseInt(command[2]), code, [...visited, line]);
    default:
      throw 'Failed to find a correct command';
  }
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const code = data.split('\n').filter(row => row.length > 0);

  // Yeah, I'm not proud of this
  for (let i = 0; i < code.length; i++) {
    let alteredCode = code;
    if (code[i].includes('jmp')) alteredCode = [...code.slice(0,i), 'nop' + code[i].substr(3), ...code.slice(i+1)];
    if (code[i].includes('nop')) alteredCode = [...code.slice(0,i), 'jmp' + code[i].substr(3), ...code.slice(i+1)];

    const result = run(0, 0, alteredCode, []);
    if (result === null) continue;
    console.log(result);
    break;
  }

});
