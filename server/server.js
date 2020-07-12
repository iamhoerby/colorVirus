// Server requiries 
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

// Game requiries
// Hier die Klassen importieren
let game = require("./Game.js");
let Game = game.Game;
const player = require("./Player.js");
const Player = player.Player;
const extent = 64;


var newGame;
let connectionCounter = 0;



io.on("connection", function (socket) {  // Hier drunter nur eingehende Nachrichten also Client -> Server
  console.log(`A socket connected with id ${socket.id}`);
  socket.on('disconnect', function() { 
    console.log(socket.id + ' disconnected')
    newGame.playerDisconnect();
    connectionCounter--;
  });
  socket.on("playerConnect", function (canvas) {
    console.log(`Recieved message player_connect`);
    if (connectionCounter === 0) {
      newGame = new Game(extent);
    }
    connectionCounter++;
    newGame.playerConnect();
    newGame.canvas = canvas;
  });
  
  socket.on("playerName", function (name) {
    console.log(`Recieved message playerName`);
    newGame.newPlayer(name, socket.id);
  });
  
  socket.on("sendDifficulty", function (difficulty) {
    console.log("Recieved message difficulty");
    newGame.difficulty = difficulty;
  });
  
  socket.on("playerReady", function() {
    console.log(`${socket.id} ready`);
    newGame.playerReady(socket.id);
  });
  
  socket.on("player_movement", function (pressedKey){
    console.log(`${socket.id} drückt ${pressedKey} Taste`);
    newGame.update(pressedKey);
    //player.update(pressedKey)
  });
});


// Ab hier ausgehende Nachrichten also Server -> Client in Funktionen die von Game.js aufgerufen können werden. 
// Alle Funktionen exportieren mit module.exports. Bis jetzt hat keine schreibweise funktioniert bis auf diese. 
// Also diese bitte benutzen 

module.exports.sendDifficultyToClient = difficulty => io.emit('setDifficulty', difficulty);
module.exports.sendStartGame = () => io.emit('startGame');
module.exports.sendTimer = (time) => io.emit('timer',time);
module.exports.sendDraw = (gameState) => io.emit('draw', gameState); 


http.listen(3000, () => {
  console.log(`Serving ${clientPath} on *:3000.`);
});


