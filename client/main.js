/**
 * Since this file is intended to be used in the webbrowser,
 * it uses what is called CommonJS-style import statements,
 * which have been standardized in recent versions of the
 * ECMA-Script 6 specification. It is also sometimes referred
 * to as ES6 imports.
 */
import { Apple } from "./export-a-class.js";
import { square } from "./export-a-function.js";
import { CANVAS_SIZE } from "./export-a-identifier.js";
import { Game } from "../server/game.js"

new Game(document.getElementById("myCanvas"),8);
new Apple();

console.log(square(8));

console.log(CANVAS_SIZE);

const socket = io();
socket.on("connect", () =>
  console.log(`connected to socket.io as ${socket.id}`)
);
