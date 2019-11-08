class Euflag {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.gameWidth = w
        this.gameHeight = h
    
        this.image = new Image()
        this.image.src = "img/euflag.png"
  
        this.width = 30
        this.height = 30
    
        this.posX = Math.floor(Math.random() * ((this.gameWidth-360) - 20)) + 20
     
        this.posY = 0-this.height 

        this.velY = 5
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

    drawMarkLifes() {
      this.ctx.drawImage(
        this.image,
        this.posX = 600,
        this.posY = 40,
        this.width,
        this.height
      );
    } 
  
    move() {
      this.posY += this.velY
    }
}
