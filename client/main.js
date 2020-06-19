/**
 * Since this file is intended to be used in the webbrowser,
 * it uses what is called CommonJS-style import statements,
 * which have been standardized in recent versions of the
 * ECMA-Script 6 specification. It is also sometimes referred
 * to as ES6 imports.
 */
import { Game } from "./Game.js"

let canvas = document.getElementById("myCanvas")
let context = canvas.getContext('2d')
const socket = io();

new Game(document.getElementById("myCanvas"),64); //extent can be 64,32,16 - it works well with any parameters now

socket.on("connect", () =>
  console.log(`connected to socket.io as ${socket.id}`)
);
