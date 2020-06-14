export class Spieler{
    constructor(x, y, color, lifes, pressedKey, cellSize, context,){ //socket
    //aufrufen mit: this.spieler1 = new Spieler(2, 3, 'blue', 3, 'ArrowRight', this.cellSize, this.context, this.socket);
        this.x = x;
        this.y = y;
        this.color = color;
        this.lifes = lifes;
        this.pressedKey = pressedKey;
        this.cellSize = cellSize;
        this.context = context;
        //this.socket = io('http://localhost:3000');
        setInterval(this.loop.bind(this), 500);
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
        this.draw();
    }        
        //openDoor()
        //mixColors()
        //changeColor()
        //shoot()
        //shot()

    handleKeyUp(event) {
        if (event.code === 'ArrowRight' ||
            event.code === 'ArrowLeft' ||
            event.code === 'ArrowUp' ||
            event.code === 'ArrowDown') {
            this.pressedKey = event.code;
            }
    }
        
    move(){
        if (this.pressedKey === 'ArrowRight') {
            this.x += 1;
        } else if (this.pressedKey === 'ArrowDown') {
            this.y += 1;
        } else if (this.pressedKey === 'ArrowLeft') {
            this.x -= 1;
        } else if (this.pressedKey === 'ArrowUp') {
            this.y -= 1;
        }
        //this.socket.emit('player_position', {x, y});
    }

    draw(){
        if (this.color === 'blue'){
            if (this.lifes === 3){
                this.context.fillStyle = 'navy';
            }
            if (this.lifes === 2){
                this.context.fillStyle = 'royalblue';
            }
            if (this.lifes === 1){
                this.context.fillStyle = 'lightsteelblue';
            }
            if (this.lifes === 0){
                this.context.fillStyle = 'white';
            }
        }
        else if (this.color === 'red'){
            if (this.lifes === 3){
                this.context.fillStyle = 'darkred';
            }
            if (this.lifes === 2){
                this.context.fillStyle = 'red';
            }
            if (this.lifes === 1){
                this.context.fillStyle = 'lightcoral';
            }
            if (this.lifes === 0){
                this.context.fillStyle = 'white';
            }
        }
        else { //color green
            if (this.lifes === 3){
                this.context.fillStyle = 'darkgreen';
            }
            if (this.lifes === 2){
                this.context.fillStyle = 'green';
            }
            if (this.lifes === 1){
                this.context.fillStyle = 'mediumseagreen';
            }
            if (this.lifes === 0){
                this.context.fillStyle = 'white';
            }    
        }
        this.context.fillRect(this.x * this.cellSize, this.y * this.cellSize, this.cellSize, this.cellSize);
    }
    loop(){
        this.move();
        this.draw();
    }
}