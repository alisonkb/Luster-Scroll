document.addEventListener('DOMContentLoaded', () => {
  const budgieGame = document.getElementById('budgie-game');
  const gameCtx = budgieGame.getContext('2d');

  const budgieBkgd2 = document.getElementById('budgie-bkgd2');
  const bkgd2Ctx = budgieBkgd2.getContext('2d');

  const budgieBkgd1 = document.getElementById('budgie-bkgd1');
  const bkgd1Ctx = budgieBkgd1.getContext('2d');

  const budgieGround = document.getElementById('budgie-floor');
  const groundCtx = budgieGround.getContext('2d');

  const budgieCover = document.getElementById('intro');
  // const coverCtx = budgieCover.getContext('2d');

  let dog1 = new Image();
  dog1.src ='./assets/images/ML.png';
  const Budgie = new Dog(gameCtx, dog1);

  let vent = new Image();
  vent.src ='./assets/images/GERM.png';
  let barrier = new Image();
  barrier.src ='./assets/images/GERM.png';
  let cart = new Image();
  cart.src ='./assets/images/GERM.png';
  let trash = new Image();
  trash.src ='./assets/images/GERM.png';
  let phone = new Image();
  phone.src ='./assets/images/GERM.png';
  const obts = [vent, barrier, cart, trash, phone];
  let currentObst = obts[(Math.floor(Math.random() * 5))];
  let zebra = new Obstacles(gameCtx, currentObst, 505);

  let fps = 30;
  let now;
  let then = Date.now();
  let interval = 2500/fps;
  let slowBoy;

  let cover = new Image();
  cover.src = './assets/images/INTRO.png';





  const playgame = new Game(gameCtx, budgieGame, bkgd1Ctx, bkgd2Ctx, groundCtx, Budgie, zebra,  start, beginGame);
  playgame.farbkgdDraw(bkgd1Ctx);
  playgame.nearbkgdDraw(bkgd2Ctx);
  playgame.groundDraw(groundCtx);
  playgame.gameOver();



  function start() {
    if (playgame.defeated === false) {
      window.requestAnimationFrame(start);
      playgame.gameOver();

      playgame.started = true;
      // console.log("hoochimama")
      addClass(document.getElementById("intro"), "hidden");
      now = Date.now();
      // playgame.raiseScore();
      slowBoy = now - then;
      if (slowBoy > interval) {
        gameCtx.clearRect(0, 0, 224, 98);
        playgame.keepScore();
        Budgie.draw(gameCtx);
        Budgie.jumpListener();
        zebra.draw(gameCtx);
        then = now - (slowBoy % interval);
      }
    }


  }


    function beginGame() {


      if (playgame.defeated === false) {
        playgame.startScore();
        budgieGame.removeEventListener('click', beginGame);
      }
    } 

  // budgieGame.addEventListener('click', start );
  document.getElementById("intro").addEventListener("click", start)



});

// Utility Functions

function hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}
