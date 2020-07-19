const server = require('./server.js')
const player = require("./Player.js");
const Player = player.Player;
const room = require("./Room.js")
const Room = room.Room;
const Monster = require('./Monster.js');

class Game {
  constructor(extent) {
    this.extent = extent;
    this.canvas = 0;
    this.cellSize = this.canvas.width / this.extent;
    // this.context = this.canvas.getContext('2d');
    this.difficulty = 0;
    this.levelCounter = 0;
    this.pause = false;
    this.playerLifes = 3;
    this.playerCount = 0;
    this.players = new Map();
    this.monster = new Monster(2, 9, 'purple', false, 2)
    this.connectionCount = 0; 
    this.readyCount = 0; 
    this.gameState = {
        room : [],
        door: {color: 'white', state: 'closed', position: {x : 0, y : 0}},
        players: [],
        monster : {
          x: this.monster.x,
          y: this.monster.y,
          color: this.monster.color,
          vertical: this.monster.vertical
        }
    }
  }
  playerConnect() {
    this.playerCount++;
    console.log(this.playerCount)
  }
  playerDisconnect() {
    this.playerCount--;
    console.log(this.playerCount)
  }
  newPlayer(name, socketID) {
    this.connectionCount++
    console.log(this.connectionCount)
    this.players.set(socketID,new Player (0,0,'green',this.playerLifes,'ArrowRight', socketID, name))
    /* switch (this.connectionCount) {
        case 1: 
            this.player1 = new Player (0,0,'green',this.playerLifes,'ArrowRight', socketID, name)
            console.log('new Player') 
            console.log(this.player1.socketID + ' ist spieler 1')
            break;
        case 2:
            this.player2 = new Player (10,0,'red',this.playerLifes,'ArrowRight', socketID, name) 
            console.log(this.player2.socketID +  ' ist spieler 2')
            break;
        default: 
            console.log("Game full")
            break;
    } */
    console.log(this.players.get(socketID).name);
    server.sendDifficultyToClient(socketID,this.difficulty);
  }
  playerReady(socketID){
    // Funktioniert brauchen wir aber noch nicht
    this.players.get(socketID).ready = 1;
    this.readyCount++;
    if (this.readyCount === this.connectionCount) {
      this.startGame();
    }
  }
  startGame() {
    server.sendStartGame();
    this.timer();
    this.room = new Room(this.extent, 1);
    this.loop();
  }
  // Spiel-Timer
  timer() {
    let minuten = 0;
    switch (this.difficulty) {
      case 1:
        minuten = 0;
        break;
      case 2:
        minuten = 10;
        break;
      case 3:
        minuten = 5;
        break;
    }
    if (minuten != 0) {
      let timerMin = minuten;
      let timerSek = 0;
      /* document.getElementById("pause").onclick = function () {
        this.pause = true;
      }; //TO-DO Brauchen wir das? */
      let timer = setInterval(function () {
        let time = (timerMin + ':' + timerSek)
        server.sendTimer(time); 
        console.log(time);
        if (timerSek === 0 && timerMin === 0) {
            clearInterval(timer);
            this.gameOver();
        } else if (timerSek === 0) {
            timerMin--;
            timerSek += 59;
        } else {
            timerSek--;
        }
      }, 1000);
    }
  }
  loop() {
    setInterval(() => {
      this.updateGameState();
      this.drawGameState(); 
    }, 33)
  }
  updateMovement(socketID, pressedKey) {
    this.players.get(socketID).updateMovement(pressedKey);
  }
  updateGameState(){
    let number = 0;
    let gameStatePlayer = [];
    for (var key of this.players.keys()) {

    gameStatePlayer[number] = this.players.get(key).update();
    number++;

    }
    this.gameState.players = gameStatePlayer;
    this.gameState.room = this.room.update(); 
    this.gameState.door = this.room.door.update();
    
    this.monster.update();
    this.gameState.monster.x = this.monster.x;
    this.gameState.monster.y = this.monster.y;

  }
  drawGameState() {
    console.log(this.gameState)
    server.sendDraw(this.gameState)
  }
  damage(playerPosition) {
    if (
      playerPosition.x === monsterPostion.x &&
      playerPosition.y === monsterPosition.y
    ) {
      socket.broadcast.emit("player1_damage");
    }
  }
  /*
    // Room laden + Level starten
    play() {
        levelCounter++;
        this.room = new Room(this.canvas, this.extent, levelCounter); // TO-DO: constructor , beinhaltet levelCounter! 
        // document.getElementById("play").onclick = this.runLevel.bind(this);    //Level auf Knopfdruck starten   // TO-DO
        this.runLevel();   // Level startet automatisch
    }
    // Level spielen + Pause Option + Restart Option
    runLevel() {
        this.room.reset();  //TO-DO:  An class Room anpassen 
        this.pause = false; 
        let frameCount = 0; 
        let running = window.setInterval(function() {
            this.loop(frameCount).bind(this);
            if (this.player1.leben === 0 && this.player2.leben === 0) { 
                clearInterval(running);
                // TO-DO: Draw Restart Screen 
                document.getElementById("play").onclick = this.runLevel.bind(this);  // Möglichkeit das Level neu zu starten 
            };
            if (this.room.complete === 1) {
                clearInterval(running); 
                // TO-DO: Draw Next Level Screen
                this.pause = true; 
                document.getElementById("next").onclick = this.play(); 
            }
        }
        , 33); 
        document.getElementById("pause").onclick = clearInterval(running); //Brauchen wir das? // TO-DO
    }
    // Game-Loop
    loop(frameCount) {
        frameCount++;
        this.update();
        this.draw(frameCount);
    }
    // Update in jedem Loop
    update() {
        this.room.update();
        this.player.update(); 
        // this.monster1.update(); 
    }
    // Zeichnen in jedem Loop
    draw(frameCount) {
        this.room.draw(frameCount)
        this.player1.draw(frameCount)
        this.player2.draw(frameCount)
        // this.monster1.draw(frameCount);  // TO-DO
    }
    // GameOver Bildschirm
    gameOver() {
        // TO-DO: drawgameOverBilschirm
        clearInterval(running);
        document.getElementById("end").onclick = startGame(); 
    }*/
}
module.exports = {
  Game: Game,
};
