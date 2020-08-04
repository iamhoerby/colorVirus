const bullet = require("./Bullet.js");
const Bullet = bullet.Bullet;

class Player {
  constructor(
    x,
    y,
    color,
    lifes,
    pressedKey,
    socketID,
    name,
    direction,
    shoot,
    extent
  ) {
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
    this.extent = extent;
    this.ready = 0;
    this.bullet = new Bullet(
      this.x,
      this.y,
      this.direction,
      2,
      "black",
      this.shoot
    );
    this.obstacle = 0;
    this.colors = [ ["navy", "royalblue", "lightsteelblue"], 
                    ["darkred", "red", "lightcoral"], 
                    ["darkgreen", "green", "mediumseagreen"], 
                    ["gold", "yellow", "lightyellow"], 
                    ["DarkOrange", "Orange", "LightSalmon"],
                    ["MediumVioletRed", "HotPink", "LightPink"],
                    ["SaddleBrown", "Peru", "BurlyWood"]
                  ]; 
  }

  updateMovement(pressedKey, coord) {
    if (pressedKey === "ArrowRight") {
      this.direction = "right";
      this.collisionObstacles(coord);
      if (this.x < this.extent - 1 && this.obstacle != 1) {
        this.x += 1;
      }
    } else if (pressedKey === "ArrowDown") {
      this.direction = "down";
      this.collisionObstacles(coord);
      if (this.y < this.extent - 1 && this.obstacle != 2) {
        this.y += 1;
      }
    } else if (pressedKey === "ArrowLeft") {
      this.direction = "left";
      this.collisionObstacles(coord);
      if (this.x > 0 && this.obstacle != 3) {
        this.x -= 1;
      }
    } else if (pressedKey === "ArrowUp") {
      this.direction = "up";
      this.collisionObstacles(coord);
      if (this.y > 0 && this.obstacle != 4) {
        this.y -= 1;
      }
    } else if (pressedKey === "Space") {
      this.shoot = true;
      this.bullet = new Bullet (this.x, this.y, this.direction, 1, "black", this.shoot, coord);
    }
  }

  updateLifes() {
    let result = "";
    if (this.color === "blue") {
      switch (this.lifes) {
        case 3: 
          result = this.colors[0][0]; 
          break;
        case 2: 
          result = this.colors[0][1]; 
          break;
        case 1: 
          result = this.colors[0][2]; 
          break;
        default: 
          result = "white"; 
          break;
      }
    } else if (this.color === "red") {
      switch (this.lifes){
        case 3: 
          result = this.colors[1][0]; 
          break;
        case 2: 
          result = this.colors[1][1]; 
          break;
        case 1: 
          result = this.colors[1][2]; 
          break;
        default: 
          result = "white"; 
          break;
      }
    } else if (this.color === "yellow") {
      switch (this.lifes) {
        case 3: 
          result = this.colors[2][0]; 
          break;
        case 2: 
          result = this.colors[2][1]; 
          break;
        case 1: 
          result = this.colors[2][2]; 
          break;
        default:
          result = "white";
          break;
      }
    } else if (this.color === "green") {
      switch (this.lifes) {
        case 3: 
          result = this.colors[3][0]; 
          break;
        case 2: 
          result = this.colors[3][1]; 
          break;
        case 1: 
          result = this.colors[3][2]; 
          break;
        default: 
          result = "white"; 
          break;
      }
    } else if (this.color === "orange") {
      switch (this.lifes) {
        case 3: 
          result = this.colors[4][0]; 
          break;
        case 2: 
          result = this.colors[4][1]; 
          break;
        case 1: 
          result = this.colors[4][2]; 
          break;
        default:
          result = "white";
          break;
      }
    } else if (this.color === "violet") {
      switch (this.lifes) {
        case 3: 
          result = this.colors[5][0]; 
          break;
        case 2: 
          result = this.colors[5][1]; 
          break;
        case 1: 
          result = this.colors[5][2]; 
          break;
        default:
          result = "white";
          break;
      }
    } else if (this.color === "brown") {
      switch (this.lifes) {
        case 3: 
          result = this.colors[6][0]; 
          break;
        case 2: 
          result = this.colors[6][1]; 
          break;
        case 1: 
          result = this.colors[6][2]; 
          break;
        default:
          result = "white";
          break;
      }
    } else {
      result = "white";
    }
    return result;
  }

  collisionObstacles(coord) {
    for (let i = 0; i < coord.length; i++) {
      if (this.direction === "right") {
        if (this.x + 1 === coord[i].x && (this.y === coord[i].y || this.y === coord[i].y + 1)) {
          this.obstacle = 1;
          return;
        } else this.obstacle = 0;
      }
      //funktioniert nicht
      else if (this.direction === "left") {
        if (this.x - 1 === coord[i].x + 1 && (this.y === coord[i].y || this.y === coord[i].y + 1)) {
          this.obstacle = 2;
          return;
        } else this.obstacle = 0;
      }
      //funktioniert nicht
      else if (this.direction === "down") {
        if (this.y + 1 === coord[i].y && (this.x === coord[i].x || this.x === coord[i].x + 1)) {
          this.obstacle = 3;
          return;
        } else this.obstacle = 0;
      }
      else if (this.direction === "up") {
        if (this.y - 1 === coord[i].y + 1 && (this.x === coord[i].x ||this.x === coord[i].x + 1)) {
          this.obstacle = 4;
          return;
        } else this.obstacle = 0;
      }
    }
  }

  update() {
    let drawColor = this.updateLifes();
    if (this.shoot) {
      let bullet1 = this.bullet.update();
      return {
        x: this.x,
        y: this.y,
        color: drawColor,
        shoot: this.shoot,
        bullet: bullet1,
      };
    } else {
      return {
        x: this.x,
        y: this.y,
        color: drawColor,
        shoot: this.shoot,
        bullet: {},
      };
    }
  }
}

module.exports = {
  Player: Player,
};
