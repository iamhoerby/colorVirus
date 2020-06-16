import { Room } from "/Room.js";
import { Spieler } from "/Spieler.js"
import { Monster } from "/Monster.js"

class Game{
    constructor(canvas, extent) {
        this.extent = extent;
        this.canvas = canvas;
        this.cellSize = this.canvas.width / this.extent;
        this.context = this.canvas.getContext('2d');
        this.player1 = new Spieler(5, 6, 'blue', 3, 'ArrowRight', this.cellSize, this.context, this.socket);
        this.monster1 = new Monster(10, 5, 'black', true, 2, this.cellSize, this.context, this.extent);
        this.room = new Room(this.canvas, this.extent, 1); 
        this.difficulty = 0; 
        this.startGame();
        this.levelCounter = 0;  
        this.pause = false; 
    }
    startGame() {
        let running = window.setInterval(function() {
            this.loop(frameCount).bind(this);
        }, 33)
    }
    loop() {
        this.update();
        this.draw();
    }
    update() {
        this.player1.update(); 
        this.monster1.update(); 
    }
    draw() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.room.draw()
        this.player1.draw()
        this.monster1.draw();
    }
}