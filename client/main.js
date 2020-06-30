
import { Game } from "./Game.js"

let canvas = document.getElementById("myCanvas")
let context = canvas.getContext('2d')
const socket = io();

new Game(document.getElementById("myCanvas"),64,socket);

socket.on("connect", () =>
  console.log(`connected to socket.io as ${socket.id}`)
);
//alles abholen, was gebraucht wird um Spieler zu rendern: Koordinaten, Farbe, Leben (cellSize, context)
socket.on('player_newPosition', this.player.update()); //neue Koordinaten der Spieler abholen mit Farbe
