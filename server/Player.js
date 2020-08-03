const bullet = require("./Bullet.js");
const Bullet = bullet.Bullet;

class Player {
  constructor(x, y, color, lifes, pressedKey, socketID, name, direction, shoot){ 
        this.x = x;
        this.y = y;
        this.color = color;
        this.lifes = lifes;
        this.pressedKey = pressedKey;
        this.socketID = socketID;
        this.name = name;
        this.alive = true;
        this.direction = direction;
        this.shoot = shoot;
        this.ready = 0;
        this.bullet = new Bullet (this.x, this.y, this.direction, 2, "black", this.shoot);
    }

  updateMovement(pressedKey) {
    if (pressedKey === "ArrowRight") {
      if (this.x < 63) {
        this.x += 1;
        this.direction = "right";
      }
    } else if (pressedKey === "ArrowDown") {
      if (this.y < 63) {
        this.y += 1;
        this.direction = "down";
      }
    } else if (pressedKey === "ArrowLeft") {
      if (this.x > 0) {
        this.x -= 1;
        this.direction = "left";
      }
    } else if (pressedKey === "ArrowUp") {
      if (this.y > 0) {
        this.y -= 1;
        this.direction = "up";
      }
    } else if (pressedKey === "Space") {
      this.shoot = true;
      this.bullet = new Bullet (this.x, this.y, this.direction, 2, "black", this.shoot);
    }
    //pressedKey = "Stop";
  }
  updateLifes() {
    let result = '';
    if (this.color === "blue") {
      switch (this.lifes){
        case 3: result = "navy"; break;
        case 2: result = "royalblue"; break;
        case 1: result = "lightsteelblue"; break;
        default: result = "white"; break;
      }
    } else if (this.color === "red") {
      switch (this.lifes){
        case 3: result = "darkred"; break;
        case 2: result = "red"; break;
        case 1: result = "lightcoral"; break;
        default: result = "white"; break;
      }
    } else if (this.color === "yellow") {
      switch (this.lifes){
        case 3: result = "gold"; break;
        case 2: result = "yellow"; break;
        case 1: result = "lightyellow"; break;
        default: result = "white"; break;
      }
    } else if (this.color === "green") {
      //color green
      switch (this.lifes){
        case 3: result = "darkgreen"; break;
        case 2: result = "green"; break;
        case 1: result = "mediumseagreen"; break;
        default: result = "white"; break;
      }
    } else if (this.color === "orange") {
      switch (this.lifes) {
        case 3: result = "DarkOrange"; break;
        case 2: result = "Orange"; break;
        case 1: result = "LightSalmon"; break;
        default: result = "white"; break;
      }
    } else if (this.color === "violet") {
      switch (this.lifes) {
        case 3: result = "MediumVioletRed"; break;
        case 2: result = "HotPink"; break;
        case 1: result = "LightPink"; break;
        default: result = "white"; break;
      }
    } else if (this.color === "brown") {
      switch (this.lifes) {
        case 3: result = "SaddleBrown"; break; 
        case 2: result = "Peru"; break; 
        case 1: result = "BurlyWood"; break;
        default: result = "white"; break;
      }
    } else {
      result = "white"
    }
    return result; 
  }

  update() {
    let drawColor = this.updateLifes()
    if (this.shoot){
      let bullet1 = this.bullet.update();
      return {x: this.x, y: this.y, color: drawColor, shoot: this.shoot, bullet: bullet1}
    }
    else{
      return {x: this.x, y: this.y, color: drawColor, shoot: this.shoot, bullet: {}}
    }
  }
}

module.exports = {
  Player: Player,
};
