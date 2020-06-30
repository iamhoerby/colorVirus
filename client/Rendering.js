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
}

// Rendering Room *** Andrei *** 23.6.2020
