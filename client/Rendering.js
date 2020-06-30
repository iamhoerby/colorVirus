// Render Class *** Sebastian *** 25.6.2020
export class Rendering {
  constructor(canvas, extent) {
    this.canvas = canvas;
    this.extent = extent;
    this.cellSize = this.canvas.width / this.extent;
  }
  // Start Screen with Name Input
  inputName() {
    document.getElementById("startName").classList.remove("displayNone");
  }
  // Screen with the Difficulty Options
  chooseDifficulty(difficulty) {
    document.getElementById("startName").classList.add("displayNone");
    document.getElementById("difficulty").classList.remove("displayNone");
    document.getElementById("ready").classList.remove("displayNone");
    switch (difficulty) {
      case 1:
        document.getElementById("easy").disabled = true;
        document.getElementById("middle").disabled = true;
        document.getElementById("hard").disabled = true;
        document.getElementById("easy").classList.add("locked");
        break;
      case 2:
        document.getElementById("easy").disabled = true;
        document.getElementById("middle").disabled = true;
        document.getElementById("hard").disabled = true;
        document.getElementById("middle").classList.add("locked");
        break;
      case 3:
        document.getElementById("easy").disabled = true;
        document.getElementById("middle").disabled = true;
        document.getElementById("hard").disabled = true;
        document.getElementById("hard").classList.add("locked");
        break;
      default:
        document
          .getElementById("submitDifficulty")
          .classList.remove("displayNone");
        break;
    }
  }
  drawPlayer(){
    if (this.color === 'blue'){
        if (this.lifes === 3){
            this.context.fillStyle = 'navy';
        }
        if (this.lifes === 2){
            this.context.fillStyle = 'royalblue';
        }
        if (this.lifes === 1){
            this.context.fillStyle = 'lightsteelblue';
        }
        if (this.lifes === 0){
            this.context.fillStyle = 'white';
        }
    }
    else if (this.color === 'red'){
        if (this.lifes === 3){
            this.context.fillStyle = 'darkred';
        }
        if (this.lifes === 2){
            this.context.fillStyle = 'red';
        }
        if (this.lifes === 1){
            this.context.fillStyle = 'lightcoral';
        }
        if (this.lifes === 0){
            this.context.fillStyle = 'white';
        }
    }
    else { //color green
        if (this.lifes === 3){
            this.context.fillStyle = 'darkgreen';
        }
        if (this.lifes === 2){
            this.context.fillStyle = 'green';
        }
        if (this.lifes === 1){
            this.context.fillStyle = 'mediumseagreen';
        }
        if (this.lifes === 0){
            this.context.fillStyle = 'white';
        }
    }
    this.context.fillRect(this.x * this.cellSize, this.y * this.cellSize, this.cellSize, this.cellSize);
}
}