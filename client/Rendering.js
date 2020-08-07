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
    document.getElementById("hard").disabled = false;
    document.getElementById("middle").disabled = false;
    document.getElementById("easy").disabled = false;
    document.getElementById("hard").classList.remove("locked");
    document.getElementById("middle").classList.remove("locked");
    document.getElementById("easy").classList.remove("locked");
    document.getElementById("ready").disabled = false;
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
  restart() {
    document.getElementById("gameOver").classList.add("displayNone");
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
      (this.cellSize * this.extent) / (this.extent/2),
      (this.cellSize * this.extent) / (this.extent/2)
    );
  }

  // creates color "aura" around obstacles. Pure cosmetic effect, has nothing to do with gameplay
  drawObstEffect(coord, color) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc((coord.x + 1) * this.cellSize, (coord.y + 1) * this.cellSize, (this.cellSize * this.extent) / (this.extent/2), 0, 2 * Math.PI);
    this.context.fill();
    console.log(color);
    }

  drawRoom(gameStateRoomCoord) {
    //drawing room itself: borders, door, obstacles
    for (let i = 0; i < gameStateRoomCoord.length; i++) {
      this.drawObstacle(gameStateRoomCoord[i]);
    }
  }
  //function for drawing a door
  drawDoor(gameStateDoor) {
    this.context.fillStyle = gameStateDoor.color;
    this.context.fillRect(
      gameStateDoor.position.x * this.cellSize,
      gameStateDoor.position.y * this.cellSize,
      (this.cellSize * this.extent) / (this.extent/8),
      (this.cellSize * this.extent) / (this.extent/2)
    );
  }

  /* If a bullet hit an obstacle, glow effect will be drown*/ 
  makeGlow(obstacle, gameStatePlayer) {
    for (let i = 0; i < obstacle.length; i++) {
      for (let j = 0; j < gameStatePlayer.length; j++) {
        if (gameStatePlayer[j].bullet.direction === "right" && gameStatePlayer[j].bullet.x + 1 === obstacle[i].x && 
            (gameStatePlayer[j].bullet.y === obstacle[i].y || gameStatePlayer[j].bullet.y === obstacle[i].y + 1)) {
            this.drawObstEffect(obstacle[i], gameStatePlayer[j].color);
            }
        if (gameStatePlayer[j].bullet.direction === "left" && gameStatePlayer[j].bullet.x - 1 === obstacle[i].x + 1 && 
            (gameStatePlayer[j].bullet.y === obstacle[i].y || gameStatePlayer[j].bullet.y === obstacle[i].y + 1)) {
              this.drawObstEffect(obstacle[i], gameStatePlayer[j].color);    
          }
        if (gameStatePlayer[j].bullet.direction === "down" && gameStatePlayer[j].bullet.y + 1 === obstacle[i].y && 
            (gameStatePlayer[j].bullet.x === obstacle[i].x || gameStatePlayer[j].bullet.x === obstacle[i].x + 1)) {
              this.drawObstEffect(obstacle[i], gameStatePlayer[j].color);    
          }
        else if (gameStatePlayer[j].bullet.direction === "up" && gameStatePlayer[j].bullet.y - 1 === obstacle[i].y + 1 && 
            (gameStatePlayer[j].bullet.x === obstacle[i].x || gameStatePlayer[j].bullet.x === obstacle[i].x + 1)) {
              this.drawObstEffect(obstacle[i], gameStatePlayer[j].color);    
          }
       }
    }
  }

  draw(gameState) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.makeGlow(gameState.room, gameState.players);
    this.drawRoom(gameState.room);
    this.drawDoor(gameState.door);
    for (let x = 0; x < gameState.players.length; x++) {
      this.drawPlayer(gameState.players[x]);
      if (gameState.players[x].shoot) {
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
