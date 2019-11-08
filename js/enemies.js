class Enemies {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.gameWidth = w
        this.gameHeight = h
    
        this.image = new Image()
        this.image.src = "img/markzuckerberg.png"
    
        this.width = 80
        this.height = 130
    
        this.posX = Math.floor(Math.random() * ((this.gameWidth-360) - 20)) + 20 
        this.posY = 20    

        this.velX = 9
      
        this.velY = 10

  
    }
  
    draw (){
        this.ctx.drawImage(this.image,this.posX,this.posY,this.width,this.height)
    }
  
    // speedUp() {
    //     switch(Game.markLifes.length){
    //         case 3:
    //             this.velX
    //         break
    //         case 2:
    //             this.velX += 2
    //         break
    //         case 1:
    //             this.velX += 2
            
    //         break
    //     }
    // }

    move() {

        if (Game.markLifes.length > 0) {

            this.posX += this.velX

            this.posX > this.gameWidth-this.width - 330 ? this.velX *= -1 : null
            this.posX < 0 ? this.velX *= -1 : null
            
            if(this.posX > this.gameWidth-this.width - 330 && this.posY == 20) this.posY+=75

            if(this.posX < 0 && this.posY == 95) this.posY+=75

            if(this.posX > this.gameWidth-this.width - 330 && this.posY == 170) this.posY+=75

            if(this.posX < 0 && this.posY == 245) this.posY+=75

            if(this.posX > this.gameWidth-this.width - 330 && this.posY == 320) this.posY+=75

            if(this.posX < 0 && this.posY == 395) this.posY+=75

            if(this.posX > this.gameWidth-this.width - 330 && this.posY == 470) this.posY+=75

        }
    }
    
    // speedUp () {

    //     switch(Game.markLifes.length) {
    //         case 3 :
    //         this.velX
    //         break
    //         case 2 :
    //         this.velX += 2
    //         break
    //         case 1 :
    //         this.velX += 2
    //         break
    //     }
    }
