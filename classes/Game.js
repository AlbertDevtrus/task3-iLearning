const { Table } = require('console-table-printer');


class Game {
  constructor() {
    winArray: ''
    moves: ''
  }

  generateWinArray(moves) {
    const emptyArr = Array(moves.length).fill(Array(moves.length).fill(''));
    const half = Math.floor(moves.length / 2)
    
    const winArray = emptyArr.map((first, i) => {
      return first.map((_, j) => {
        if(i === j) {
          return 'Draw';
        } else if (
          (j - i <= half && j > i) || 
          (j + half < i)
        ) {
          return 'Win';
        } else {
          return 'Lose';
        }
      })
    })
  
    return winArray;
  }

  checkWinner(userMove, computerMove) {
    this.winArray = this.generateWinArray(this.moves);

    if(this.moves[userMove] === computerMove) {
      console.log("\nIt's a draw!")
    } else if(this.winArray[userMove][Number(this.moves.indexOf(computerMove))] === 'Win') {
      console.log("\n You win!")
    } else {
      console.log("\nComputer win!")
    }
  }

  generateTable(moves) {
    this.winArray = this.generateWinArray(moves);
    const p = new Table({
      columns: [
        {name: 'v Computer / User >', alignment: 'left', color: 'yellow'},
        ...moves.map(move => ({
          name: move.toUpperCase(),
          alignment: 'center'
        }))
      ],
      colorMap: {
        custom_red: '\x1b[38;5;217m'
      }
    });
  
    moves.forEach((move, i) => {
      
      let movesObj = {};
      moves.forEach((move, j) => {
        movesObj[move.toUpperCase()] = this.winArray[i][j];
      });
  
      p.addRow({
        'v Computer / User >': move.toUpperCase(),
        ...movesObj
      }, { color: 'custom_red' })
    });
  
    p.printTable();
  }

  checkMoves(moves) {
    this.moves = moves;

    if(this.moves.length < 3) {
      console.log('You should have at least 3 options to play!\n\nExample: node game.js rock paper scissors');
      process.exit();
    }
    
    if(this.moves.some((move, i) => this.moves.some((m, x) => m === move && i !== x))) {
      console.log('You have options repeated, please use different options! \n\nExample: node game.js rock paper scissors');
      process.exit();
    }
    
    if(this.moves.length % 2 === 0) {
      console.log('The moves should be a odd quantity\n\nBad: node game.js rock paper scissors spock\nGood: node game.js rock paper scissors spock lizard');
      process.exit();
    }
  }
}

module.exports = Game;