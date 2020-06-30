let game = require("./Game.js");
let Game = game.Game;
const extent = 64;
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

const clientPath = path.join(__dirname, "..", "client");

app.use(express.static(clientPath));

var newGame;
let connectionCounter = 0;

io.on("connection", function (socket) {
  console.log(`A socket connected with id ${socket.id}`);
  socket.on("player_connect", function (canvas) {
    console.log(`Recieved message player_connect`);
    if (connectionCounter === 0) {
      newGame = new Game(extent);
    }
    connectionCounter++;
    // newGame.playerConnect();
    newGame.canvas = canvas;
  });
  socket.on("playerName", function (name) {
    console.log(`Recieved message playerName`);
    newGame.newPlayer(name, socket);
  });
  socket.on("difficulty", function (difficulty) {
    console.log("Recieved message difficulty");
    newGame.difficulty = difficulty;
  });

  // socket.on('player_position', (args) => Game.damage(args));
});

/* function sendDifficultyToClient(difficulty) {
  io.emit('SetDifficulty', difficulty)
} */

http.listen(3000, () => {
  console.log(`Serving ${clientPath} on *:3000.`);
});

// module.exports.sendDifficultyToClient = sendDifficultyToClient;
