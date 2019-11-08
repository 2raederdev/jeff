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

        this.vel = 5

        this.keys = keys

        this.fortunita = []
        this.bullets = []

        this.left = false
        this.right = false

        this.boxshoot = document.createElement("audio")
        this.boxshoot.src = "music/audiojeff-short.mp3"
  
    }
    draw() {
      this.ctx.drawImage(
        this.image,
        this.posX,
        this.posY,
        this.width,
        this.height
      )
      this.bullets.forEach(bul => bul.draw())
      this.bullets.forEach(bul => bul.move())    


    }

    goLeft() {
      if(this.posX >= 20  && this.left) this.posX -= this.vel
    }

    goRight() {
      if((this.posX <= this.gameWidth - this.width - 330) && this.right)  this.posX += this.vel
    }

    shoot() {
      
      if(this.fortunita.length > 0) {
        Game.level <= 1 ? null : this.bullets.push(new Bullet(this.ctx, this.posX, this.posY))

        this.fortunita.pop()

        // let boxshoot = document.createElement("audio")
        // boxshoot.src = "music/mynameisjeff.mp3"
        this.boxshoot.volume = .9
        this.boxshoot.play()
      } 

    }

    setListeners() {
        document.onkeydown = e => {
          switch (e.keyCode){
            case Game.keys.LEFT :
              this.left = true
              // this.goLeft() 
              break
            case Game.keys.RIGHT :
              this.right = true
            //  this.goRight()
              break
              case Game.keys.SHOOT :
                  this.shoot()
              break
          }
        }

        document.onkeyup = e => {
          switch (e.keyCode){
            case Game.keys.LEFT :
              this.left = false
              break
            case Game.keys.RIGHT :
              this.right = false
              break
          }
        }
        
    }





  }
