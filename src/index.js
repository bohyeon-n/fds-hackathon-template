class TicTacToe {
  init() {
    this.board = [[null, null, null], [null, null, null], [null, null, null]];
    this.player = "X";
  }
  // 상태?
  // - 게임판
  board = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null]];
  // - 현재 플레이어
  player = "X";
  // 동작?
  // - 턴
  turn({ row, col }) {
    // 현재 플레이어에 대한 표시를 게임판의 해당 위치에 넣어주고
    if(this.board[row][col] === null) {
      this.board[row][col] = this.player;
      // 현재 플레이어를 변경
      this.player = this.player === "X" ? "O" : "X";
    }
  }
  // - 누가 이겼는지 판별
  checkWinner() {
    if (
      this.board[0][0] != null &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      return this.board[0][0];
    }
    if (
      this.board[0][2] != null &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      return this.board[0][2];
    }
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] != null &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]
      ) {
        return this.board[i][0];
      } else if (
        this.board[0][i] != null &&
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i]
      ) {
        return this.board[0][i];
      } else if(
        this.isDraw() 
      ) {
        return 'the game ended in a tie!'
      }
    }
  }
  isDraw() {
    notNull = 0;
    for (let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(this.board[i][j] != null){
          notNull++
        }
      }
    }
    if(notNull === 9){
      return true
    }
  }
}
const game = new TicTacToe();
const rowEls = document.querySelectorAll(".board__row");
const modalEl = document.querySelector('.modal');
const txtEl = document.querySelector('.winner-txt');
rowEls.forEach((rowEl, rowIndex) => {
  const colEls = rowEl.querySelectorAll(".board__col");
  colEls.forEach((colEl, colIndex) => {
    colEl.addEventListener("click", e => {
      game.turn({ row: rowIndex, col: colIndex });
      e.target.textContent = game.board[rowIndex][colIndex];
      const message = game.checkWinner();
      if (message) {
        txtEl.textContent = message;
        modalEl.classList.add('end');
      }  
    });
  });
});
const btnEl = document.querySelector(".restart-btn");
btnEl.addEventListener("click", e => {
  game.init();
  document.querySelectorAll(".board__col").forEach(col => {
    col.textContent = "";
  });
  modalEl.classList.remove("end");
  txtEl.textContent ='';
});
