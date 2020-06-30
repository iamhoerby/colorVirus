import { Rendering } from "./Rendering.js";
import { KeyHandler } from "./eventHandler.js";
import { Game } from "./Game.js"
import { Monster } from "./Monster.js"

let canvas = document.getElementById("myCanvas")
let context = canvas.getContext('2d')

const socket = io();
const extent = 64;

let rendering = new Rendering(canvas, extent);
new KeyHandler();

socket.on("connect", function () {
  console.log(`connected to socket.io as ${socket.id}`);
  socket.emit("player_connect", canvas);
  rendering.inputName();
});
/* socket.on('SetDifficulty', function(difficulty) {
  console.log('Recieved Message SetDifficulty')
  rendering.chooseDifficulty(difficulty)
}) */

export function sendName(name) {
  socket.emit("playerName", name);
}
export function sendDifficultyToServer(difficultyClient) {
  socket.emit("difficulty", difficultyClient);
  console.log("test");
  // rendering.chooseDifficulty(difficultyClient)
}

socket.on("connect", () =>
  console.log(`connected to socket.io as ${socket.id}`)
);
socket.on('player1_damage', this.game.damage()); 

socket.on("monster_position", () => {
  rendering.monster.draw(monX, monY)
})

// socket.emit('player1_damage', this.game.damage());

