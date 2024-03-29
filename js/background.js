class Background {
  constructor(ctx, width,height, src) {
      this.ctx =ctx
      this.width = width
      this.height = height

      this.image = new Image()
      // this.image.src = "img/background.png"
      this.image.src = src

      this.posX = 0
      this.posY =0

      this.velY = 1

  }

  draw (){
      this.ctx.drawImage(this.image,this.posX,this.posY,this.width,this.height)
      this.ctx.drawImage(this.image, this.posX, this.posY-this.height, this.width, this.height)
  }

  move() {
    this.posY += this.velY
    if(this.posY >= this.height){ this.posY= 0}
  }

}   
