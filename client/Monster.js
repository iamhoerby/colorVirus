export class Monster {
  /**constructs a monster.
   * @param {string} color color of the monster
   * @param {number} cellSize width / extent
   * @param {number} extent extent of the field
   *
   */

  constructor(color, cellSize, context, extent) {
    this.color = color;
    this.cellSize = cellSize;
    this.context = context;
    this.extent = extent;
  }
  draw(x, y) {
    this.context.fillStyle = this.color;
    this.context.fillRect(
      x * this.cellSize,
      y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
}
