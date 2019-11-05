class Euflag {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.gameWidth = w
        this.gameHeight = h
    
        this.image = new Image()
        this.image.src = "img/euflag.png"
  
        this.width = 25
        this.height = 25
    
       this.posX = Math.floor(Math.random()*this.gameWidth-220)
     
        this.posY = 0-this.height 

        this.velY = 3
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
