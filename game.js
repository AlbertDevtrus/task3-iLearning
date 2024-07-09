const prompt = require('prompt-sync')(({ sigint: true }));
const crypto = require('crypto');
const { Table } = require('console-table-printer');
const { sha3_256 } = require('js-sha3');


const moves = process.argv.slice(2);

const secretKey = sha3_256((Date.now()).toString());

if(moves.some((move, i) => moves.some((m, x) => m === move && i !== x))) {
  console.log('You have options repeated, please use different options! \n\nExample: node game.js rock paper scissors');
  return;
}

if(moves.length < 3) {
  console.log('You should have at least 3 options to play!\n\nExample: node game.js rock paper scissors');
  return;
}

if(moves.length % 2 === 0) {
  console.log('The moves should be a odd quantity\n\nBad: node game.js rock paper scissors spock\nGood: node game.js rock paper scissors spock lizard');
  return;
}

const emptyArr = Array(moves.length).fill(Array(moves.length).fill(''));
const half = Math.floor(moves.length / 2)

const winArray = emptyArr.map((first, i) => {
  return first.map((second, j) => {
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

function game() {
  
  const computerMove = moves[Math.floor(Math.random() * moves.length)];
  const hmac = crypto.createHmac('sha3-256', secretKey);
  hmac.update(computerMove);
  
  console.log(`\nHMAC: ${hmac.digest('hex')}\n`);
  console.log('Available moves:\n')

  moves.forEach((move, i) => console.log(`${i + 1} - ${move}`))
  console.log('0 - Exit\n? - Help\n');
  
  let userMove = prompt('Enter your move: ');
  
  if(userMove === '0') return;
  if(userMove === '?') {
    generateTable();
  }

  while(isNaN(userMove) || !moves[userMove - 1]) {
    userMove = prompt('Enter your move: ')
    if(userMove === '0') return;
    if(userMove === '?') {
      generateTable();
    }
  }

  console.log(`\nYour move: ${moves[userMove - 1]}`);
  console.log(`Computers move: ${computerMove}`);

  if(moves[userMove - 1] === computerMove) {
    console.log("\nIt's a draw!")
  } else if(winArray[userMove - 1][moves.indexOf(computerMove)] === 'Win') {
    console.log("\n You win!")
  } else {
    console.log("\nComputer win!")
  }
  
  console.log(`\nHMAC key: ${secretKey}`);

  console.log('\nCheck the results here: https://www.lddgo.net/en/encrypt/hmac \nYou would need the computer response, the HMAC key and the SHA3-256 hash.')
}

function generateTable() {
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
      movesObj[move.toUpperCase()] = winArray[i][j];
    });

    p.addRow({
      'v Computer / User >': move.toUpperCase(),
      ...movesObj
    }, { color: 'custom_red' })
  });

  p.printTable();
}

game();