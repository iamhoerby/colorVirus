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
  drawMonster(monsters){
    for(let i = 0; i < monsters.length; i++){
      this.context.fillStyle = monsters[i].color;
      this.context.fillRect(
      monsters[i].x* this.cellSize,
      monsters[i].y* this.cellSize,
      this.cellSize,
      this.cellSize)
    }
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
// Rendering update *** Andrej *** 08.7.2020

 /* drawLine(x1, y1, x2, y2) {
    // function for simple line drawing
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

   drawBorder() {
    //function for room borders drawing
    this.drawLine(0, 0, this.canvas.width, 0);
    this.drawLine(0, 0, 0, this.canvas.height);
    this.drawLine(this.canvas.width, 0, this.canvas.width, this.canvas.height);
    this.drawLine(0, this.canvas.height, this.canvas.width, this.canvas.height);
    console.log("Drawing gamefield");
  }
*/
  drawObstacle(coord) {
    // function for obstacles drawing
    this.context.fillStyle = "black";
    this.context.fillRect(
      coord.x * this.cellSize,
      coord.y * this.cellSize,
      (this.cellSize * this.extent) / 16,
      (this.cellSize * this.extent) / 16
    );
    console.log("Drawing obstacle");
  }

  drawRoom(gameStateRoomCoord) {
    //drawing room itself: borders, door, obstacles
    //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //this.drawBorder();
    for (let i = 0; i < 8; i++) {
      this.drawObstacle(gameStateRoomCoord[i]);
    }
    //this.door.draw();
  }
  //function for drawing a door
  drawDoor(gameStateDoor) {
    this.context.fillStyle = gameStateDoor.color;
    this.context.fillRect(
      gameStateDoor.position.x * this.cellSize,
      gameStateDoor.position.y * this.cellSize,
      (this.cellSize * this.extent) / 8,
      (this.cellSize * this.extent) / 32
    );
    console.log("Drawing door");
  }

    draw(gameState) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawRoom(gameState.room);
      this.drawPlayer(gameState.player1);
      this.drawPlayer(gameState.player2);
      this.drawDoor(gameState.door);
      this.drawMonster(gameState.monsters);
    }
}
