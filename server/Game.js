/**
 * TO-DO:
 * - construtors of Player, Room and (Monster)
 * - onclick handler on server or client? 
 * - draw methodes 
 * - Asset-Loader? 
 * - Pause function?  Eher nicht
 * - this.room.reset 
 */
class Game{
    constructor(canvas, extent) {
        this.extent = extent;
        this.canvas = canvas;
        this.cellSize = this.canvas.width / this.extent;
        this.context = this.canvas.getContext('2d');
        // this.player1 = new Spieler(5, 6, 'blue', 3, 'ArrowRight', this.cellSize, this.context, this.socket);
        // this.player2 = new Spieler(4, 6, 'red', 3, 'ArrowRight', this.cellSize, this.context, this.socket);
        // this.monster1 = new Monster(10, 5, 'black' , 2, this.canvas, this.extent);
        this.room = new Room(this.canvas, this.extent, 1); 
        this.difficulty = 1; 
        this.startGame();
        this.levelCounter = 0;  
        this.pause = false; 
        this.playerLifes = 3; 
        io.on('connection', function(socket) {
            socket.on('start_game', timer() )
            socket.on('player_position', )
        }) 
    }
    /*
    // Startbildschirm
    startGame() {
        //TO-DO:  draw Startbildschirm 
        document.getElementById("easy").onclick = function() {this.difficulty = 1};
        document.getElementById("middle").onclick = function() {this.difficulty = 2};
        document.getElementById("hard").onclick = function() {this.difficulty = 3};
        document.getElementById("start").onclick = function() {
            timer();
            play();
        }
    } */
    // Spiel-Timer 
    timer() {
        let minuten = 0; 
        switch (this.difficulty) {
            case 1: 
                minuten = 0;
                break;
            case 2: 
                minuten = 10; 
                break;
            case 3: 
                minuten = 5;
                break;
        }
        if (minuten != 0) {
            let timerMin = minuten;
            let timerSek = 0; 
            document.getElementById("pause").onclick = function() {this.pause = true}; //TO-DO Brauchen wir das?
            let timer = window.setInterval(function() {
                // TO-DO draw Timer
                if (!this.pause) {
                    if (timerSek === 0 && timerMin === 0) {
                        clearInterval(timer);
                        this.gameOver();
                    } else if (timerSek === 0) {
                        timerMin--;
                        timerSek += 60; 
                    } else {
                        timerSek--;
                    }
                }
            }, 1000)
        }
    }
    damage(playerPosition) {
        if(playerPosition.x === monsterPostion.x && playerPosition.y === monsterPosition.y) {
            socket.broadcast.emit('player1_damage');
        }
    }
    /*
    // Room laden + Level starten
    play() {
        levelCounter++;
        this.room = new Room(this.canvas, this.extent, levelCounter); // TO-DO: constructor , beinhaltet levelCounter! 
        // document.getElementById("play").onclick = this.runLevel.bind(this);    //Level auf Knopfdruck starten   // TO-DO
        this.runLevel();   // Level startet automatisch
    }
    // Level spielen + Pause Option + Restart Option
    runLevel() {
        this.room.reset();  //TO-DO:  An class Room anpassen 
        this.pause = false; 
        let frameCount = 0; 
        let running = window.setInterval(function() {
            this.loop(frameCount).bind(this);
            if (this.player1.leben === 0 && this.player2.leben === 0) { 
                clearInterval(running);
                // TO-DO: Draw Restart Screen 
                document.getElementById("play").onclick = this.runLevel.bind(this);  // Möglichkeit das Level neu zu starten 
            };
            if (this.room.complete === 1) {
                clearInterval(running); 
                // TO-DO: Draw Next Level Screen
                this.pause = true; 
                document.getElementById("next").onclick = this.play(); 
            }
        }
        , 33); 
        document.getElementById("pause").onclick = clearInterval(running); //Brauchen wir das? // TO-DO
    }
    // Game-Loop
    loop(frameCount) {
        frameCount++;
        this.update();
        this.draw(frameCount);
    }
    // Update in jedem Loop
    update() {
        this.room.update();
        this.player.update(); 
        // this.monster1.update(); 
    }
    // Zeichnen in jedem Loop
    draw(frameCount) {
        this.room.draw(frameCount)
        this.player1.draw(frameCount)
        this.player2.draw(frameCount)
        // this.monster1.draw(frameCount);  // TO-DO
    }
    // GameOver Bildschirm
    gameOver() {
        // TO-DO: drawgameOverBilschirm
        clearInterval(running);
        document.getElementById("end").onclick = startGame(); 
    }*/
    
}

module.exports = Game;



