const Game = require('./classes/Game');
const Computer = require('./classes/Computer');
const User = require('./classes/User');


const moves = process.argv.slice(2);

function game() {
  const game = new Game();
  game.checkMoves(moves);

  const computer = new Computer();
  computer.selectMove(game.moves);
  computer.generateHMAC();

  console.log(`\nHMAC: ${computer.hmac.digest('hex')}\n`);
  console.log('Available moves:\n')

  game.moves.forEach((move, i) => console.log(`${i + 1} - ${move}`))
  console.log('0 - Exit\n? - Help\n');

  const user = new User();
  user.selectMove(game.moves);

  console.log(`\nYour move: ${moves[user.move]}`);
  console.log(`Computers move: ${computer.move}`);

  game.checkWinner(user.move, computer.move, moves);
  
  console.log(`\nHMAC key: ${computer.secretKey}`);

  console.log('\nCheck the results here: https://www.lddgo.net/en/encrypt/hmac \nYou would need the computer response, the HMAC key and the SHA3-256 hash.')
}

game();