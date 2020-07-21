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
        this.dead = false; 
    }

  updateMovement(pressedKey) {
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
  }
  updateLifes() {
    let result = '';
    if (this.color === "blue") {
      if (this.lifes === 3) {
        result = "navy";
      }
      if (this.lifes === 2) {
        result = "royalblue";
      }
      if (this.lifes === 1) {
        result = "lightsteelblue";
      }
      if (this.lifes === 0) {
        result = "white";
      }
    } else if (this.color === "red") {
      if (this.lifes === 3) {
        result = "darkred";
      }
      if (this.lifes === 2) {
        result = "red";
      }
      if (this.lifes === 1) {
        result = "lightcoral";
      }
      if (this.lifes === 0) {
        result = "white";
      }
    } else {
      //color green
      if (this.lifes === 3) {
        result = "darkgreen";
      }
      if (this.lifes === 2) {
        result = "green";
      }
      if (this.lifes === 1) {
        result = "mediumseagreen";
      }
      if (this.lifes === 0) {
        result = "white";
      }
    }
    return result; 
  }


  update() {
    let drawColor = this.updateLifes()
    return {x: this.x, y: this.y, color: drawColor}

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
