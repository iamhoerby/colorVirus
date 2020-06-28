/**
 * external dependencies are imported in nodejs using
 * require("module-name"). this method is called
 * "node-style require". It usually does not work in webbrowsers.
 */
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const game = require("game.js")
const Monster = require('Monster.js')
var monster = new Monster(10, 5, socket, true, 2)

// internal dependencies are imported with require("./path/to/file.js")
const functionFromLocalFile = require("./node-style-require.js");
functionFromLocalFile();

/**
 * As JavaScript paths work relatively from the executed file, we navigate
 * from the current path (__dirname) one directory back ('..') and from
 * there into the directory client ('client'). Using global paths is
 * prohibited for security reasons.
 */
const clientPath = path.join(__dirname, "..", "client");

app.use(express.static(clientPath));

io.on("connection", (socket) => {
  console.log(`A socket connected with id ${socket.id}`);
  socket.on('player_position', (args) => this.game.damage(args));
  socket.emit('monster_position', {
      monX: monster.x,
      monY: monster.y
    });
  })

http.listen(3000, () => {
  console.log(`Serving ${clientPath} on *:3000.`);
})
