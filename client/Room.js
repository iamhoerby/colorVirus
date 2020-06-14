class Room {

    constructor (canvas, extent, number) {
        this.canvas = canvas;
        this.extent = extent;
        this.cellSize = this.canvas.width / this.extent;
        this.number = number;
        this.context = this.canvas.getContext('2d');
        this.colours = ['red','orange','yellow','green','blue','violet'];
        this.doorColour = this.colours[Math.floor(Math.random() * this.colours.length)];
        this.door = new Door (this.doorColour, 'Closed', {x: Math.floor(Math.random() * (this.extent - this.extent/4)), y:0}, this.extent, this.cellSize, this.context);
        this.draw();
    }

    drawLine(x1,y1,x2,y2) {
       this.context.beginPath();
       this.context.moveTo(x1,y1);
       this.context.lineTo(x2,y2);
       this.context.stroke();
    }

    drawBorder() {
        this.drawLine(0, 0, this.canvas.width, 0);
        this.drawLine(0, 0, 0, this.canvas.height);
        this.drawLine(this.canvas.width, 0, this.canvas.width, this.canvas.height);
        this.drawLine(0, this.canvas.height, this.canvas.width, this.canvas.height);
        console.log ('Drawing gamefield');
   }

    draw(){
       this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
       this.drawBorder();

       for (let y = 3; y < 64; y = y + 8) {
           this.drawObstacle(Math.floor(Math.random() * (this.extent - 8)), y);
       }   
           this.door.draw();
       }

       

   drawObstacle(x,y) {
       this.context.fillStyle = 'black';
       this.context.fillRect(
           x*this.cellSize, 
           y*this.cellSize, 
           this.cellSize*4, 
           this.cellSize*4);
       }

}

class Door {
   constructor (colour, state, position, extent, cellSize, context) {
       this.colour = colour;
       this.state = state;
       this.position = position;
       this.extent = extent;
       this.cellSize = cellSize;
       this.context = context;
   }

   draw() {
       this.context.fillStyle = this.colour;
       this.context.fillRect(
           this.position.x*this.cellSize, 
           this.position.y*this.cellSize, 
           100, 
           30);
           }

}


//new Room(document.getElementById('myCanvas'), 64, 0);
