import { Rendering } from "./Rendering.js";
import { KeyHandler } from "./eventHandler.js";

let canvas = document.getElementById("myCanvas");

const socket = io('/game-space');
const extent = 64;

let rendering = new Rendering(canvas, extent);
let keyHandler = new KeyHandler();

// Hier drunter alle eingehenede Nachrichtien also Server -> Client 
socket.on("connect", function () {
  console.log(`connected to socket.io as ${socket.id}`);
  socket.emit("playerConnect", canvas);
  rendering.inputName();
});
socket.on('setDifficulty', function(difficulty) {
  console.log('Recieved Message SetDifficulty' + difficulty)
  rendering.chooseDifficulty(difficulty)
});
socket.on('startGame', function() {
  rendering.startGame(); 
  keyHandler.startGame();
});
socket.on('timer', function(time) {
  rendering.drawTimer(time);
});
socket.on("draw", function(gamestate) {
  rendering.draw(gamestate); 
}); 

// Hier drunter nur ausgehende Nachrichten also Client -> Server in Funktionen die von eventHandler.js aufgerufen werden können
// Alle Funktionen mit export function exportieren

export function sendName(name) {
  socket.emit("playerName", name);
}
export function sendDifficultyToServer(difficultyClient) {
  socket.emit("sendDifficulty", difficultyClient);
  console.log("test");
  rendering.chooseDifficulty(difficultyClient)
}
export function sendReady() {
  socket.emit("playerReady")
}
export function sendPlayerMovement(pressedKey) {
  socket.emit("playerMovement", pressedKey);
}

// socket.emit('player1_damage', this.game.damage());

// muss aber ein gamestate vorher initialisiert werden 



