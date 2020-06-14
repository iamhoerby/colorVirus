export class Monster {
  /**
   * constructs a monster.
   * @param {number} x x position of the monster
   * @param {number} y y position of the monster
   * @param {string} color color of the monster
   * @param {number} life number of lives
   * @param {number} extent extent of the field
   * @param {boolean} vertical vertical or horizontal
   */

  constructor(x, y, color, life, context, cellSize, extent, vertical) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.life = life;
    this.context = context;
    this.extent = extent;
    this.cellSize = cellSize;
    this.move = 1;
    this.vertical = vertical;

    setInterval(this.loop.bind(this), 350);
  }
  draw() {
    //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x * this.cellSize, this.y * this.cellSize, this.cellSize, this.cellSize);
  }
  update() {
    if (this.vertical) {
      if (this.y === this.extent - 2) {
        this.move = -1;
      } else if (this.y === 1) {
        this.move = 1;
      }
      this.y += this.move;
    } else {
      if (this.x === this.extent - 2) {
        this.move = -1;
      } else if (this.x === 1) {
        this.move = 1;
      }
      this.x += this.move;
    }
  }
  loop() {
    this.draw();
    this.update();
  }
}
