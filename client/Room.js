export class Room {

    constructor (canvas, extent, number) {
        this.canvas = canvas;
        this.extent = extent;
        this.cellSize = this.canvas.width / this.extent;
        this.number = number;
        this.context = this.canvas.getContext('2d');
        this.colours = ['red','orange','yellow','green','blue','violet']; //colours for door
        this.doorColour = this.colours[Math.floor(Math.random() * this.colours.length)]; //picking random colour for door
        this.door = new Door (this.doorColour, 
                                'Closed', 
                                {x: Math.floor(Math.random() * (this.extent - this.extent/4)), y:0}, //random position for door
                                this.extent, 
                                this.cellSize, 
                                this.context);
        //coordinates x (random) and y (fixed) for obstacles, depending on extent size. Helps to use extent of any value: 16, 32, 64...                        
        this.randCoord = [  {x : Math.floor(Math.random() * (this.extent - this.extent/8)), y : this.extent/16 + (this.extent/8 * 0)},
                            {x : Math.floor(Math.random() * (this.extent - this.extent/8)), y : this.extent/16 + (this.extent/8 * 1)},
                            {x : Math.floor(Math.random() * (this.extent - this.extent/8)), y : this.extent/16 + (this.extent/8 * 2)},
                            {x : Math.floor(Math.random() * (this.extent - this.extent/8)), y : this.extent/16 + (this.extent/8 * 3)},
                            {x : Math.floor(Math.random() * (this.extent - this.extent/8)), y : this.extent/16 + (this.extent/8 * 4)},
                            {x : Math.floor(Math.random() * (this.extent - this.extent/8)), y : this.extent/16 + (this.extent/8 * 5)},
                            {x : Math.floor(Math.random() * (this.extent - this.extent/8)), y : this.extent/16 + (this.extent/8 * 6)},
                            {x : Math.floor(Math.random() * (this.extent - this.extent/8)), y : this.extent/16 + (this.extent/8 * 7)}
                        ]
        setInterval(this.draw(), 500);
    }

    drawLine(x1,y1,x2,y2) {     // function for simple line drawing
       this.context.beginPath();
       this.context.moveTo(x1,y1);
       this.context.lineTo(x2,y2);
       this.context.stroke();
    }

    drawBorder() {              //function for room borders drawing
        this.drawLine(0, 0, this.canvas.width, 0);
        this.drawLine(0, 0, 0, this.canvas.height);
        this.drawLine(this.canvas.width, 0, this.canvas.width, this.canvas.height);
        this.drawLine(0, this.canvas.height, this.canvas.width, this.canvas.height);
        console.log ('Drawing gamefield');
   }

    draw(){         //drawinr room itself: borders, door, obstacles
       this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
       this.drawBorder();

       for (let i = 0; i < 8; i++) {
           this.drawObstacle(this.randCoord[i]);
       }   
           this.door.draw();
       }

       

   drawObstacle(Coord) {    // function for obstacles drawing
       this.context.fillStyle = 'black';
       this.context.fillRect(
           Coord.x*this.cellSize, 
           Coord.y*this.cellSize, 
           this.cellSize*this.extent/16, 
           this.cellSize*this.extent/16);
       }

    update() {          // seems like we don't need this function right now. Room updates in Room.draw().
    }

}

export class Door {
   constructor (colour, state, position, extent, cellSize, context) {
       this.colour = colour;
       this.state = state;
       this.position = position;
       this.extent = extent;
       this.cellSize = cellSize;
       this.context = context;
   }

   draw() {         //function for drawing a door
       this.context.fillStyle = this.colour;
       this.context.fillRect(
           this.position.x*this.cellSize, 
           this.position.y*this.cellSize, 
           this.cellSize*this.extent/8, 
           this.cellSize*this.extent/32);
           }

}

// module.exports = Room;
// module.exports = Door;
//new Room(document.getElementById('myCanvas'), 64, 0);
