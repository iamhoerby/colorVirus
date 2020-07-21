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
        this.alive = true;
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
    return {x: this.x, y: this.y, color: drawColor}
  }
}

module.exports = {
  Player: Player
};
