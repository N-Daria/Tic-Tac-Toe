window.addEventListener('load', game);

let board = document.getElementsByClassName('board__cell');

let players = ["X", "O"]
let activePlayer = 0;
let maxPossibleMarks = 9;
let currentMark = 0;

function game() {
  for (let i of board) {
    i.addEventListener('click', round);
  }
}

function round() {
  if (this.textContent === "") {
    this.textContent = players[activePlayer];
    if (checkWinner()) {
      showWinner();
      return;
    }

    activePlayer = Math.abs(activePlayer - 1);
    currentMark += 1;

    if (currentMark >= maxPossibleMarks) {
      showNoWinner();
    }
  }
}

function checkWinner() {
  let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i of combinations) {
    if (board[i[0]].textContent === board[i[1]].textContent
      && board[i[1]].textContent === board[i[2]].textContent
      && board[i[0]].textContent !== '') {
      return true
    }
  }
}

let winnerText = document.getElementsByClassName('page__text');

function showWinner() {
  winnerText[0].textContent = "Победили " + players[activePlayer];
  stopGame();
}

function showNoWinner() {
  winnerText[0].textContent = "Ничья";
  stopGame();
}

let resetButton = document.getElementsByClassName('board__button');
resetButton[0].addEventListener('click', reset);

function reset() {
  for (i = 0; i < 9; i++) {
    board[i].textContent = "";
  }
  activePlayer = 0;
  currentMark = 0;
  game();
}

function stopGame() {
  for (let i of board) {
    i.removeEventListener('click', round);
  }
}
