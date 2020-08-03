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
    this.players = new Map();
    this.connectionCount = 0; 
    this.readyCount = 0; 
    this.frameCount = 0;
    this.playerLifes = 3;
    this.colors = ['white','yellow','blue','red','green','orange','violet','brown']
    this.gameState = {
        room : [],
        door: {color: 'white', state: 'closed', position: {x : 0, y : 0}},
        players: [],
        monsters :[]
    }
    this.monsters = [];
    this.monsterColors;
  }
  playerConnect() {
    this.playerCount++;
    console.log('playerCount: ' + this.playerCount)
  }
  playerDisconnect() {
    this.playerCount--;
    console.log('playerCount: ' + this.playerCount)
  }
  newPlayer(name, socketID) {
    this.connectionCount++
    console.log('connectionCount' + this.connectionCount)
    let positionX = 0;
    let positionY = 0;
    let colorNr = 0;
    switch (this.connectionCount % 4){
      case 0: 
        positionX = 1;
        positionY = 1;
        colorNr = 1;
        break;
      case 1: 
        positionX = 0;
        positionY = 0; 
        colorNr = 3;
        break;
      case 2: 
        positionX = 1; 
        positionY = 0;
        colorNr = 2; 
        break;
      case 3: 
        positionX = 0;
        positionY = 1;
        colorNr = 3;
        break;

    }
    let color = this.colorDecode(colorNr);
    this.players.set(socketID,new Player (positionX * (this.extent - 1),positionY * (this.extent - 1),color,3,'ArrowRight', socketID, name))
    console.log(this.players.get(socketID).name + ' x: ' + this.players.get(socketID).x + ' y: ' + this.players.get(socketID).y );
    server.sendDifficultyToClient(this.difficulty);
  }
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    server.sendDifficultyToClient(this.difficulty)
  }
  playerReady(socketID){
    this.players.get(socketID).ready = 1;
    this.readyCount++;
    if (this.readyCount === this.playerCount) {
      this.startGame();
    }
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
    if (minuten !== 0) {
      let timerMin = minuten;
      let timerSek = 0;
      let time = null;
      /* document.getElementById("pause").onclick = function () {
        this.pause = true;
      }; //TO-DO Brauchen wir das? */
      let timer = setInterval(function () {
        if (timerSek < 10) {
          time = (timerMin + ':0' + timerSek)
        } else {
          time = (timerMin + ':' + timerSek)
        }
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
      this.updateGameState();
      this.drawGameState(); 
      this.frameCount++;
    }, 33)
  }
  updateMovement(socketID, pressedKey) {
    this.players.get(socketID).updateMovement(pressedKey, this.gameState.room);
  }
  updateGameState(){
    let number = 0;
    let gameStatePlayer = [];
    for (var key of this.players.keys(this.gameState.room)) {
      if (this.players.get(key).alive) {
        gameStatePlayer[number] = this.players.get(key).update();
        number++;
      }
    }
    this.gameState.players = gameStatePlayer;
    this.gameState.room = this.room.update();
    this.gameState.door = this.room.door.update();
    this.pickColor(this.gameState.door.color);

    for (let i = 0; i < this.monsters.length; i++) {
      if(this.monsters[i].alive){
        this.monsters[i].update(this.frameCount, this.gameState.room, this.gameState.door.position, this.extent);
        this.gameState.monsters[i].x = this.monsters[i].x;
        this.gameState.monsters[i].y = this.monsters[i].y;
      }
      this.gameState.monsters[i].color = this.monsterColors[i];

      for (var key of this.players.keys()) {
        if(this.gameState.monsters[i].alive){
          this.damage(key, this.gameState.monsters[i]);
        }
        this.killMonster(key, this.monsters[i])
        this.gameState.monsters[i].alive = this.monsters[i].alive;
      }
    }
    for (var key of this.players.keys()) {
      this.checkPositions(key)
    }
  }
  drawGameState() {
    server.sendDraw(this.gameState)
  }

  playerVsPlayer(key){ 
    for (var key2 of this.players.keys()){
      if (key !== key2 && this.players.get(key).bullet.x === this.players.get(key2).x && this.players.get(key).bullet.y === this.players.get(key2).y) {
        this.players.get(key2).lifes--;
        if (this.players.get(key2).lifes === 0){
          this.players.get(key2).alive = false;  
        }
        else{
          this.players.get(key2).x = 0;
          this.players.get(key2).y = 0;
        }
      }
      if (key !== key2 && this.players.get(key2).bullet.x === this.players.get(key).x && this.players.get(key2).bullet.y === this.players.get(key).y) {
        this.players.get(key).lifes--;
        if (this.players.get(key).lifes === 0){
          this.players.get(key).alive = false;  
        }
        else{
          this.players.get(key).x = 0;
          this.players.get(key).y = 0;
        }
      }
    }
  }

  killMonster(key, monster) {
    if ((this.players.get(key).bullet.x === monster.x && this.players.get(key).bullet.y === monster.y) ||
    (this.players.get(key).bullet.x === monster.x && this.players.get(key).bullet.y === monster.y+1) ||
    (this.players.get(key).bullet.x === monster.x+1 && this.players.get(key).bullet.y === monster.y) ||
    (this.players.get(key).bullet.x === monster.x+1 && this.players.get(key).bullet.y === monster.y+1)) {
      monster.alive = false;
    }
  }

  damage(key, monster) {
      if (this.players.get(key).x === monster.x && this.players.get(key).y === monster.y) {
        console.log(key + ' damaged')
        this.players.get(key).lifes--;
        console.log(key + ' leben: ' + this.players.get(key).lifes)
        if (this.players.get(key).lifes === 0) {
          this.players.get(key).alive = false;   
          console.log(key + ' killed')  
        } else {
          this.players.get(key).x = 0;
          this.players.get(key).y = 0;
        }
      }
    }

  checkPositions(key){
    for (var key2 of this.players.keys()){
      if (
        key !== key2 && 
        this.players.get(key).x === this.players.get(key2).x && 
        this.players.get(key).y === this.players.get(key2).y
        ) {
          console.log('ColorSwitch: ' + key + ' ' + key2)
          this.colorSwitch(key,key2)
      }
    }
  }
  colorSwitch(key1,key2) {
    let color1 = this.colorCode(this.players.get(key1).color);
    console.log(color1)
    let color2 = this.colorCode(this.players.get(key2).color);
    console.log(color2)
    if (color1 !== color2) {
      let colorSwitch = color1 + color2 + 1;
      let result = this.colorDecode(colorSwitch);
      console.log(result)
      this.players.get(key1).color = result;
      this.players.get(key2).color = result;
    }
  }
  colorCode(color) {
    let colorNr = this.colors.indexOf(color); 
    return colorNr;
  }
  colorDecode(nummer) {
    let color = 0; 
    if (nummer <= 7) {
      color = this.colors[nummer]
    } else {
      color = 'brown'
    }
    return color;
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
        Math.floor(Math.random() * 32),
        Math.floor(Math.random() * 32 + 2),
        'white'));
      this.gameState.monsters.push({
        x: 0,
        y: 0,
        color: 'white',
        alive: true
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
