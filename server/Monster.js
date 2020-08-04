module.exports = class Monster {
  /**
   * constructs a monster.
   * @param {number} x x position of the monster
   * @param {number} y y position of the monster
   * @param {string} color color of monster
   */
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vertical = Boolean(Math.floor(Math.random() * 2));
    this.move = 1;
    this.speed = 7;
    this.alive = true;
  }
  update(frames, coord, door, extent) {
    this.collisionObs(coord);
    this.collisionDoor(door);

    if (frames % this.speed === 0) {
      if (this.vertical) {
        if (this.y === extent - 2) {
          this.move = -1;
        } else if (this.y === 0) {
          this.move = 1;
        }
        this.y += this.move;
      } else {
        if (this.x === extent - 2) {
          this.move = -1;
        } else if (this.x === 0) {
          this.move = 1;
        }
        this.x += this.move;
      }
    }
  }
  collisionObs(coord) {
    for (let i = 0; i < coord.length; i++) {
      if (!this.vertical) {
        if (this.x + 1 === coord[i].x && (
            this.y === coord[i].y ||
            this.y === coord[i].y + 1)) {
          this.move = -1;
        } else if (this.x - 1 === coord[i].x + 1 && (
            this.y === coord[i].y ||
            this.y === coord[i].y + 1)) {
          this.move = 1;
        }
      } else {
        if (this.y + 1 === coord[i].y && (
            this.x === coord[i].x ||
            this.x === coord[i].x + 1)) {
          this.move = -1;
        } else if (this.y - 1 === coord[i].y + 1 && (
            this.x === coord[i].x ||
            this.x === coord[i].x + 1)) {
          this.move = 1;
        }
      }
    }

  }
  collisionDoor(door) {
    if (!this.vertical) {
      if (this.x + 1 === door.x && (this.y === 0 || this.y === 1)) {
        this.move = -1;
      } else if (this.x - 1 === door.x + 7 && (this.y === 0 || this.y === 1)) {
        this.move = 1;
      }
    } else {
      if ((this.x >= door.x && this.x <= door.x + 7) && this.y === 2) {
        this.move = 1;
      }
    }
  }
};