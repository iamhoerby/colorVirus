import { Monster } from "./Monster.js";

export class Rendering {
  constructor(canvas, extent) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.extent = extent;
    this.cellSize = this.canvas.width / this.extent;
  }
  // Start Screen with Name Input
  inputName() {
    document.getElementById("startName").classList.remove("displayNone");
  }
  // Screen with the Difficulty Options
  chooseDifficulty(difficulty) {
    document.getElementById("startName").classList.add("displayNone");
    document.getElementById("difficulty").classList.remove("displayNone");
    document.getElementById("ready").classList.remove("displayNone");
    switch (difficulty) {
      case 1:
        document.getElementById("middle").disabled = true;
        document.getElementById("hard").disabled = true;
        document.getElementById("easy").classList.add("locked");
        break;
      case 2:
        document.getElementById("easy").disabled = true;
        document.getElementById("hard").disabled = true;
        document.getElementById("middle").classList.add("locked");
        break;
      case 3:
        document.getElementById("easy").disabled = true;
        document.getElementById("middle").disabled = true;
        document.getElementById("hard").classList.add("locked");
        break;
      default:
        document.getElementById("submitDifficulty").classList.remove("displayNone");
        break;
    }
  }
  startGame() {
      console.log('Start Game');
      document.getElementById("difficulty").classList.add("displayNone");
      document.getElementById("ready").classList.add("displayNone");
      document.getElementById("canvas").classList.remove("displayNone");  
  }
  drawTimer(time) {
      document.getElementById('timer').innerHTML = time
  }
  draw(gameState) {
    this.drawRoom(gameState.room);
    this.drawPlayer(gameState.player1);
    this.drawPlayer(gameState.player2);
    this.drawDoor(gameState.door);
  }
  drawRoom() {

  }
  drawDoor() {
    
  }
  drawPlayer(gameStatePlayer) {
    this.context.fillStyle = gameStatePlayer.color;
    this.context.fillRect(
      gameStatePlayer.x * this.cellSize,
      gameStatePlayer.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
}
