module.exports = class Monster {
  /**
   * constructs a monster.
   * @param {number} x x position of the monster
   * @param {number} y y position of the monster
   * @param {boolean} vertical vertical or horizontal
   */

  constructor(x, y, socket, vertical, life) {
    this.x = x;
    this.y = y;
    this.socket = socket;
    this.life = life;
    this.vertical = vertical;
    this.move = 1;
    this.context = context;
  }
  update() {
    if (this.vertical) {
      if (this.y === 10) {
        this.move = -1;
      } else if (this.y === 1) {
        this.move = 1;
      }
      this.y += this.move;
    } else {
      if (this.x === 10) {
        this.move = -1;
      } else if (this.x === 1) {
        this.move = 1;
      }
      this.x += this.move;
    }
  }
};
