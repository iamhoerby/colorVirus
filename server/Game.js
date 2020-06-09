class Game{
    constructor(assets, canvas, extent) {
        this.extent = extent;
        this.assests = assets;
        this.canvas = canvas;
        this.cellSize = this.canvas.width / this.extent;
        window.setInterval(this.draw.bind(this), 500);

    }
    draw(){
        this.context.fillStyle = 'red'
        this.context.fillRect(5 * this.cellSize,4 * this.cellSize,this.cellSize,this.cellSize);
    }
    



}
module.exports = Game;



