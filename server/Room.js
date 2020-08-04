class Room {
  constructor(extent, number, playerCount) {
    this.playerCount = playerCount;
    this.extent = extent;
    this.number = number;
    this.colors = ["red", "blue", "yellow", "green", "orange", "violet"]; //colours for door
    this.doorColor = this.pickColor(); //picking random colour for door
    this.door = new Door(
      this.doorColor,
      "Closed",
      {
        x: Math.floor(
          Math.random() * (this.extent * (3 / 4) - this.extent / 4) +
            this.extent / 4
        ),
        y: 0,
      }, //random position for door
      this.extent
    );
    // this.monster = new Monster("green", this.cellSize, this.context);

    //coordinates x (random) and y (fixed) for obstacles, depending on extent size. Helps to use extent of any value: 16, 32, 64...
    this.randCoord = this.setObstCoord();
    this.moreRandCoord = this.randomize(this.randCoord); ///!!!

    // setInterval(this.draw(), 500);
  }
  pickColor() {
    if (this.playerCount > 1) {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    } else {
      return this.colors[Math.floor(Math.random() * 3)];
    }
  }
  // Room update *** Andrej *** 23.7.2020
  randCoordX() {
    return Math.floor(
      Math.random() * (this.extent * (7 / 8) - this.extent / 8) +
        this.extent / 8
    );
  }
  notSoRandCoordY(number) {
    return this.extent / 8 + (this.extent / 8) * number;
  }

  setObstCoord() {
    let coord = [];
    for (let i = 0; i < 7; i++) {
      coord.push({
        x: this.randCoordX(),
        y: this.notSoRandCoordY(i),
      });
    }
    return coord;
  }

  notWest() {
    let checkxy = { East: true, West: false, South: true, North: true };
    return checkxy;
  }

  notNorth() {
    let checkxy = { East: true, West: true, South: true, North: false };
    return checkxy;
  }

  notEast() {
    let checkxy = { East: false, West: true, South: true, North: true };
    return checkxy;
  }

  notSouth() {
    let checkxy = { East: true, West: true, South: false, North: true };
    return checkxy;
  }

  stepWest(coord) {
    return { x: coord.x - 2, y: coord.y };
  }

  stepEast(coord) {
    return { x: coord.x + 2, y: coord.y };
  }

  stepNorth(coord) {
    return { x: coord.x, y: coord.y - 2 };
  }

  stepSouth(coord) {
    return { x: coord.x, y: coord.y + 2 };
  }

  /*Andrej 24.07*/

  //This funcktion will randomize the obstacles by splitting it on four 2x2 blocks and drawing them in random sequence
  randomize(somecoord) {
    let newCoord = [];
    for (let i = 0; i < somecoord.length; i++) {
      // we take elements from original semirandom-generated array
      newCoord.push({ x: somecoord[i].x, y: somecoord[i].y }); //original element will always be copied
      let cloneCoord = somecoord[i]; //pivot element for every figure. Modified after every loop
      let checkXY = { East: true, West: true, South: true, North: true }; //this variable helps us to not overlay the blocks
      for (let j = 0; j < 3; j++) {
        // drawing 3 additional elements to original from source array
        let caseXY = Math.round(Math.random()); //flip a coin, 0 or 1
        if (caseXY === 0) {
          // if 0, new block will be added on x-axis
          if (checkXY.East === false) {
            //if previously block was drawn on east side, we drawing new on the west
            newCoord.push(this.stepWest(cloneCoord)); // adding new value to the output array
            cloneCoord = this.stepWest(cloneCoord); // modifying the pivot
          } else if (checkXY.West === false) {
            //if previously block was drawn on west side, we drawing new on the east
            newCoord.push(this.stepEast(cloneCoord));
            cloneCoord = this.stepEast(cloneCoord);
          } else {
            let casePM = Math.round(Math.random()); //flip a coin again.
            if (casePM === 0) {
              // if 0, new block will be added on the east
              newCoord.push(this.stepEast(cloneCoord));
              checkXY = this.notWest();
              cloneCoord = this.stepEast(cloneCoord);
            } else {
              // if 1, new block will be added on the west
              newCoord.push(this.stepWest(cloneCoord));
              checkXY = this.notEast();
              cloneCoord = this.stepWest(cloneCoord);
            }
          }
        } else {
          // same for the y-axis
          if (checkXY.South === false) {
            newCoord.push(this.stepNorth(cloneCoord));
            cloneCoord = this.stepNorth(cloneCoord);
          } else if (checkXY.North === false) {
            newCoord.push(this.stepSouth(cloneCoord));
            cloneCoord = this.stepSouth(cloneCoord);
          } else {
            let casePM = Math.round(Math.random());
            if (casePM === 0) {
              newCoord.push(this.stepSouth(cloneCoord));
              checkXY = this.notNorth();
              cloneCoord = this.stepSouth(cloneCoord);
            } else {
              newCoord.push(this.stepNorth(cloneCoord));
              checkXY = this.notSouth();
              cloneCoord = this.stepNorth(cloneCoord);
            }
          }
        }
      }
    }
    return newCoord;
  }

  update() {
    // return this.randCoord;
    return this.moreRandCoord;
  }
}

class Door {
  constructor(color, state, position, extent, cellSize, context) {
    this.color = color;
    this.state = state;
    this.position = position;
  }

  update() {
    return { color: this.color, state: this.state, position: this.position };
  }
}

module.exports = {
  Room: Room,
  Door: Door,
};
// new Room(document.getElementById('myCanvas'), 64, 0);
