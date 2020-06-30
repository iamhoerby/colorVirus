import { Room } from "/Room.js";
import { Spieler } from "/Spieler.js";
import { Monster } from "/Monster.js";

export class Game {
  constructor(canvas, extent, socket) {
    this.socket = socket;
    this.extent = extent;
    this.canvas = canvas;
    this.cellSize = this.canvas.width / this.extent;
    this.context = this.canvas.getContext("2d");
    this.player1 = new Spieler(
      5,
      6,
      "blue",
      3,
      "ArrowRight",
      this.cellSize,
      this.context,
      this.extent,
      this.socket
    );
    this.monster1 = new Monster(
      10,
      5,
      "green",
      true,
      2,
      this.cellSize,
      this.context,
      this.extent
    );
    this.room = new Room(this.canvas, this.extent, 1);
    this.difficulty = 0;
    this.levelCounter = 0;
    this.pause = false;
    document.getElementById("start").onclick = this.startGame.bind(this);
  }
  startGame() {
    setInterval(this.loop.bind(this), 33);
  }
  loop() {
    this.update();
    this.draw();
  }
  update() {
    this.player1.update();
    this.monster1.update();
  }
  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.room.draw();
    this.player1.draw();
    this.monster1.draw();
  }
  damage() {
    this.player1.lifes--;
  }
}
