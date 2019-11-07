class Jefflaughing {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.gameWidth = w
        this.gameHeight = h
    
        this.image = new Image()
        this.image.src = "./img/jefflaughing.png"
  
        this.width = 200
        this.height = 200
    
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
          this.height,
        );
        console.log("NOOOOOOOO")
      }
  
    move() {
      this.posY += this.velY
    }
}
