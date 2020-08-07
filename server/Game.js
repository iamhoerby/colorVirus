const server = require("./server.js");
const player = require("./Player.js");
const Player = player.Player;
const room = require("./Room.js");
const Room = room.Room;
const Monster = require("./Monster.js");
const { json } = require("express");

class Game {
  constructor(extent) {
    this.extent = extent;
    this.difficulty = 0;
    this.levelCounter = 0;
    this.pause = false;
    this.playerCount = 0;
    this.players = new Map();
    this.connectionCount = 0;
    this.readyCount = 0;
    this.frameCount = 0;
    this.playerLifes = 3;
    this.colors = [
      "white",
      "yellow",
      "blue",
      "red",
      "green",
      "orange",
      "violet",
      "brown",
    ];
    this.gameState = {
      room: [],
      door: { color: "white", state: "closed", position: { x: 0, y: 0 } },
      players: [],
      monsters: [],
    };
    this.monsters = [];
    this.monsterColors = ["yellow", "blue", "red"];
    this.loopIntervall;
    this.timerInterval;
    this.positionCounter = 0; 
  }
  playerConnect() {
    this.playerCount++;
  }
  playerDisconnect() {
    this.playerCount--;
    if (this.playerCount === 0) {
      clearInterval(this.loopIntervall);
      clearInterval(this.timerInterval);
      this.difficulty = 0; 
      this.room = null; 
    }
  }
  newPlayer(name, socketID) {
    this.connectionCount++;
    this.players.set(
      socketID,
      new Player(
        0,
        0,
        "white",
        3,
        "ArrowRight",
        socketID,
        name,
        "right",
        false,
        this.extent
      )
    );
    this.setStartPosition(socketID);
    server.sendDifficultyToClient(this.difficulty);
  }
  restart() {
    this.positionCounter = 0;
    for (var key of this.players.keys()) {
      this.setStartPosition(key)
      this.players.get(key).ready = 0; 
      this.players.get(key).alive = true; 
      this.players.get(key).lifes = 3; 
      console.log(key + " not ready")
    }
    this.monsters = [];
    this.readyCount = 0;
    this.setDifficulty(0);
  }
  setStartPosition(key){
    this.positionCounter++; 
    console.log(this.positionCounter)
    let positionX = 0;
    let positionY = 0;
    let colorNr = 0;
    switch (this.positionCounter % 4) {
      case 0:
        positionX = 1;
        positionY = 0;
        colorNr = 1;
        break;
      case 1:
        positionX = 0;
        positionY = 1;
        colorNr = 3;
        break;
      case 2:
        positionX = 1;
        positionY = 1;
        colorNr = 2;
        break;
      case 3:
        positionX = 0;
        positionY = 0;
        colorNr = 3;
        break;
    }
    let color = this.colorDecode(colorNr);
    this.players.get(key).x = positionX * (this.extent - 1);
    this.players.get(key).y = positionY * (this.extent - 1); 
    this.players.get(key).color = color;
  }
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    server.sendDifficultyToClient(this.difficulty);
  }
  playerReady(socketID) {
    this.players.get(socketID).ready = 1;
    this.readyCount++;
    if (this.readyCount === this.playerCount) {
      this.startGame();
    }
  }
  startGame() {
    server.sendStartGame();
    this.timer();
    this.room = new Room(this.extent, 1, this.playerCount);
    this.monsterCreator();
    this.loop();
  }
  gameOver() {
    clearInterval(this.timerInterval);
    clearInterval(this.loopIntervall);
    server.sendGameOver(this.levelCounter);
  }
  // Spiel-Timer
  timer() {
    let minuten = 0;
    let sekunden = 0;
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
      let timerSek = sekunden;
      let time = null;
      this.timerInterval = setInterval(() => {
        if (timerSek < 10) {
          time = timerMin + ":0" + timerSek;
        } else {
          time = timerMin + ":" + timerSek;
        }
        server.sendTimer(time);
        if (timerSek === 0 && timerMin === 0) {
          this.gameOver();
          clearInterval(this.timerInterval);
          
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
    this.loopIntervall = setInterval(() => {
      this.updateGameState();
      this.drawGameState();
      this.frameCount++;
    }, 33);
  }
  updateMovement(socketID, pressedKey) {
    this.players.get(socketID).updateMovement(pressedKey, this.gameState.room);
  }
  updateGameState() {
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

    for (let i = 0; i < this.monsters.length; i++) {
      if (this.monsters[i].alive) {
        this.monsters[i].update(
          this.frameCount,
          this.gameState.room,
          this.gameState.door.position,
          this.extent
        );
        this.gameState.monsters[i].x = this.monsters[i].x;
        this.gameState.monsters[i].y = this.monsters[i].y;
      }
      this.gameState.monsters[i].color = this.monsterColors[i % 3];

      for (var key of this.players.keys()) {
        this.damage(key, this.gameState.monsters[i]);
        this.killMonster(key, this.monsters[i]);
        this.gameState.monsters[i].alive = this.monsters[i].alive;
        this.playerVsPlayer(key);
      }
    }
    for (var key of this.players.keys()) {
      this.checkPositions(key);
      this.openDoor(key, this.gameState.door);
    }
  }
  drawGameState() {
    server.sendDraw(this.gameState);
  }

  playerVsPlayer(key) {
    for (var key2 of this.players.keys()) {
      if (
        key !== key2 &&
        this.players.get(key).bullet.x === this.players.get(key2).x &&
        this.players.get(key).bullet.y === this.players.get(key2).y
      ) {
        this.players.get(key2).lifes--;
        if (this.players.get(key2).lifes === 0) {
          this.players.get(key2).alive = false;
        } else {
          this.players.get(key2).x = 0;
          this.players.get(key2).y = 0;
        }
      }
      if (
        key !== key2 &&
        this.players.get(key2).bullet.x === this.players.get(key).x &&
        this.players.get(key2).bullet.y === this.players.get(key).y
      ) {
        this.players.get(key).lifes--;
        if (this.players.get(key).lifes === 0) {
          this.players.get(key).alive = false;
        } else {
          this.players.get(key).x = 0;
          this.players.get(key).y = 0;
        }
      }
    }
  }

  killMonster(key, monster) {
    if (
      (this.players.get(key).bullet.x === monster.x &&
        this.players.get(key).bullet.y === monster.y) ||
      (this.players.get(key).bullet.x === monster.x &&
        this.players.get(key).bullet.y === monster.y + 1) ||
      (this.players.get(key).bullet.x === monster.x + 1 &&
        this.players.get(key).bullet.y === monster.y) ||
      (this.players.get(key).bullet.x === monster.x + 1 &&
        this.players.get(key).bullet.y === monster.y + 1)
    ) {
      monster.alive = false;
    }
  }

  damage(key, monster) {
    if (monster.alive === true) {
      if (
        this.players.get(key).x === monster.x &&
        this.players.get(key).y === monster.y
      ) {
        this.players.get(key).lifes--;
        if (this.players.get(key).lifes === 0) {
          this.players.get(key).alive = false;
          this.gameOver();
        } else {
          this.players.get(key).x = 0;
          this.players.get(key).y = 0;
        }
      }
    } else {
      if (
        this.players.get(key).x === monster.x &&
        this.players.get(key).y === monster.y
      ) {
        this.players.get(key).color = monster.color;
      }
    }
  }

  checkPositions(key) {
    for (var key2 of this.players.keys()) {
      if (
        key !== key2 &&
        this.players.get(key).x === this.players.get(key2).x &&
        this.players.get(key).y === this.players.get(key2).y
      ) {
        this.colorSwitch(key, key2);
      }
    }
  }
  colorSwitch(key1, key2) {
    let color1 = this.colorCode(this.players.get(key1).color);
    let color2 = this.colorCode(this.players.get(key2).color);
    if (color1 !== color2) {
      let colorSwitch = color1 + color2 + 1;
      let result = this.colorDecode(colorSwitch);
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
      color = this.colors[nummer];
    } else {
      color = "brown";
    }
    return color;
  }
  monsterCreator() {
    for (let i = 0; i < this.difficulty*3; i++) {
      this.monsters.push(
        new Monster(
          Math.floor(Math.random() * 32),
          Math.floor(Math.random() * 32 + 2),
          "white"
        )
      );
      this.gameState.monsters.push({
        x: 0,
        y: 0,
        color: "white",
        alive: true,
      });
    }
  }

  openDoor(key, door) {
    if (
      this.players.get(key).y <= 2 &&
      this.players.get(key).x >= door.position.x &&
      this.players.get(key).x <= door.position.x + 7 &&
      this.players.get(key).color === door.color
    ) {
      this.levelCounter++;
      clearInterval(this.loopIntervall);
      this.monsters = [];
      this.gameState.monsters = [];
      this.room = new Room(this.extent, 1, this.playerCount);
      this.positionCounter = 0; 
      for (var key of this.players.keys()) {
        this.setStartPosition(key);
      }
      this.monsterCreator();
      this.loop();
    }
  }
}

module.exports = {
  Game: Game,
};
