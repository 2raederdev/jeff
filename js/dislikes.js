class Dislike {
    constructor(ctx, w, h, y) {
        this.ctx = ctx;
        this.gameWidth = w
        this.gameHeight = h
    
        this.image = new Image()
        this.image.src = "img/dislike.png"
  
        this.width = 80
        this.height = 80
    
        this.posX = this.gameWidth -205
        this.posY = y   
  
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


  }
