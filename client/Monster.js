export class Monster {
  /**constructs a monster.
   * @param {string} color color of the monster
   * @param {number} cellSize width / extent
   * @param {number} extent extent of the field
   *
   */

  constructor(color, cellSize, context) {
    this.color = color;
    this.cellSize = cellSize;
    this.context = context;
  }
  draw(x, y) {
    this.context.fillStyle = this.color;
    this.context.fillRect(
      this.x * this.cellSize,
      this.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
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
}
