import {setGameEvents} from './gameActions.js';

//set board size (can be changed)
export let boardLength = 3;
export let board;

export function createGame() {
  const mainLayout = document.querySelector('.main-layout');

  //create board
  board = new Array(boardLength)

  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(3);
  }


  
  function createBoxes(boardLength, j) {
    let gameBoxes = [];

    for (let i = 0; i < boardLength; i++) {
      let gameBox = `
        <div class="game__box"  x="${i}" y="${j}">
            <div class="game__element game__element--circle"></div>
            <div class="game__element game__element--cross"></div>
        </div>
      `;
      gameBoxes.push(gameBox);
    }

    return gameBoxes;
  }

  function createRows(boardLength) {
    let gameRows = [];

    for (let j = 0; j < boardLength; j++) {
      let gameRow = `
        <div class="game__row">
          ${createBoxes(boardLength, j).join('')}
        </div>
      `;
      gameRows.push(gameRow);
    }

    return gameRows;
  }

  function createGameBoard() {
    let markup = `
      <div class="game">
        ${createRows(boardLength).join('')}
      </div>
    `;
    return markup;
  }

  const markup = createGameBoard();

  //create htmlGameGrid
  mainLayout.innerHTML = markup;

  //set events
  setGameEvents();

}

document.body.onload = createGame;


