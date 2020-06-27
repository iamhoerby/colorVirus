
import { Game } from "./Game.js"

let canvas = document.getElementById("myCanvas")
let context = canvas.getContext('2d')
const socket = io();

new Game(document.getElementById("myCanvas"),64,socket);

socket.on("connect", () =>
  console.log(`connected to socket.io as ${socket.id}`)
);
socket.on('player1_damage', this.game.damage()); 
