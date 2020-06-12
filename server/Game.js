class Game{
    constructor(canvas, extent) {
        this.extent = extent;
        this.canvas = canvas;
        this.cellSize = this.canvas.width / this.extent;
        this.context = this.canvas.getContext('2d');
        this.room = new Room
        window.setInterval(this.loop.bind(this), 33);
    }
    draw(){
        this.room.draw()
        
    }
    loop(){

    }
    



}
module.exports = Game;



