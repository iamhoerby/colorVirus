/**
 * Since this file is intended to be used in the webbrowser,
 * it uses what is called CommonJS-style import statements,
 * which have been standardized in recent versions of the
 * ECMA-Script 6 specification. It is also sometimes referred
 * to as ES6 imports.
 */
import { Room } from "/Room.js";
// import { Game } from "../server/Game.js"

new Room(document.getElementById("myCanvas"), 64, 1); 
// new Game(document.getElementById("myCanvas"),8);

const socket = io();
socket.on("connect", () =>
  console.log(`connected to socket.io as ${socket.id}`)
);
