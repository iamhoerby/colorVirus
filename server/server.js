let game = require("./Game.js");
let Game = game.Game;
const extent = 64;
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const Monster = require('./Monster.js')

const clientPath = path.join(__dirname, "..", "client");

app.use(express.static(clientPath));

var newGame;
let connectionCounter = 0;

io.on("connection", function (socket) {
  console.log(`A socket connected with id ${socket.id}`);
  var monster = new Monster(10, 5, socket, true, 2)
  socket.emit('monster_position', {
      monX: monster.x,
      monY: monster.y
    });
  })

/* function sendDifficultyToClient(difficulty) {
  io.emit('SetDifficulty', difficulty)
} */

http.listen(3000, () => {
  console.log(`Serving ${clientPath} on *:3000.`);
})

// module.exports.sendDifficultyToClient = sendDifficultyToClient;

