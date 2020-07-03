import { Rendering } from "./Rendering.js";
import { KeyHandler } from "./eventHandler.js";

let canvas = document.getElementById("myCanvas");

const socket = io();
const extent = 64;

let rendering = new Rendering(canvas, extent);
new KeyHandler();

// Hier drunter alle eingehenede Nachrichtien also Server -> Client 
socket.on("connect", function () {
  console.log(`connected to socket.io as ${socket.id}`);
  socket.emit("playerConnect", canvas);
  rendering.inputName();
});
socket.on('setDifficulty', function(difficulty) {
  console.log('Recieved Message SetDifficulty')
  rendering.chooseDifficulty(difficulty)
});
socket.on('startGame', function() {
  rendering.startGame(); 
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


// socket.emit('player1_damage', this.game.damage());

// muss aber ein gamestate vorher initialisiert werden 



export function sendPlayerMovement(pressedKey) {
  this.socket.emit("player_movement", {
    pressedKey: pressedKey,
  });
}

//To Do
//alles abholen, was gebraucht wird um Spieler zu rendern: Koordinaten, Farbe, Leben (cellSize, context)
//socket.on("player_newPosition", this.player.update());
