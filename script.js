// Author: Nevil Patel, 000892482

 // Size of the Tic Tac Toe Block (3x3)
let gameSize = 3;
// It represents the game Block as a 2D array
let gameSquare = []; 
 // Current player ('Blue' or 'Red')
let currentPlayer = 'Blue';
 // Indicates if the game has ended
let gameEnded = false;
 // Number of steps taken by Red
let redSteps = 0;
// Number of steps taken by Blue
let blueSteps = 0; 

function applyColor() {
    const colorInput = document.getElementById('color');
    const chosenColor = colorInput.value.toLowerCase();

    if (chosenColor === 'blue' || chosenColor === 'red') {
        // It update the currentPlayer with the chosen color
        currentPlayer = chosenColor; 
        alert(`You have chosen ${currentPlayer} color.`);
    } else {
        alert('Invalid color! Please enter "Blue" or "Red".');
    }
}

// Function to Start game on the block
function startGame() {
    gameSquare = [];
for (let row = 0; row < gameSize; row++) {
    const rowArray = [];
    for (let col = 0; col < gameSize; col++) {
        rowArray.push('');
    }
    gameSquare.push(rowArray);
}
    const gameSvg = document.getElementById('gameSquare');
    gameSvg.innerHTML = ''; // It clears the previous block

    // It create blocks in the main block.
    for (let row = 0; row < gameSize; row++) {
        for (let col = 0; col < gameSize; col++) {
            const blocks = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            blocks.setAttribute('x', col * 100);
            blocks.setAttribute('y', row * 100);
            blocks.setAttribute('width', 100);
            blocks.setAttribute('height', 100);
            blocks.setAttribute('class', 'blocks');
            blocks.setAttribute('data-row', row);
            blocks.setAttribute('data-col', col);
            blocks.addEventListener('click', blockClick);
            gameSvg.appendChild(blocks);
        }
    }
}

// Function to check for a win or draw
function gameResult() {
    // It check rows of block
    for (let i = 0; i < gameSize; i++) {
        if (gameSquare[i][0] !== '' && gameSquare[i][0] === gameSquare[i][1] && gameSquare[i][1] === gameSquare[i][2]) {
            // Return the winner ('Blue' or 'Red')
            return gameSquare[i][0]; 
        }
    }

    // It check columns of block
    for (let i = 0; i < gameSize; i++) {
        if (gameSquare[0][i] !== '' && gameSquare[0][i] === gameSquare[1][i] && gameSquare[1][i] === gameSquare[2][i]) {
            // Return the winner ('Blue' or 'Red')
            return gameSquare[0][i];
        }
    }

    // It check diagonals of block
    if (gameSquare[0][0] !== '' && gameSquare[0][0] === gameSquare[1][1] && gameSquare[1][1] === gameSquare[2][2]) {
        // Return the winner ('Blue' or 'Red')
        return gameSquare[0][0];
    }

    if (gameSquare[0][2] !== '' && gameSquare[0][2] === gameSquare[1][1] && gameSquare[1][1] === gameSquare[2][0]) {
        // Return the winner ('Blue' or 'Red')
        return gameSquare[0][2]; 
    }

    // It check for a draw game
    /*
      I learned flat function from https://www.w3schools.com/jsref/jsref_array_flat.asp
      and includes function from https://www.w3schools.com/jsref/jsref_includes_array.asp
      because both function are easy to manage arrays instead of using multiple for loop and if-else statement
    */ 
    if (!gameSquare.flat().includes('')) {
        // Return 'draw' if all cells are filled
        return 'draw'; 
    }
     // Return null if the game is still ongoing
    return null;
}

// Function to manage block clicks
function blockClick(event) {
    const blocks = event.target;
    const row = parseInt(blocks.getAttribute('data-row'));
    const col = parseInt(blocks.getAttribute('data-col'));

    if (blocks.style.fill === '' && !gameEnded) {
        if (currentPlayer === 'Blue') {
            blocks.style.fill = 'Blue';
        } else {
            blocks.style.fill = 'Red';
        }        
        gameSquare[row][col] = currentPlayer;

        if (currentPlayer === 'Blue') {
            blueSteps++;
            document.getElementById('blueSteps').textContent = blueSteps;
        } else {
            redSteps++;
            document.getElementById('redSteps').textContent = redSteps;
        }

        const result = gameResult();

        if (result === 'draw') {
            setTimeout(function() {
                alert('It is a draw!');
                gameEnded = true;
            }, 100);
        } else if (result) {
            setTimeout(function() {
                alert(`${result} player wins!`);
                gameEnded = true;
            }, 100);
        } else {
            if (currentPlayer === 'Blue') {
                currentPlayer = 'Red';
            } else {
                currentPlayer = 'Blue';
            }
        }
    }
}

// Function to start a new game
function startNewGame() {
    const blocks = document.querySelectorAll('.blocks');
    blocks.forEach(function(block) {
        block.style.fill = ''; // Reset the fill color of all cells
    });

    currentPlayer = 'Blue';
    gameEnded = false;
    redSteps = 0;
    blueSteps = 0;
    document.getElementById('redSteps').textContent = redSteps;
    document.getElementById('blueSteps').textContent = blueSteps;
}

// event listener for the New Game button and Apply Color Button
const newGameBtn = document.getElementById('restartButton');
newGameBtn.addEventListener('click', startNewGame);
const applyColorBtn = document.getElementById('chooseColor');
applyColorBtn.addEventListener('click', applyColor);

// Call the function to initialize the board when the page loads
startGame();
