class Game {
  constructor(ctx, budgieGame, bkgd1Ctx, bkgd2Ctx, groundCtx, Budgie, zebra,  start, beginGame, defeated, score) {
    this.ctx = ctx;
    this.budgieGame = budgieGame;
    this.bkgd1Ctx = bkgd1Ctx;
    this.bkgd2Ctx = bkgd2Ctx;
    this.groundCtx =  groundCtx;
    // this.coverCtx = coverCtx;
    this.Budgie = Budgie;
    this.zebra = zebra;
    this.gameOver = this.gameOver.bind(this);
    this.gameOver();
    this.defeated = false;
    this.started = false;
    this.score = parseInt('0000');
    this.keepScore = this.keepScore.bind(this);
    this.raiseScore = this.raiseScore.bind(this);
    this.interval = null;
    this.beginGame = beginGame;
    this.raiseDifficulty = this.raiseDifficulty.bind(this);
    this.interval2 = setInterval(this.raiseDifficulty, 500);
    this.resetVariables = this.resetVariables.bind(this);
    this.start = start;
    this.startScore();
  }

  farbkgdDraw() {
    const farBack = new FarBackground(this.bkgd1Ctx);
    farBack.draw(this.bkgd1Ctx);
  }

  nearbkgdDraw() {
    const nearBack = new NearBackground(this.bkgd2Ctx);
    nearBack.draw(this.bkgd2Ctx);
  }

  groundDraw() {
    const ground = new Ground(this.groundCtx);
    ground.draw(this.groundCtx);
  }



  resetVariables() {
      clearInterval(this.interval);
    this.defeated = false;
    this.started = false;
    this.score = parseInt('0000');
    this.Budgie.jumping = false;
    this.Budgie.yalign = 69;
    this.Budgie.descending = false;
    this.zebra.posX = 305;
    this.zebra.obSpeed = 15;
    this.keepScore();
    this.raiseScore();
    // this.interval = setInterval(this.raiseScore, 500);

  }

  gameOver() {
    if (this.zebra.posX >= 0 && this.zebra.posX <= 27 && this.Budgie.yalign > 50) {
      this.defeated = true;
      this.ctx.fillStyle = 'black'
      this.ctx.fillRect(0,0,170,90);
      this.ctx.fillRect(0,0,224,87);
      // clearInterval(this.interval);
      const text1 = 'GAME OVER';
      const text1b = '(this game only, not, you'
      const text1c = 'know, Luster as a company'
      const text1d = 'or the world as we know it)'
      this.ctx.fillStyle = 'white';
      this.ctx.textAlign = 'center';
      this.ctx.font = 'bold 16px Common_Pixel';
      this.ctx.fillText(text1, 112, 35);
      this.ctx.font = 'bold 8px Common_Pixel';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(text1b, 112, 50);
      this.ctx.fillText(text1c, 112, 60);
      this.ctx.fillText(text1d, 112, 70);

      const text2 = 'Click to try again';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white'
      this.ctx.fillText(text2, 50, 94);

      if (this.defeated === true) {
        this.budgieGame.addEventListener('click', () => {
          this.resetVariables();
          if (this.defeated === false) {
            this.beginGame();
            this.start();
          }
        });
      }

    }
  }

  startScore() {
    this.interval = setInterval(this.raiseScore, 500);

  }

  raiseScore() {
    if (this.started === true) {
      this.score += 1;
    }
  }

  keepScore() {
    if (this.defeated === false)
    this.ctx.font = 'bold 8px Common_Pixel';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(this.score, 200, 94);


    const txt_pts = 'pts';
    this.ctx.font = 'bold 8px Common_Pixel';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(txt_pts, 180, 94);

  }

  raiseDifficulty() {
    if (this.Budgie.jumping == false && this.Budgie.descending == false) {
      this.zebra.obSpeed += 0.5;
    }
  }


}
