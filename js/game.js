const Game = {
    title: 'My name is Jeff',
    author: 'Daniel Hita',
    license: null,
    version: '1.0',
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    dollars: [],
    enemies: [],
    euflags: [],
    framesCounter: 0,
    fortune: 0,
    totalTime: 10,

    keys: {
        LEFT: 65,
        RIGHT: 68,
        REFRESH: 82
        // UP: 38,
        // DOWN: 40
    },

    init() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth * .9;
        this.height = window.innerHeight * .9;    
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.start() 
        
    },

    start() {

        this.reset()
        
        this.interval = setInterval(() => {
            
            this.framesCounter++
            
            if (this.framesCounter > 1000) this.framesCounter = 0
            
            if(this.level)

            this.clear()
            this.drawAll()  
            this.moveAll()
            this.generateDollars()
            this.dollarCollision()
            this.generateEnemies()
            this.enemiesCollision()
            this.generateEuflags()
            this.euflagsCollision()
            this.clearDollars()
            this.clearEnemies()
            this.clearEuflags()
            this.refresh()
            if(this.fortune < 0) this.gameOver()
            this.chronometer()
            // this.reset2()
            
        }, 1000/this.fps)

    },


    gameOver() {
        this.ctx.font = "bold 96px Helvetica, Arial, sans-serif";
        this.ctx.fillText("GAME OVER", this.canvas.width/2, this.canvas.height/2);
        clearInterval(this.interval);
    },


    refresh() {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.REFRESH :
                    this.reset()
                break
            }
        })
    },

    reset() {
        this.level1 = true
        this.background = new Background(this.ctx, this.width, this.height, "img/background.png")
        
        this.orangeframe = new Orangeframe(this.ctx, this.canvas.width, this.canvas.height, this.gameWidth, this.gameHeight, this.keys)
        this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.gameWidth, this.gameHeight, this.keys)
        
        
        this.dollars = []
        this.wifes = []
        this.euflags = []
    },

    reset2() {
        this.level1 = undefined
        this.level2 = true
        this.background = new Background(this.ctx, this.width, this.height, "img/background2.png")
        
        this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.gameWidth, this.gameHeight, this.keys)
        
        this.dollars = []
        this.enemies = []
        this.euflags = []
    },


    drawAll() {
        this.background.draw()
        this.player.draw()
        this.dollars.forEach(dol => dol.draw());
        this.enemies.forEach(ene => ene.draw())
        this.euflags.forEach(eu => eu.draw())
        this.orangeframe.draw()
        this.drawfortunita()
        this.drawTime()
    },

    moveAll() {
        this.background.move()
        this.dollars.forEach(dol => dol.move())
        this.enemies.forEach(ene => ene.move())
        this.euflags.forEach(eu => eu.move())
    },

    clear (){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

  
    drawScoreBox() {
        this.ctx.strokeStyle = "rgb(255, 157, 29, .8)"
        this.ctx.lineWidth = 40
        this.ctx.setLineDash([0, 0])
        this.ctx.beginPath()
        this.ctx.moveTo(this.canvas.width-150, 45)
        this.ctx.lineTo(this.canvas.width-30, 45)
        this.ctx.stroke()

    },

    generateDollars() {
        if (this.framesCounter % 134 == 0) {

            this.dollars.push(new Dollar(this.ctx, this.width, this.height)); 
          }       

    },

    clearDollars() {
        this.dollars.forEach((dol, idx) => {
          if (dol.posY >= this.canvas.height) {
            this.dollars.splice(idx, 1);
          }
        });
      },

    morefortunita() { 
        this.fortune++
        // this.ctx.font = "bold 96px Helvetica, Arial, sans-serif";
        // this.ctx.fillText(this.fortune, 40, 125);
    },

    halffortunita() { 
        this.fortune /= 2
        // this.ctx.font = "bold 96px Helvetica, Arial, sans-serif";
        // this.ctx.fillText(this.fortune, 40, 125);
    },

    lessfortunita() { 
        this.fortune--
        // this.ctx.font = "bold 96px Helvetica, Arial, sans-serif";
        // this.ctx.fillText(this.fortune, 40, 125);
    },

    drawfortunita() {
        this.ctx.font = "30px sans-serif";
        this.ctx.fillStyle = "white"
        this.ctx.fillText(Math.floor(this.fortune), 40, 125);
    },
      
    dollarCollision() {   
        this.dollars.some(dol => { if (
            this.player.posX + this.player.width >= dol.posX &&
            this.player.posX <= dol.posX + dol.width &&
            this.player.posY <= dol.posY+dol.height
            ) {
                this.dollars.shift()
                this.morefortunita()
            }
            
        })
    },
                

    generateEnemies() {
        if (this.framesCounter % 415 == 0) {
            
            this.enemies.push(new Enemies(this.ctx, this.width, this.height, "img/wife.png")); 
        }       
        
    },
    
    clearEnemies() {
        this.enemies.forEach((ene, idx) => {
          if (ene.posY >= this.canvas.height) {
              this.enemies.splice(idx, 1);
            }
        });
    },

    enemiesCollision() {   
        this.enemies.some(ene => { if (
            this.player.posX + this.player.width >= ene.posX &&
            this.player.posX <= ene.posX + ene.width &&
            this.player.posY <= ene.posY+ene.height
            )  {
                this.enemies.shift()
                this.halffortunita()
            }
        })
    },

    
    generateEuflags() {
        if (this.framesCounter % 49 == 0) {
            
            this.euflags.push(new Euflag(this.ctx, this.width, this.height));
 
        }       
        
    },
    
    clearEuflags() {
        this.euflags.forEach((eu, idx) => {
            if (eu.posY >= this.canvas.height) {
                this.euflags.splice(idx, 1);
          }
        })
      },

    euflagsCollision() {
        this.euflags.some(eu => { if (
            this.player.posX + this.player.width >= eu.posX &&
            this.player.posX <= eu.posX + eu.width &&
            this.player.posY <= eu.posY+eu.height
            )   {
                this.euflags.shift()  
                this.lessfortunita()

            }
        })
    },

    drawTime() {
        this.ctx.font = "bold 96px Helvetica,  sans-serif";
        this.ctx.fillStyle = "white"
        this.ctx.fillText(Math.floor(this.totalTime), 190, 125);
    },
      
    chronometer() {
        if (this.framesCounter % 60 == 0 && this.totalTime>=-1)  {
        this.totalTime--
        } else { 
            this.totalTime
        }
           if (this.totalTime==-1) {
                            clearInterval(this.interval)
                            this.reset()
                            
        }
        
    }, 

}






/*

crear funcion change level global

dentro gestionar el reseteo o borrado de lo que no necesitemos
cambiar el background por uno nuevo
new enemy


*/
