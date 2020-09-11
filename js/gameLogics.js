import { gameOver } from './gameEvents.js';
import { boardLength, board } from './createGame.js';

//set board length (can be changed)
//and board will be reconstructed. but view is not so good

export function identifyWinner(_self) {
  let rowIndex = _self.dataset.rowIndex;
  let boxIndex = _self.dataset.boxIndex;
  //c means cross
  //z means zero
  //cx means 'X' counter for x coordinate line
  //zx means '0' counter for x coordinate line
  let cx = 0;
  let cy = 0;
  let cDiagL = 0;
  let cDiagR = 0;
  let zx = 0;
  let zy = 0;
  let zDiagL = 0;
  let zDiagR = 0;
  let isEmpty = 0;

  //paste 'X' or '0' in board array
  _self.getAttribute('cross') === 'true'
    ? board[rowIndex].splice(boxIndex, 1, 'X')
    : board[rowIndex].splice(boxIndex, 1, '0');

  //check win combination
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      //x
      board[j][i] === 'X' ? cx++ : (cx = 0);
      board[j][i] === '0' ? zx++ : (zx = 0);

      //y
      board[i][j] === 'X' ? cy++ : (cy = 0);
      board[i][j] === '0' ? zy++ : (zy = 0);

      //diagL
      board[i][j] === 'X' && i === j ? cDiagL++ : 0;
      board[i][j] === '0' && i === j ? zDiagL++ : 0;

      //diagR
      board[i][j] === 'X' && i + j === boardLength - 1 ? cDiagR++ : 0;
      board[i][j] === '0' && i + j === boardLength - 1 ? zDiagR++ : 0;
    }

    //check if array have empty elements
    board[i].includes(undefined) ? isEmpty++ : 0;

    //console.log('cx ' + cx, 'cy ' + cy, 'zx ' + zx, 'zy ' + zy);
    //console.log('cDiagL ' + cDiagL, 'cDiagR ' + cDiagR, 'zDiagL ' + zDiagL, 'zDiagR ' + zDiagR);

    [cx, cy, zx, zy, cDiagL, cDiagR, zDiagL, zDiagR].forEach(param => {
        if(param === boardLength) gameOver();
    });
  }
  if (isEmpty === 0) gameOver();
}
