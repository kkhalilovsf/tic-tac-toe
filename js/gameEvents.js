import { identifyWinner } from './gameLogics.js';
import { createGame } from './createGame.js';

let isCross = true;

function toggleAlert(toggle) {
  document.querySelector('.alert').classList.toggle('show', toggle);
};

function gameReload() {
  document.querySelector('.game__board').classList.add('game-reload'); 
}

function gameOver() {
  document.querySelector('.game__board').classList.toggle('game-over');

  toggleAlert(true);
}

function setGameMouseEvents() {
  //reload btn
  document.querySelector('.btn__reload__game').addEventListener('click', function() {
    
    gameReload();
    toggleAlert(false);

    setTimeout(function () {
      createGame();
    }, 250);
  });

  //set events to game elements(boxes)
  document.querySelectorAll('.game__box').forEach((box) => {
    box.addEventListener('mouseover', function() {
      if (this.classList.contains('selected')) {
        return false;
      } else if (isCross) {
        this.querySelector('.game__element--cross').classList.add('show');
      } else {
        this.querySelector('.game__element--circle').classList.add('show');
      }
    });

    box.addEventListener('mouseleave', function() {
      if (this.classList.contains('selected')) {
        return false;
      } else if (isCross) {
        this.querySelector('.game__element--cross').classList.remove('show');
      } else {
        this.querySelector('.game__element--circle').classList.remove('show');
      }
    });

    box.addEventListener('mousedown', function() {
      let _self = this;

      if (this.classList.contains('selected')) {
        return false;
      } else if (isCross) {
        this.querySelector('.game__element--cross').classList.add('show');
        this.classList.add('selected');
        this.setAttribute('cross', isCross);

        identifyWinner(_self, isCross);

        return (isCross = false);
      } else {
        this.querySelector('.game__element--circle').classList.add('show');
        this.classList.add('selected');
        this.setAttribute('cross', isCross);

        identifyWinner(_self, isCross);

        return (isCross = true);
      }
    });
  });
}

export { gameOver, setGameMouseEvents };