const server = require('./server.js')
const player = require("./Player.js");
const Player = player.Player;
const room = require("./Room.js")
const Room = room.Room;
const Monster = require('./Monster.js');

class Bullet {
    constructor (x, y, direction, speed, color, shoot, coord){
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.speed = speed;
      this.color = color;
      this.shoot = shoot;
      this.coord = coord;
    }
    update(){
        this.collisionObstacles(this.coord);
        if (this.direction === "right"){
            this.x += this.speed;
            if (this.x > 63){
                this.shoot = false;
            }
        }
        else if (this.direction === "left"){
            this.x -= this.speed;
            if (this.x < 0){
                this.shoot = false;
            }
        }
        else if (this.direction === "up"){
            this.y -= this.speed;
            if (this.y < 0){
                this.shoot = false;
            }
        }
        else if (this.direction === "down"){
            this.y += this.speed;
            if (this.y > 63){
                this.shoot = false;
            }
        }
      return {x: this.x, y: this.y, direction: this.direction, color: this.color}
    }
    
  collisionObstacles(coord){
    for (let i = 0; i < coord.length; i++) {
      if (this.direction === "right") {
        if (this.x + 1 === coord[i].x && (this.y === coord[i].y || this.y === coord[i].y + 1)) {
          this.color = "white";
        } 
      }
      if (this.direction === "left"){
        if (this.x - 1 === coord[i].x + 1 && (this.y === coord[i].y || this.y === coord[i].y + 1)) {
          this.color = "white";
        }
      }
      //funktioniert noch nicht
      if (this.direction === "down") {
        if (this.y + 1 === coord[i].y && (this.x === coord[i].x || this.x === coord[i].x + 1)) {
          this.color = "white";
        } 
      }
      //funktioniert noch nicht
      if (this.direction === "up"){
        if (this.y - 1 === coord[i].y + 1 && (this.x === coord[i].x ||this.x === coord[i].x + 1)) {
          this.color = "white";
        }
      }
    }
  }
}

  module.exports = {
    Bullet: Bullet
  };