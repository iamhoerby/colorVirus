/**
 * Since this file is intended to be used in the webbrowser,
 * it uses what is called CommonJS-style import statements,
 * which have been standardized in recent versions of the
 * ECMA-Script 6 specification. It is also sometimes referred
 * to as ES6 imports.
 */
import { Room } from "/Room.js";
import { Spieler } from "/Spieler.js"
import { Monster } from "/Monster.js"
// import { Game } from "../server/Game.js"

let canvas = document.getElementById("myCanvas")
let context = canvas.getContext('2d')

new Room(canvas, 64, 1); 
new Spieler(5, 6, 'blue', 3, 'ArrowRight', 64, context);
new Monster(10, 5, 'purple', 2, canvas, 64, true);

// new Game(document.getElementById("myCanvas"),8);

const socket = io();
socket.on("connect", () =>
  console.log(`connected to socket.io as ${socket.id}`)
);
