const server = require('./server.js')
const player = require("./Player.js");
const Player = player.Player;
const room = require("./Room.js")
const Room = room.Room;
const Monster = require('./Monster.js');

class Bullet {
    constructor (x, y, direction, speed, color, shoot){
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.speed = speed;
      this.color = color;
      this.shoot = shoot;
    }
    update(){
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
}

  module.exports = {
    Bullet: Bullet
  };