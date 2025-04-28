const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let board;
let currentPlayer;
let isGameActive;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initializeGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    gameBoard.innerHTML = '';
    createCells();
}

function createCells() {
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-index', index);
        cellElement.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const index = clickedCell.getAttribute('data-index');

    if (board[index] !== "" || !isGameActive) {
        return;
    }

    updateCell(clickedCell, index);
    checkResult();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (!board.includes("")) {
        statusText.textContent = "It's a draw!";
        isGameActive = false;
    } else {
        switchPlayer();
    }
}

restartBtn.addEventListener('click', initializeGame);

// Start the game when page loads
initializeGame();
