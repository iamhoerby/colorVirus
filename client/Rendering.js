export class Rendering {
  constructor(canvas, extent) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.extent = extent;
    this.cellSize = 0;
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
      document.getElementById("myCanvas").height = window.innerHeight * 0.75;
      document.getElementById("myCanvas").width = document.getElementById("myCanvas").height;
      this.cellSize = this.canvas.width / this.extent;
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

  drawBullet(gameStatePlayer){
    this.context.fillStyle = gameStatePlayer.bullet.color;
    this.context.fillRect(
      gameStatePlayer.bullet.x * this.cellSize,
      gameStatePlayer.bullet.y * this.cellSize,
      this.cellSize/2,
      this.cellSize/2
    )
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
      (this.cellSize * this.extent) / 32,
      (this.cellSize * this.extent) / 32
    );
    console.log("Drawing obstacle");
  }

  // creates color "aura" around obstacles. Pure cosmetic effect, has nothing to do with gameplay
/*  drawObstEffect(coord) {
    let colors = ["red", "orange", "yellow", "green", "blue", "violet"];
    this.context.fillStyle = "light" + colors[Math.floor(Math.random() * colors.length)];
    this.context.beginPath();
    this.context.arc(coord.x * this.cellSize +  (this.cellSize * this.extent) / 32, 
                      coord.y * this.cellSize + (this.cellSize * this.extent) / 32, 
                      this.cellSize*3, 0, 2 * Math.PI);
    this.context.fill();
  }
  */

  drawRoom(gameStateRoomCoord) {
    //drawing room itself: borders, door, obstacles
    //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //this.drawBorder();
    for (let i = 0; i < gameStateRoomCoord.length; i++) {
      this.drawObstacle(gameStateRoomCoord[i]);
    }
    console.log(gameStateRoomCoord);
    //this.door.draw();
  }
  //function for drawing a door
  drawDoor(gameStateDoor) {
    console.log();
    this.context.fillStyle = gameStateDoor.color;
    this.context.fillRect(
      gameStateDoor.position.x * this.cellSize,
      gameStateDoor.position.y * this.cellSize,
      (this.cellSize * this.extent) / 8,
      (this.cellSize * this.extent) / 32
    );
    console.log("Drawing door");
  }

 /* makeGlow(obstacle, monsters) {
    for (let i = 0; i < obstacle.length; i++){
      for (let j = 0; j< monsters.length; j++){
        if (monsters[j].x >= obstacle[i].x - 1 &&
          monsters[j].x <= obstacle[i].x + 4 &&
          monsters[j].y >= obstacle[i].y - 1 &&
          monsters[j].y <= obstacle[i].y + 4)
          this.drawObstEffect(obstacle[i]);

       }
    }
  }
 */

    draw(gameState) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawRoom(gameState.room);
      this.drawDoor(gameState.door);
      //this.makeGlow(gameState.room, gameState.monsters);
      for (let x = 0; x < gameState.players.length; x++) {
        this.drawPlayer(gameState.players[x]);
        if(gameState.players[x].shoot === true){
          this.drawBullet(gameState.players[x]);
        }
      }
      this.drawMonster(gameState.monsters);
    }
}
