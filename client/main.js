
import { Game } from "./Game.js"
import { Monster } from "./Monster.js"

let canvas = document.getElementById("myCanvas")
let context = canvas.getContext('2d')
const socket = io();

new Game(document.getElementById("myCanvas"),64,socket);

socket.on("connect", () =>
  console.log(`connected to socket.io as ${socket.id}`)
);
socket.on('player1_damage', this.game.damage()); 

socket.on("monster_position", () => {
  var monster = new Monster('green', canvas.width / 64 , context) 
  monster.draw(monX, monY)
})

