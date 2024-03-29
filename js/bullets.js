class Bullet {
    constructor(ctx, x, y) {
        this.ctx = ctx;
    
        this.image = new Image()
        this.image.src = "img/box.png"
  
        this.width = 50
        this.height = 50
    
        this.posX = x
        this.posY = y 

      this.velY = 10
  
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
  
    move() {
      this.posY -= this.velY 
    }
  }