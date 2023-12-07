let fs = require('fs');
const file = './input.txt';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) return console.err(err);
  const input = data.split('\n').filter(row => row.length > 0);

  const TYPE_FIVE_OF_KIND = 1;
  const TYPE_FOUR_OF_KIND = 2;
  const TYPE_FULL_HOUSE = 3;
  const TYPE_THREE_OF_KIND = 4;
  const TYPE_TWO_PAIR = 5;
  const TYPE_ONE_PAIR = 6;
  const TYPE_HIGH_CARD = 7;
  const RANK_OF_CARDS = "AKQJT98765432";

  const type = (hand) => {
    let c = {};
    hand[0].split('').forEach(y => (y in c) ? c[y]++ : c[y] = 1);
    const k = Object.keys(c);
    const h = k.reduce((a,y) => (c[y]>a)?c[y]:a,0);
    if (k.length === 1) return TYPE_FIVE_OF_KIND;
    if (k.length === 2 && h === 4) return TYPE_FOUR_OF_KIND;
    if (k.length === 2 && h === 3) return TYPE_FULL_HOUSE;
    if (h === 3) return TYPE_THREE_OF_KIND;
    if (k.filter(y => c[y] === 2).length === 2) return TYPE_TWO_PAIR;
    if (h === 2) return TYPE_ONE_PAIR;
    return TYPE_HIGH_CARD;
  };

  const rankEqual = (cards1, cards2) => {
    for (let i = 0; i < cards1.length; i++) {
      if (RANK_OF_CARDS.indexOf(cards1.charAt(i)) === RANK_OF_CARDS.indexOf(cards2.charAt(i))) continue;
      if (RANK_OF_CARDS.indexOf(cards1.charAt(i)) < RANK_OF_CARDS.indexOf(cards2.charAt(i))) return 1;
      else return -1;
    }
    return 0;
  };

  const sortHands = (hand1, hand2) => {
    if (hand1[2] < hand2[2]) return 1;
    if (hand1[2] > hand2[2]) return -1;
    return rankEqual(hand1[0], hand2[0]);
  };

  const hands = input
      .map(x => x.split(' ').map((y,i) => (i === 0) ? y : eval(y)))
      .map(x => [...x, type(x)])
      .sort(sortHands);
  
  const winnings = hands.reduce((a,x,i) => a + (i+1) * x[1], 0);

  console.log("E1: ", winnings);
});
