// Player update *** Janka *** 30.6.2020


class Player {
  constructor(x, y, color, lifes, pressedKey, socketID, name){ 
        this.x = x;
        this.y = y;
        this.color = color;
        this.lifes = lifes;
        this.pressedKey = pressedKey;
        this.socketID = socketID;
        this.name = name; 
        this.ready = 0; 
    }

  update(pressedKey) {
    if (pressedKey === "ArrowRight") {
      if (this.x < 63) {
        this.x += 1;
      }
    } else if (pressedKey === "ArrowDown") {
      if (this.y < 63) {
        this.y += 1;
      }
    } else if (pressedKey === "ArrowLeft") {
      if (this.x > 0) {
        this.x -= 1;
      }
    } else if (pressedKey === "ArrowUp") {
      if (this.y > 0) {
        this.y -= 1;
      }
    }
    pressedKey = "Stop";

    if (this.color === "blue") {
      if (this.lifes === 3) {
        this.color = "navy";
      }
      if (this.lifes === 2) {
        this.color = "royalblue";
      }
      if (this.lifes === 1) {
        this.color = "lightsteelblue";
      }
      if (this.lifes === 0) {
        this.color = "white";
      }
    } else if (this.color === "red") {
      if (this.lifes === 3) {
        this.color = "darkred";
      }
      if (this.lifes === 2) {
        this.color = "red";
      }
      if (this.lifes === 1) {
        this.color = "lightcoral";
      }
      if (this.lifes === 0) {
        this.color = "white";
      }
    } else {
      //color green
      if (this.lifes === 3) {
        this.color = "darkgreen";
      }
      if (this.lifes === 2) {
        this.color = "green";
      }
      if (this.lifes === 1) {
        this.color = "mediumseagreen";
      }
      if (this.lifes === 0) {
        this.color = "white";
      }
    }

    return {x: this.x, y: this.y, color: this.color}

    /* if (connectionCounter != 0) {
      if (playerConnect[0] === socketID) {
        this.color = blue;
      }
      if (playerConnect[1] === socketID) {
        this.color = red;
      }
    } */
/* 
    socket.broadcast.emit("player_newPosition", {
      x: this.x,
      y: this.y,
      color: this.color,
    });
  } */
  }
}

module.exports = {
  Player: Player
};
