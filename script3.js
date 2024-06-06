const cells = document.querySelectorAll('.cell');
const newGameButton = document.getElementById('new-game');
const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

newGameButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = ''; // Clear the cell content
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        setTimeout(() => alert(`${currentClass.toUpperCase()} Wins!`), 200);
        startGame();
    } else if (isDraw()) {
        setTimeout(() => alert('Draw!'), 200);
        startGame();
    } else {
        swapTurns();
        if (oTurn) {
            setTimeout(aiMove, 500); // Delay AI move slightly for better UX
        }
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase(); // Add 'X' or 'O' to the cell content
}

function swapTurns() {
    oTurn = !oTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function aiMove() {
    const availableCells = [...cells].filter(cell => 
        !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS));
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    placeMark(randomCell, O_CLASS);
    if (checkWin(O_CLASS)) {
        setTimeout(() => alert('O Wins!'), 200);
        startGame();
    } else if (isDraw()) {
        setTimeout(() => alert('Draw!'), 200);
        startGame();
    } else {
        swapTurns();
    }
}
