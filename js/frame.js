class Frame {
    constructor(ctx, w, h, src) {
        this.ctx = ctx;
        this.gameWidth = w
        this.gameHeight = h
    
        this.image = new Image()
        this.image.src = src
  
        this.width = 300
        this.height = this.gameHeight - 40
    
        this.posX = this.gameWidth - 320 
        this.posY = 20
  
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
