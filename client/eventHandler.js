// eventHandler Player *** Janka *** 30.6.2020 
export class{
handleKeyUp(event) {
    if (event.code === 'ArrowRight' ||
        event.code === 'ArrowLeft' ||
        event.code === 'ArrowUp' ||
        event.code === 'ArrowDown') {
        this.pressedKey = event.code;
        this.socket.emit('player_movement', {pressedKey: this.pressedKey, socketID: this.socket.id});
        }
}
}