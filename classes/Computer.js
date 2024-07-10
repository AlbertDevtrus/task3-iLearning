const crypto = require('crypto');
const { sha3_256 } = require('js-sha3');


class Computer {
  constructor() {
    move: ''
    hmac: ''
    secretKey: '';
  }

  selectMove(moves) {
    this.move = moves[Math.floor(Math.random() * moves.length)];
  }

  generateSecretKey() {
    this.secretKey = sha3_256((Date.now()).toString());
  }

  generateHMAC() {
    this.generateSecretKey();
    console.log(this.secretKey)
    this.hmac = crypto.createHmac('sha3-256', this.secretKey);
    this.hmac.update(this.move);
  }
}

module.exports = Computer;
