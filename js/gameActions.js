import { identifyWinner } from './gameLogics.js';
import { createGame } from './app.js';

const alert = document.querySelector('.alert');
const btnReload = document.querySelector('.btn__reload');
let isCross = true;


export function gameOver() {
  const game = document.querySelector('.game');

  //show alert and disabled game elements
  alert.classList.add('show');
  game.classList.add('game-over');
}

export function setGameEvents() {
  const boxes = document.querySelectorAll('.game__box');
  const game = document.querySelector('.game');
  

  btnReload.onclick = () => {
    alert.classList.remove('show');
    game.classList.add('game-reload');

    setTimeout(function() {
      createGame();
    }, 250); 
  };

  boxes.forEach((box) => {
    box.onmouseover = function () {
      if (this.classList.contains('selected')) {
        return false;
      } else if (isCross) {
        this.querySelector('.game__element--cross').classList.add('show');
      } else {
        this.querySelector('.game__element--circle').classList.add('show');
      }
    };

    box.onmouseleave = function () {
      if (this.classList.contains('selected')) {
        return false;
      } else if (isCross) {
        this.querySelector('.game__element--cross').classList.remove('show');
      } else {
        this.querySelector('.game__element--circle').classList.remove('show');
      }
    };

    box.onmousedown = function () {
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
    };
  });
}
