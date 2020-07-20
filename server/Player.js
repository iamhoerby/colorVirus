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
    if (this.color === "blue" || "navy" || "royalblue" || "lightsteelblue") {
      switch (this.lifes){
        case 3: this.color = "navy"; break;
        case 2: this.color = "royalblue"; break;
        case 1: this.color = "lightsteelblue"; break;
        default: this.color = "white"; break;
      }
    } else if (this.color === "red" || "darkred" || "lightcoral") {
      switch (this.lifes){
        case 3: this.color = "darkred"; break;
        case 2: this.color = "red"; break;
        case 1: this.color = "lightcoral"; break;
        default: this.color = "white"; break;

      }
    } else {
      //color green
      switch (this.lifes){
        case 3: this.color = "darkgreen"; break;
        case 2: this.color = "green"; break;
        case 1: this.color = "mediumseagreen"; break;
        default: this.color = "white"; break;

      }
    }
  }

  update() {
    return {x: this.x, y: this.y, color: this.color}
  }
}

module.exports = {
  Player: Player
};
