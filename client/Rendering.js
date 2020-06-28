// Rendering Room *** Andrei *** 23.6.2020 
import { Game } from "/Game.js"
import { Room } from "/Room.js" 

export class Rendering{
    constructor(room) {
    this.room = Game.room;
    setInterval(this.room.draw(), 33) //soll es genug sein einfach room.draw zu aufrufen, weil alle nötige Daten sind schon in Room.js ?
    }
    
}
