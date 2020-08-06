import { sendName } from "./main.js";
import { sendDifficultyToServer } from "./main.js";
import { sendPlayerMovement } from "./main.js";
import { sendReady } from "./main.js";
import { sendRestart } from "./main.js";

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
    //Ready
    document.getElementById("ready").onclick = function () {
      sendReady();
      document.getElementById("ready").disabled = true;
    };
    document.getElementById("restart").onclick = function () {
      document.removeEventListener("keydown", keyEvent(event));
      sendRestart();
    }
  }
  //player moves
  startGame() {
    document.addEventListener("keydown", this.keyEvent(event.code));
  }
  keyEvent(event) {
    if (
      event === "ArrowRight" ||
      event === "ArrowLeft" ||
      event === "ArrowUp" ||
      event === "ArrowDown" ||
      event === "Space"
    ) {
      let pressedKey = event;
      sendPlayerMovement(pressedKey);
    }
  }
}
