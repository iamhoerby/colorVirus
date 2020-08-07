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
        document
          .getElementById("submitDifficulty")
          .classList.remove("displayNone");
        break;
    }
  }
  startGame() {
    document.getElementById("difficulty").classList.add("displayNone");
    document.getElementById("ready").classList.add("displayNone");
    document.getElementById("myCanvas").height = window.innerHeight * 0.75;
    document.getElementById("myCanvas").width = document.getElementById(
      "myCanvas"
    ).height;
    this.cellSize = this.canvas.width / this.extent;
    document.getElementById("canvas").classList.remove("displayNone");
  }
  drawTimer(time) {
    document.getElementById("timer").innerHTML = time;
  }
  drawMonster(monsters) {
    for (let i = 0; i < monsters.length; i++) {
      if (monsters[i].alive) {
        this.context.fillStyle = monsters[i].color;
        this.context.fillRect(
          monsters[i].x * this.cellSize,
          monsters[i].y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      } else {
        this.context.fillStyle = monsters[i].color;
        this.context.beginPath();
        this.context.arc(
          (monsters[i].x + 0.5) * this.cellSize,
          (monsters[i].y + 0.5) * this.cellSize,
          this.cellSize / 2,
          0,
          Math.PI * 2,
          true
        );
        this.context.fill();
      }
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

  drawBullet(gameStatePlayer) {
    this.context.fillStyle = gameStatePlayer.bullet.color;
    this.context.fillRect(
      gameStatePlayer.bullet.x * this.cellSize,
      gameStatePlayer.bullet.y * this.cellSize,
      this.cellSize / 2,
      this.cellSize / 2
    );
  }

  drawObstacle(coord) {
    // function for obstacles drawing
    this.context.fillStyle = "black";
    this.context.fillRect(
      coord.x * this.cellSize,
      coord.y * this.cellSize,
      (this.cellSize * this.extent) / 32,
      (this.cellSize * this.extent) / 32
    );
  }

  // creates color "aura" around obstacles. Pure cosmetic effect, has nothing to do with gameplay
  /* drawObstEffect(coord) {
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
  }

  /* makeGlow(obstacle, gameStatePlayer) {
    for (let i = 0; i < obstacle.length; i++){
      if (gameStatePlayer.bullet.x + 1 === obstacle[i].x &&
          gameStatePlayer.bullet.y === obstacle[i].y ||
          gameStatePlayer.bullet.y === obstacle[i].y + 1) 
          {
          this.drawObstEffect(obstacle[i]);
          }
      else if (gameStatePlayer.bullet.x - 1 === obstacle[i].x + 1 && 
          this.y === obstacle[i].y ||
          this.y === obstacle[i].y + 1) 
          {
          this.move = 1;
      }
    }
  }*/

  draw(gameState) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //  this.makeGlow(gameState.room, gameState.monsters);
    this.drawRoom(gameState.room);
    this.drawDoor(gameState.door);
    for (let x = 0; x < gameState.players.length; x++) {
      this.drawPlayer(gameState.players[x]);
      if (gameState.players[x].shoot === true) {
        this.drawBullet(gameState.players[x]);
      }
    }
    this.drawMonster(gameState.monsters);
  }
  drawGameOver(levelCount) {
    document.getElementById("canvas").classList.add("displayNone");
    document.getElementById("timer").classList.add("displayNone");
    document.getElementById("gameOver").classList.remove("displayNone");
    if (levelCount < 10) {
      document.getElementById("levelCounter").innerHTML =
      "<h3>sorry. you've lost!</h3><br> you only completed " + levelCount + " level!";
    } else {
      document.getElementById("levelCounter").innerHTML =
      "<h3>you WIN!</h3> <br> you completed " + levelCount + " level!";
    }
    
  }
}
