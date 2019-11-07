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
    wife: [],
    euflags: [],
    enemies: [],
    jeff: [],
    level: undefined,
    framesCounter: 0,
    fortune: 0,
    totalTime: 30,
    markLifes: [],
    musicOn: true,
    music: new Audio("music/fondomusic.mp3"),
    music2: new Audio("music/techno.mp3"),
    keys: {
        LEFT: 37,
        RIGHT: 39,
        SHOOT: 32,
        START: 13,
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
        // this.start2()
        
    },

    start() {

        this.reset()
        
        this.interval = setInterval(() => {
            
            this.framesCounter++
            
            if (this.framesCounter > 1000) this.framesCounter = 0

            if (this.level == undefined) {
            
            this.clear()
            this.drawAll()  
            this.moveAll()
            this.generateDollars()
            this.dollarCollision()
            this.generateWife()
            this.wifeCollision()
            this.generateEuflags()
            this.euflagsCollision()
            this.clearDollars()
            this.clearWife()
            this.clearEuflags()
            this.fondoMusic()
            if(this.fortune < 0) this.gameOver()
            this.chronometer()
        } else {
            this.clear()
            this.drawAllL2()
            this.moveAllL2()
            // this.enemies.speedUp()  
            this.markCollision()
            this.bulletCollision()
            this.fondoMusic2()
            this.youWin()
            this.clearJeff()
            }

            
        }, 1000/(this.fps))

    },

    gameOver() {
        this.stopMusic()

        let techno = document.createElement("audio")
        techno.src = "music/dead.mp3"
        techno.volume = .5
        techno.play()

        this.repartidor.draw()
        clearInterval(this.interval);
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height, "img/background.png")
        this.frame = new Frame(this.ctx, this.width, this.height, "img/orangeframe.png")
        this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.gameWidth, this.gameHeight, this.keys)
        this.repartidor = new Repartidor(this.ctx, this.width, this.height)
    },

    reset2() {

        this.background = new Background(this.ctx, this.width, this.height, "img/background2.png")
        this.enemies = new Enemies(this.ctx, this.canvas.width, this.canvas.height, this.gameWidth, this.gameHeight)
        this.frame = new Frame(this.ctx, this.width, this.height, "img/whiteframe4.png")
            this.dislike = this.markLifes.push(new Dislike(this.ctx, this.width, this.height, 100), 
            new Dislike(this.ctx, this.width, this.height, 260), 
            new Dislike(this.ctx, this.width, this.height, 420) )


    },

    fondoMusic() {
            this.music.volume = .3
            // this.music.loop = true
            this.music.play()
    },

    fondoMusic2() {
        this.stopMusic()
        this.music.volume = .4
        // this.music.loop = true
        this.music.play()
    },

    stopMusic() {
        this.music.pause()
        // this.music2.pause()

    },


    drawAll() {
        this.background.draw()
        this.player.draw()
        this.dollars.forEach(dol => dol.draw())
        this.wife.forEach(wif => wif.draw())
        this.euflags.forEach(eu => eu.draw())
        this.frame.draw()
        this.drawfortunita()
        this.drawFortunitaTitle()
        this.drawTime()
        this.drawTimeTitle()
    },

    drawAllL2() {
        this.background.draw()
        this.player.draw()
        this.frame.draw()
        this.enemies.draw()
        this.jeff.forEach(jef => jef.draw())
        this.markLifes.forEach(mar => mar.draw())


        // this.player.markLifes.forEach(eu => eu.this.player.drawMarkLifes())

    },

    moveAll() {
        this.background.move()
        this.player.goLeft()
        this.player.goRight()
        this.dollars.forEach(dol => dol.move())
        this.wife.forEach(wif => wif.move())
        this.euflags.forEach(eu => eu.move())
    },

    moveAllL2() {
        this.background.move()
        this.enemies.move()
        this.player.goLeft()
        this.player.goRight()
        this.jeff.forEach(jef => jef.move())

    },

    clear (){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    generateDollars() {

         if (this.framesCounter % 179 == 0) {

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
        this.player.fortunita.push("bullet")
        console.log(this.player.bullets)
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

    drawFortunitaTitle() {
        this.ctx.font = "bold 50px Helvetica, Arial, sans-serif";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("MONEY:", 1110, 125);
    },

    drawfortunita() {
        this.ctx.font = "bold 50px Helvetica, Arial, sans-serif";
        this.ctx.fillStyle = "white"
        this.ctx.fillText(Math.floor(this.fortune), 1190, 195);
    },

    bulletCollision() {

        this.player.bullets.forEach((bul, idx) => { 
            if (
            bul.posY <= this.enemies.posY+this.enemies.height &&
            bul.posY + bul.height >= this.enemies.posY &&
            bul.posX < this.enemies.posX + this.enemies.width &&
            bul.posX + bul.width > this.enemies.posX
        ) {
            this.player.bullets.splice(idx,1)
            this.markLifes.pop()
        }
        })
    },

    youWin() {
        if(this.markLifes.length == 0) {

        this.generateJeffs()
        
    
        //  this.ctx.font = "bold 96px Helvetica, Arial, sans-serif"
        // this.ctx.fillText("You Win", 40, 125)
        }
    },
      
    dollarCollision() {   

        this.dollars.some(dol => { if (
            this.player.posX + this.player.width >= dol.posX &&
            this.player.posX <= dol.posX + dol.width &&
            this.player.posY <= dol.posY+dol.height
            ) {
              
                this.dollars.shift()
                this.player.fortunita.push(dol)
                this.fortune ++

                let dollarsound = document.createElement("audio")
                dollarsound.src = "music/coin.wav"
                dollarsound.volume = .5
                dollarsound.play()
                // this.morefortunita()
            }
            
        })
    },
                

    generateWife() {
        if (this.framesCounter % 323 == 0) {
            
            this.wife.push(new Wife(this.ctx, this.width, this.height, "img/wife.png")); 
        }       
        
    },
    
    clearWife() {
        this.wife.forEach((wif, idx) => {
          if (wif.posY >= this.canvas.height) {
              this.wife.splice(idx, 1);
            }
        });
    },

    wifeCollision() {   
        this.wife.some(wif => { if (
            this.player.posX + this.player.width >= wif.posX &&
            this.player.posX <= wif.posX + wif.width &&
            this.player.posY <= wif.posY+wif.height
            )  {
                this.wife.shift()
                this.halffortunita()

                let woman = document.createElement("audio")
                woman.src = "music/woman.wav"
                woman.volume = .5
                woman.play()
            }
        })
    },


    generateJeffs() {
        if (this.framesCounter % 10 == 0) {
            this.jeff.push(new Jefflaughing(this.ctx, this.width, this.height)); 
        }       
        console.log(this.jeff)
        
    },

    clearJeff() {
        this.jeff.forEach((jef, idx) => {
          if (jef.posY >= this.canvas.height) {
              this.jeff.splice(idx, 1);
            }
        });
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

                let facebook = document.createElement("audio")
                facebook.src = "music/fuckyou.mp3"
                facebook.volume = .5
                facebook.play()

            }
        })
    },

    drawTime() {
        this.ctx.font = "bold 50px Helvetica, Arial, sans-serif";
        this.ctx.fillStyle = "white"
        this.ctx.fillText(Math.floor(this.totalTime), this.canvas.width-198, 395);
    },
      
    drawTimeTitle() {
        this.ctx.font = "bold 50px Helvetica, Arial, sans-serif";
        this.ctx.fillStyle = "white"
        this.ctx.fillText("TIME:", this.canvas.width-235, 325);
    },


    chronometer() {
        if (this.framesCounter % 60 == 0 && this.totalTime>=-1)  {
        this.totalTime--
        } else { 
            this.totalTime
        }
           if (this.totalTime==0) {
                            this.ctx.font = "bold 48px Helvetica, Arial, sans-serif";
                            this.ctx.fillText(`You have reached $${this.fortune} Billion `, this.canvas.width/2-100, this.canvas.height/2);
                            this.level=true
                            this.reset2()
            }
        
    },

    markCollision() {   

        if(
        this.player.posX <= this.enemies.posX + this.enemies.width &&
        this.player.posY <= this.enemies.posY+this.enemies.height && 
        this.player.posX + this.player.posX >= this.enemies.posX
        ) {
            let bomb = document.createElement("audio")
                bomb.src = "music/fuckyou.mp3"
                bomb.volume = .5
                bomb.play()
            this.gameOver()
        }
    },

 

}

// const background = [
//     new Background(this.ctx, this.width, this.height, "img/background.png"),
//     new Background(this.ctx, this.width, this.height, "img/background2.png")
// ]




// crear funcion change level global

// dentro gestionar el reseteo o borrado de lo que no necesitemos
// cambiar el background por uno nuevo
// new enemy

