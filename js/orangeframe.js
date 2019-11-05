class Orangeframe {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx;
        this.gameWidth = w
        this.gameHeight = h
    
        this.image = new Image()
        this.image.src = "img/orangeframe.png"
  
        this.width = 200
        this.height = 300
    
        this.posX = this.gameWidth - 220 
        this.posY = this.gameHeight - 700    
  
    }
    draw() {
      this.ctx.drawImage(
        this.image,
        this.posX,
        this.posY,
        this.width,
        this.height
      );
    }


  }
