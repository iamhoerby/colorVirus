class Room {
  constructor(extent, number) {
    this.extent = extent;
    this.number = number;
    this.colors = ["red", "orange", "yellow", "green", "blue", "violet"]; //colours for door
    this.doorColor = this.colors[
      Math.floor(Math.random() * this.colors.length)
    ]; //picking random colour for door
    this.door = new Door(
      this.doorColor,
      "Closed",
      { x: Math.floor(Math.random() * (this.extent * (3/4) - this.extent / 4) + this.extent / 4), y: 0 }, //random position for door
      this.extent
    );
    // this.monster = new Monster("green", this.cellSize, this.context);

    //coordinates x (random) and y (fixed) for obstacles, depending on extent size. Helps to use extent of any value: 16, 32, 64...
    this.randCoord = [
      {
        x: this.randCoordX(),
        y: this.extent / 8 + (this.extent / 8) * 0,
      },
      {
        x: this.randCoordX(),
        y: this.extent / 8 + (this.extent / 8) * 1,
      },
      {
        x: this.randCoordX(),
        y: this.extent / 8 + (this.extent / 8) * 2,
      },
      {
        x: this.randCoordX(),
        y: this.extent / 8 + (this.extent / 8) * 3,
      },
      {
        x: this.randCoordX(),
        y: this.extent / 8 + (this.extent / 8) * 4,
      },
      {
        x: this.randCoordX(),
        y: this.extent / 8 + (this.extent / 8) * 5,
      },
      {
        x: this.randCoordX(),
        y: this.extent / 8 + (this.extent / 8) * 6,
      }      
    ];
    // setInterval(this.draw(), 500);
  }

  // Room update *** Andrej *** 08.7.2020
  randCoordX(){
    return Math.floor(Math.random() * (this.extent * (7/8) - this.extent / 8) + this.extent / 8);
    }

  update() {
    return this.randCoord;
    }
}


  /*drawLine(x1, y1, x2, y2) {
    // function for simple line drawing
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }
*/
/*  drawBorder() {
    //function for room borders drawing
    this.drawLine(0, 0, this.canvas.width, 0);
    this.drawLine(0, 0, 0, this.canvas.height);
    this.drawLine(this.canvas.width, 0, this.canvas.width, this.canvas.height);
    this.drawLine(0, this.canvas.height, this.canvas.width, this.canvas.height);
    console.log("Drawing gamefield");
  }
*/
/*  draw() {
    //drawinr room itself: borders, door, obstacles
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBorder();

    for (let i = 0; i < 8; i++) {
      this.drawObstacle(this.randCoord[i]);
    }
    this.door.draw();
  }
*/
/*
  drawObstacle(Coord) {
    // function for obstacles drawing
    this.context.fillStyle = "black";
    this.context.fillRect(
      Coord.x * this.cellSize,
      Coord.y * this.cellSize,
      (this.cellSize * this.extent) / 16,
      (this.cellSize * this.extent) / 16
    );
  }
*/
/*
  update() {
    // seems like we don't need this function right now. Room updates in Room.draw().
  }
  */


class Door {
  constructor(color, state, position, extent, cellSize, context) {
    this.color = color;
    this.state = state;
    this.position = position;
  }

  update() {
    return {color: this.color, state: this.state, position: this.position};
  }
  
}

module.exports = {
  Room: Room,
  Door: Door
}
// new Room(document.getElementById('myCanvas'), 64, 0);
