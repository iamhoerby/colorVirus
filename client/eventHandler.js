import { sendName } from "./main.js";
import { sendDifficultyToServer } from "./main.js";
import { Rendering } from "./Rendering.js";
import { sendPlayerMovement } from "./main.js";

export class KeyHandler {
  constructor() {
    // Input Player Name *** Sebastian *** 25.6.2020
    document.getElementById("submitName").onclick = function () {
      let name = document.getElementById("inputName").value;
      if (name !== "") {
        sendName(name);
      }
    };
    // Input Difficulty *** Sebastian *** 25.6.2020
    let difficulty = 0;
    document.getElementById("easy").onclick = () => (difficulty = 1);
    document.getElementById("middle").onclick = () => (difficulty = 2);
    document.getElementById("hard").onclick = () => (difficulty = 3);
    document.getElementById("submitDifficulty").onclick = function () {
      if (difficulty !== 0) {
        sendDifficultyToServer(difficulty);
      }
    };
  }
  handleKeyUp(event) {
    if (
      event.code === "ArrowRight" ||
      event.code === "ArrowLeft" ||
      event.code === "ArrowUp" ||
      event.code === "ArrowDown"
    ) {
      this.pressedKey = event.code;
      sendPlayerMovement(this.pressedKey);
    }
  }
}
