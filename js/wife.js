class Wife {
    constructor(ctx, w, h, src) {
        this.ctx = ctx;
        this.gameWidth = w
        this.gameHeight = h
    
        this.image = new Image()
        this.image.src = src
  
        this.width = 120
        this.height = 120
    
       this.posX = Math.floor(Math.random() * ((this.gameWidth-360) - 20)) + 20

       
     
        this.posY = 0-this.height 

        this.velY = 6
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
  
    move() {
      this.posY += this.velY
    }
}
