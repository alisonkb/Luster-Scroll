class NearBackground {
  constructor(ctx, posX, posY){
    this.ctx = ctx;
    this.posX = 0;
    this.posY = 0;
  }

  draw(ctx) {
    let bkgd2 = new Image();
    bkgd2.src = './assets/images/Close-Background.png';
    bkgd2.onload = () => {
      let x = 0;

      let bkgdLoop = () => {
          this.ctx.drawImage(bkgd2, x, this.posY);
          this.ctx.clearRect(0,0, 500, 350);
          this.ctx.drawImage(bkgd2, x -= 1, this.posY);
          if (x < -448) {
            x = 0;
          }
      };

    setInterval(bkgdLoop, 30);
    };

  }



}
