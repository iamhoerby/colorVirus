export class Spieler{
    constructor(x, y, color, lifes, pressedKey, cellSize, context, socket){ 
        this.x = x;
        this.y = y;
        this.color = color;
        this.lifes = lifes;
        this.pressedKey = pressedKey;
        this.cellSize = cellSize;
        this.context = context;
        this.socket = socket;
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
    }
        //openDoor(): if (SpielerKoordinaten === TürKoordinaten && SpielerFarbe = Türfarbe, setze Boolean Variable auf positiv, damit neues Spiel gestartet wird
        //mixColors(): if (Spieler1Koordinaten === Spieler2Koordinaten), mische Farben
        //changeColor(): if (SpielerKoordinaten === FarbtopfKoordinaten), this.color = Farbtopf.color
        //shoot(): mit handlyKeyUp Maus

    handleKeyUp(event) {
        if (event.code === 'ArrowRight' ||
            event.code === 'ArrowLeft' ||
            event.code === 'ArrowUp' ||
            event.code === 'ArrowDown') {
            this.pressedKey = event.code;
            }
    }

    //in update Klasse fehlt noch: Spieler läuft in Monster + gegen Hindernis
    update(){
        if (this.pressedKey === 'ArrowRight') {
            if (this.x < 63){ //wenn Spieler nicht aus Spielfeld rennt
                this.x += 1;
            } 
        } else if (this.pressedKey === 'ArrowDown') {
            if (this.y < 63){ 
                this.y += 1;
            }
        } else if (this.pressedKey === 'ArrowLeft') {
            if (this.x > 0){
                this.x -= 1;
            }
        } else if (this.pressedKey === 'ArrowUp') {
            if (this.y > 0){
                this.y -= 1;
            }
        }
        this.pressedKey = 'Stop';

        /*if (this.x === monster.x && this.y === monster.y){
            this.lifes = this.lifes - 1;
        }*/

        // this.socket.emit('player_position', {x: this.x, y: this.y});
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
}