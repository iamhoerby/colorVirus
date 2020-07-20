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
    this.playerCount = 0;
    this.player1;
    this.player2;
    this.connectionCount = 0;
    this.frameCount = 0;
    this.monsters = [];
    this.monsterColors;
    this.killed = false;
    this.gameState = {
      room: [],
      door: {
        color: 'white',
        state: 'closed',
        position: {
          x: 0,
          y: 0
        }
      },
      player1: {
        x: 0,
        y: 0,
        color: 'blue'
      },
      player2: {
        x: 0,
        y: 0,
        color: 'blue'
      },
      monsters: []
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
    switch (this.connectionCount) {
      case 1:
        this.player1 = new Player(0, 0, 'green', 3, 'ArrowRight', socketID, name)
        console.log('new Player')
        console.log(this.player1.socketID + ' ist spieler 1')
        break;
      case 2:
        this.player2 = new Player(10, 0, 'red', 3, 'ArrowRight', socketID, name)
        console.log(this.player2.socketID + ' ist spieler 2')
        break;
      default:
        console.log("Game full")
        break;
    }
    console.log(name);
    server.sendDifficultyToClient(this.difficulty);
  }
  playerReady(socketID) {
    console.log(socketID + ' hat auf ready gedrückt');
    console.log(this.player1.socketID + ' ist die SpielerID');
    // Funktioniert brauchen wir aber noch nicht
    /* if (socketID === this.player1.socketID) {
        this.player1.ready = 1; 
    } else {
        this.player2.ready = 1; 
    }
    if (this.playerCount === 2) {
        if (this.player1.ready === 1 && this.player2.ready === 1) {
            this.startGame()
        }
    } */
    this.startGame();
  }
  startGame() {
    server.sendStartGame();
    this.timer();
    this.room = new Room(this.extent, 1);
    this.monsterCreator();
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
        //console.log(time);
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
      this.update();
      this.draw();
      this.frameCount++;
    }, 10)
  }

  update(pressedKey) {
    if (!this.killed) {
      this.gameState.player1 = this.player1.update(pressedKey);
    }
    // this.gameState.player2 = this.player2.update(); Brauchen wir dann für zweiten Spieler
    this.gameState.room = this.room.update();
    this.gameState.door = this.room.door.update();
    this.pickColor(this.gameState.door.color);

    for (let i = 0; i < this.monsters.length; i++) {
      this.monsters[i].update(this.frameCount, this.gameState.room, this.gameState.door.position);
      this.gameState.monsters[i].x = this.monsters[i].x;
      this.gameState.monsters[i].y = this.monsters[i].y;
      this.gameState.monsters[i].color = this.monsterColors[i];
      this.damage(this.player1, this.gameState.monsters[i]);
    }
  }
  draw() {
    server.sendDraw(this.gameState)
  }

  damage(player, monster) {
    if (player.x === monster.x && player.y === monster.y) {
      //socket.broadcast.emit("player1_damage");
      if (player.lifes === 0) {
        this.killed = true;
      } else {
        player.lifes--;
        player.x = 0;
        player.y = 0;
      }
    }
  }

  monsterCreator() {
    var numberMonsters;
    switch (this.difficulty) {
      case 1:
        numberMonsters = 2;
        break;
      case 2:
        numberMonsters = 3;
        break;
      case 3:
        numberMonsters = 4;
        break;
    }
    for (let i = 0; i < numberMonsters; i++) {
      this.monsters.push(new Monster(
        Math.floor(Math.random() * 63),
        Math.floor(Math.random() * 63 + 2),
        'white'));
      this.gameState.monsters.push({
        x: 0,
        y: 0,
        color: 'white'
      });
    }
  }

  pickColor(color) {
    if (this.monsters.length === 2) {
      if (color === 'red') {
        this.monsterColors = ['yellow', '#ff00ff']
      } else if (color === 'orange') {
        this.monsterColors = ['yellow', 'red']
      } else if (color === 'yellow') {
        this.monsterColors = ['red', 'green']
      } else if (color === 'green') {
        this.monsterColors = ['yellow', 'blue']
      } else if (color === 'blue') {
        this.monsterColors = ['	#00FFFF', '#ff00ff']
      } else {
        this.monsterColors = ['blue', 'red']
      }
    } else if (this.monsters.length === 3) {
      if (color === 'red') {
        this.monsterColors = ['yellow', 'pink', 'purple']
      } else if (color === 'orange') {
        this.monsterColors = ['yellow', 'brown', '#ff00ff']
      } else if (color === 'yellow') {
        this.monsterColors = ['red', 'green', '#f5f5dc']
      } else if (color === 'green') {
        this.monsterColors = ['yellow', '#00FFFF', '#ff00ff']
      } else if (color === 'blue') {
        this.monsterColors = ['#00FFFF', 'pink', 'purple']
      } else {
        this.monsterColors = ['blue', 'yellow', 'purple']
      }
    } else if (this.monsters.length === 4) {
      if (color === 'red') {
        this.monsterColors = ['yellow', 'pink', 'purple', 'blue']
      } else if (color === 'orange') {
        this.monsterColors = ['yellow', 'yellow', '#ff00ff', 'brown']
      } else if (color === 'yellow') {
        this.monsterColors = ['red', 'green', '#f5f5dc', 'violet']
      } else if (color === 'green') {
        this.monsterColors = ['yellow', '#00FFFF', '#ff00ff', 'pink']
      } else if (color === 'blue') {
        this.monsterColors = ['#00FFFF', 'pink', 'purple', 'purple']
      } else {
        this.monsterColors = ['blue', 'yellow', 'purple', 'green']
      }
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
