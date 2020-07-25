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
    } else {
      //color green
      switch (this.lifes){
        case 3: result = "darkgreen"; break;
        case 2: result = "green"; break;
        case 1: result = "mediumseagreen"; break;
        default: result = "white"; break;

      }
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
