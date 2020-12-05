let fs = require('fs');
const file = './input.txt';
const lowChars = "FL";

const validateBoardingPass =
    instructions => !!instructions.match(/^[BF]{7}[LR]{3}$/);

const parseBoardingPass = instructions => ({
  row: positionCounter(0, 127, instructions.slice(0,7)),
  seat: positionCounter(0, 7, instructions.slice(7))
});

const positionCounter = (lowest, highest, instructions) => {
  const instruction = instructions.charAt(0);
  if (instructions.length === 1) {
      return (lowChars.includes(instruction)) ? lowest : highest;
  }

  const halfOfRange = Math.ceil((highest-lowest)/2);
  const nextLowest = (lowChars.includes(instruction)) ? lowest : lowest+halfOfRange;
  const nextHighest = (lowChars.includes(instruction)) ? lowest+halfOfRange-1 : highest;
  return positionCounter(nextLowest, nextHighest, instructions.slice(1));
};

const getSeatId = boardingPass => boardingPass.row * 8 + boardingPass.seat;
const findHighest = (highest, curr) => (curr > highest) ? curr : highest;

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const highest = data.split("\n")
      .filter(validateBoardingPass)
      .map(parseBoardingPass)
      .map(getSeatId)
      .reduce(findHighest, 0);

  console.log(highest);
});
