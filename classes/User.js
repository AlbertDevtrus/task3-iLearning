const Game = require('./Game.js');
const prompt = require('prompt-sync')(({ sigint: true }));


class User {
  constructor() {
    move: ''
  }

  selectMove(moves) {
    let userMove = '';
    while(isNaN(userMove) || !moves[userMove - 1]) {
      userMove = prompt('Enter your move: ')
      if(userMove === '0') {
        console.log('Exiting the game...')
        process.exit();
      }
      if(userMove === '?') {
        const game = new Game(moves);
        game.generateTable(moves);
      }
    }
    
    this.move = userMove - 1;
  }
}

module.exports = User;