// Player update *** Janka *** 30.6.2020

class Player {
  /*constructor(x, y, color, lifes, pressedKey, cellSize, context, socket){ 
        this.x = x;
        this.y = y;
        this.color = color;
        this.lifes = lifes;
        this.pressedKey = pressedKey;
        this.cellSize = cellSize;
        this.context = context;
        this.socket = socket;
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
    }*/

  update(pressedKey, socketID) {
    if (pressedKey === "ArrowRight") {
      if (this.x < 63) {
        //wenn Spieler nicht aus Spielfeld rennt
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

    if (connectionCounter != 0) {
      if (playerConnect[0] === socketID) {
        this.color = blue;
      }
      if (playerConnect[1] === socketID) {
        this.color = red;
      }
    }

    socket.broadcast.emit("player_newPosition", {
      x: this.x,
      y: this.y,
      color: this.color,
    });
  }
}
