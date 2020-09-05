import { setGameMouseEvents } from './gameEvents.js';

const gameContainer = document.querySelector('.game');
let boardLength = 3;
let board;

function createGame() {
  //create pseudo board to check combinations
  board = [...new Array(boardLength)].map(() => [...new Array(boardLength)]);

  function createGameBox(rowIndex, boxIndex) {
    return `
        <div class="game__box"  data-row-index="${rowIndex}" data-box-index="${boxIndex}">
            <div class="game__element game__element--circle"></div>
            <div class="game__element game__element--cross"></div>
        </div>
      `;
  }

  function createGameRow(rowIndex) {
    return `
    <div class="game__row">
      ${createGameBoxes(rowIndex)}
    </div>
    `;
  }
  
  function createGameBoxes(rowIndex) {
    return (
      [...new Array(boardLength)].map((box, boxIndex) => {
        return createGameBox(rowIndex, boxIndex);
      }).join('')
    );
  }

  function createGameRows() {
    return (
      [...new Array(boardLength)].map((row, rowIndex) => {
        return createGameRow(rowIndex);
      }).join('')
    );
  }

  function createGameBoard() {
    return `
      <div class="game__board">
        ${createGameRows()}
      </div>
    `;
  }

  //create htmlGameGrid
  gameContainer.innerHTML = createGameBoard();

  //set events after html is created
  setGameMouseEvents();
}

export { boardLength, board, createGame };
