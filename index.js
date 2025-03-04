const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const RED = '#FF0000';
const BOT = true;
let endGame = false;

const container = document.getElementById('fieldWrapper');
let field = [[2, 2, 2], [2, 2, 2], [2, 2, 2]]
let currentPlayer = 0;
let counter = 0;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}
function findWinner (winner) {
    return winner === 0 ? CROSS : ZERO;
}

function botTurn () {
    let arr = [];
    for (let i = 0; i < container.children.length; i++) {
        for (let j = 0; j < container.children[i].children.length; j++) {
            if (field[i][j] === 2){
                arr.push([i, j]);
            }
        }
    }
    for (let i of arr) {
        field[i[0]][i[1]] = 1;
        if (botCheck() === 1) {
            field[i[0]][i[1]] = 2;
            cellClickHandler(i[0], i[1]);
            return;
        }
        field[i[0]][i[1]] = 2;
    }
    let rnd = arr[Math.floor(Math.random() * arr.length)]
    cellClickHandler(rnd[0], rnd[1]);
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] !== 2 || endGame) {
        return;
    }
    field[row][col] = currentPlayer;
    renderSymbolInCell(currentPlayer == 0 ? CROSS : ZERO, row, col)
    currentPlayer = (currentPlayer + 1) % 2;
    counter++;
    const winner = checkWinner();
    if (winner !== 2) {
        setTimeout(() => {
            alert(winner === 0 ? CROSS : ZERO);
            endGame = true;
        })
    }
    else if (counter === 9) {
        setTimeout(() => {
            alert("Победила дружба");
            endGame = true;
        })
    }
    if (currentPlayer === 1 && BOT){
        botTurn();
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    field = [[2, 2, 2], [2, 2, 2], [2, 2, 2]];
    currentPlayer = 0;
    endGame = false;
    counter = 0;
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    console.log('reset!');
}

function checkWinner () {
    for (let i = 0; i < field.length; i++) {
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2] && field[i][0] !== 2) {
            let winner = findWinner(field[i][0]);
            renderSymbolInCell(winner, i, 0, RED);
            renderSymbolInCell(winner, i, 1, RED);
            renderSymbolInCell(winner, i, 2, RED);
            return field[i][0];
        }
    }

    for (let j = 0; j < field[0].length; j++) {
        if (field[0][j] === field[1][j] && field[1][j] === field[2][j] && field[0][j] !== 2) {
            let winner = findWinner(field[0][j]);
            renderSymbolInCell(winner, 0, j, RED);
            renderSymbolInCell(winner, 1, j, RED);
            renderSymbolInCell(winner, 2, j, RED);
            return field[0][j];
        }
    }

    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[0][0] !== 2) {
        let winner = findWinner(field[0][0]);
        renderSymbolInCell(winner, 0, 0, RED);
        renderSymbolInCell(winner, 1, 1, RED);
        renderSymbolInCell(winner, 2, 2, RED);
        return field[0][0];
    }
    if (field[0][2] === field[1][1] && field[1][1] === field[2][0] && field[0][2] !== 2) {
        let winner = findWinner(field[0][2]);
        renderSymbolInCell(winner, 0, 2, RED);
        renderSymbolInCell(winner, 1, 1, RED);
        renderSymbolInCell(winner, 2, 0, RED);
        return field[0][2];
    }
    return 2;
}


function botCheck () {
    for (let i = 0; i < field.length; i++) {
        if (field[i][0] === field[i][1] && field[i][1] === field[i][2] && field[i][0] !== 2) {
            return field[i][0];
        }
    }

    for (let j = 0; j < field[0].length; j++) {
        if (field[0][j] === field[1][j] && field[1][j] === field[2][j] && field[0][j] !== 2) {
            return field[0][j];
        }
    }

    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[0][0] !== 2) {
        return field[0][0];
    }
    if (field[0][2] === field[1][1] && field[1][1] === field[2][0] && field[0][2] !== 2) {
        return field[0][2];
    }
    return 2;
}

/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
