// Rendering Room *** Andrei *** 23.6.2020 

// Rendering Player *** Janka *** 30.6.2020 
export class{
drawPlayer(){
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