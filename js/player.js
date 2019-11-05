class Player {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx;
        this.gameWidth = w
        this.gameHeight = h
    
        this.image = new Image()
        this.image.src = "img/jeff.png"
  
        this.width = 70
        this.height = 90
    
        this.posX = this.gameWidth / 2 - 35 
        this.posY = this.gameHeight - 95    

        this.setListeners(); 

        this.vel = 18

        this.keys = keys
  
    }
    draw() {
      this.ctx.drawImage(
        this.image,
        this.posX,
        this.posY,
        this.width,
        this.height
      )

    }

    goLeft() {
        this.posX >= 15 ? this.posX -= this.vel : null
    }

    goRight() {
        this.posX <= this.gameWidth - this.width - 220 ? this.posX += this.vel : null
    }

    // goUp() {
    //   this.posY >= 20 ? this.posY -= this.vel : null
    // }

    // goDown() {
    //   this.posY <= this.gameHeight - this.height-20 ? this.posY += this.vel : null
    // }

    setListeners() {
        document.onkeydown = e => {
          switch (e.keyCode){
            case Game.keys.LEFT :
              this.goLeft() 
              break
            case Game.keys.RIGHT :
              this.goRight()
              break
          }
        }
    }


  }
