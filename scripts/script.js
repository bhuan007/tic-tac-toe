//Module to start
const Game = (function () {
    //These arrays represent the selections for P1 and P2
    const gameBoard1 = [];
    const gameBoard2 = [];
    let gameStatus = true;
    let currentPlayer = 1;
    const status = document.querySelector(".status");
    const p1ScoreElement = document.querySelector(".p1Score");
    const p2ScoreElement = document.querySelector(".p2Score");
    const playAgainBtn = document.querySelector(".playAgainBtn");
    const gameMode = document.querySelector(".gameMode");
    status.textContent = `Player ${currentPlayer}'s turn`;
    let p1Score = 0;
    let p2Score = 0;

    const switchPlayer = () => {
        if (Game.currentPlayer == 1) {
            Game.currentPlayer = 2;
            status.textContent = `Player ${Game.currentPlayer}'s turn`;
        }
        else {
            Game.currentPlayer = 1;
            status.textContent = `Player ${Game.currentPlayer}'s turn`;
        }
    }


    return { gameBoard1, gameBoard2, switchPlayer, gameStatus, currentPlayer, statusBar: status, p1Score, p2Score, p1ScoreElement, p2ScoreElement, playAgainBtn, gameMode }
}());


//Factory Function
const Player = (name) => {
    return { name }
}

//When player clicks
function clickPlacement(num, playerNum) {
    const cell = document.querySelector(`[data-cell='${num}']`)
    if (cell.innerHTML != "X" && cell.innerHTML != "O") {
        if (playerNum == 1) {
            Game.gameBoard1.push(num);
            cell.innerHTML = "X";
            Game.switchPlayer();
        }
        else {
            Game.gameBoard2.push(num);
            cell.innerHTML = "O";
            Game.switchPlayer();
        }
    }

    
}

//This function will fire when a player clicks a corresponding cell
const Logic = (cellNum) => {
    if (Game.gameStatus) {
        clickPlacement(cellNum, Game.currentPlayer);
        checkWin();
    }

}

//Switches between main menu and play area
const menuToggle = (isMenu) => {
    const startMenu = document.querySelector(".startMenu");
    const playArea = document.querySelector(".playArea");

    if(isMenu){
        startMenu.style.display = "none";
        playArea.style.display = "block";
    }
    else {
        startMenu.style.display = "block";
        playArea.style.display = "none";
        restart();
    }
}

const resetCells = () => {
    Game.gameBoard1 = [];
    Game.gameBoard2 = [];
    Game.gameStatus = true;
    Game.currentPlayer = 1;
    Game.playAgainBtn.style.display = "none";
    for(let i = 0; i < 9; i++) {
        const cell = document.querySelector(`[data-cell='${i}']`)
        cell.innerHTML = "";
    }
}

const restart = () => {
    resetCells();
    Game.p1Score = 0;
    Game.p2Score = 0;
    Game.p1ScoreElement.textContent = Game.p1Score;
    Game.p2ScoreElement.textContent = Game.p2Score;

    Game.statusBar.textContent = `Player ${Game.currentPlayer}'s turn`;
}

const playAgain = () => {
    resetCells();
    Game.statusBar.textContent = `Player ${Game.currentPlayer}'s turn`;
    
}

//This function will check if the game is over and if a player won or tied
const checkWin = () => {
    const winningCells = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [6, 7, 8],
        [3, 4, 5],
        [1, 4, 7],
        [6, 4, 2],
        [2, 5, 8]];


    let count1 = 0;
    let count2 = 0;

    for (let i = 0; i < winningCells.length; i++) {
        for (let j = 0; j < Game.gameBoard1.length; j++) {
            if (winningCells[i].includes(Game.gameBoard1[j])) {
                count1++;
            }
            if (count1 == 3) {
                console.log("Player 1 Win");
                Game.statusBar.textContent = "Player 1 Wins!";
                Game.p1Score++;
                Game.p1ScoreElement.textContent = Game.p1Score;
                Game.gameStatus = false;
                Game.playAgainBtn.style.display = "block";

                break;
            }
        }
        for (let j = 0; j < Game.gameBoard2.length; j++) {
            if (winningCells[i].includes(Game.gameBoard2[j])) {
                count2++;
            }
            if (count2 == 3) {
                console.log("Player 2 Win");
                Game.statusBar.textContent = "Player 2 Wins!";
                Game.p2Score++;
                Game.p2ScoreElement.textContent = Game.p2Score;
                Game.gameStatus = false;
                Game.playAgainBtn.style.display = "block";
                break;
            }
        }
        count1 = 0;
        count2 = 0;
    }
}


