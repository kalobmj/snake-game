const canvas = document.getElementById('canvas'); // canvas
const context = canvas.getContext('2d'); // canvas context
const playButton = document.getElementById('button'); // play button
const userScore = document.getElementById('score'); // player score
const highScore = document.getElementById('high-score'); // high score
const cellSize = 30; // play with the size of this
const fps = 80; // try 70 60 100 etc...
const rows = 15; // 15 square long
const cols = 17; // 17 squares wide
const color1 = '#a2d149'; // light green
const color2 = '#8bb042'; // dark green
const snakeColor = '#3498db'; // blue
const appleColor = '#ff3636'; // red
let direction = 'right'; // defaults right, 'right', 'left' etc...
let directionQueue = ''; // next move
let appleLocation = []; // coordinates of apple
let snakeLocation = []; // coordinates of each cell of snake
let gameInterval; // setInterval to use for later
let gameRunning = false;
let score = 0;

// this will focus user on the canvas
canvas.setAttribute('tabindex', 1);
canvas.focus();

// 2-4 possible locations for snake tail (up, right, down, left) in that order
let directionCoords = [
    { x: 0, y: -cellSize },
    { x: cellSize, y: 0 },
    { x: 0, y: cellSize },
    { x: -cellSize, y: 0 }
];

// game over... 😔
let gameOver = false;

// canvas dimensions
canvas.height = rows * cellSize;
canvas.width = cols * cellSize;

// retrieving highScore from localStorage.. if it exists..
let storedHighScore = localStorage.getItem('high-score');

// if exists, update highScore to user
if (storedHighScore) {
    highScore.innerText = `high score: ${storedHighScore}`;
};

// function takes nested for loops to create game board
function makeBoard() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // var to determine if cell is even or odd
            const isEven = (i + j) % 2 === 0;
            context.fillStyle = isEven ? color1 : color2;
            context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
        }
    };
};

// makeBoard();

// function to draw square
function createSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, cellSize, cellSize);
};

// function to check for collisions with 2 sets of coordinates
function checkForCollisions(x1, y1, x2, y2) {
    // if collision return true, else false
    if (x1 === x2 && y1 === y2) {
        return true;
    } else {
        return false;
    };
};

// takes coords and checks if the cell is outside the game board
function checkOutOfBounds(x, y) {
    if (x < 0 || y < 0 || x >= (cols * cellSize) || y >= (rows * cellSize)) {
        return false;
    } else {
        return true;
    };
};

// function to place snake on board
function makeSnake() {
    let x1 = 4 * cellSize;
    let y1 = 7 * cellSize;

    console.log('checking snakeLocation in func');
    console.log({snakeLocation})

    createSquare(x1, y1, snakeColor);
    createSquare(x1 + cellSize, y1, snakeColor);
    snakeLocation.push({ x: x1 + cellSize, y: y1 }); // head
    snakeLocation.push({ x: x1, y: y1 }); // tail

    console.log({cellSize})
    console.log({snakeLocation})

};

// function to move the snake, it's already placed down at this point, 'right' is the default direction
function moveSnake() {
    console.log(`snake moving in ${direction} direction`);
    
    console.log({gameOver})

    // let snakeLocationCopy = [ ...snakeLocation ];

    // console.log('snakelocation copy: ', snakeLocationCopy);
    // console.log({snakeLocationCopy})

    // coords of snakeHead
    let x1 = snakeLocation[0].x;
    let y1 = snakeLocation[0].y;

    console.log('coords pre change')
    console.log({x1})
    console.log({y1})
    
    if (direction === 'right') {
        x1 += directionCoords[1].x;
    } else if (direction === 'left') {
        x1 += directionCoords[3].x;
    } else if (direction === 'up') {
        y1 += directionCoords[0].y;
    } else if (direction === 'down') {
        y1 += directionCoords[2].y;
    };
    
    console.log('coords post change')
    console.log({x1})
    console.log({y1})

    // if snakehead is out of bounds, end the game 😈
    if (!checkOutOfBounds(x1, y1)) {
        gameOver = true;
    };
    checkGameStatus();

    // copy of tail for later
    let oldTail = { ...snakeLocation[snakeLocation.length - 1] };

    // tail we will work with
    let tail = snakeLocation.pop();

    // update tail with new coords for head (new head)
    tail.x = x1;
    tail.y = y1;

    // checking for body collisions
    for (let i = 0; i < snakeLocation.length; i++) {
        if (checkForCollisions(snakeLocation[i].x, snakeLocation[i].y, tail.x, tail.y)) {
            gameOver = true;
            checkGameStatus();
        }
    };

    // if else statement for if snakeHead hits an apple
    if (checkForCollisions(tail.x, tail.y, appleLocation[0].x, appleLocation[0].y)) {
        snakeLocation.unshift(tail);
        snakeLocation.push(oldTail);
        score++;
        userScore.innerText = `score: ${score}`;
        makeApple();
    } else {
        snakeLocation.unshift(tail);
    };

    // coloring in new snake
    for (let i = 0; i < snakeLocation.length; i++) {
        createSquare(snakeLocation[i].x, snakeLocation[i].y, snakeColor)
    };

    // color old tail
    const isEven = ((oldTail.x + oldTail.y) / cellSize) % 2 === 0;
    const color = isEven ? color1 : color2;
    createSquare(oldTail.x, oldTail.y, color);

    console.log('moveSnake ended');
};

// function to place apple on board (works at all times)
function makeApple() {
    let x1, y1, collision;

    do {
        collision = false;
        x1 = Math.floor(Math.random() * cols) * cellSize;
        y1 = Math.floor(Math.random() * rows) * cellSize;

        for (let i = 0; i < snakeLocation.length; i++) {
            let x2 = snakeLocation[i].x;
            let y2 = snakeLocation[i].y;
            if (checkForCollisions(x1, y1, x2, y2)) {
                collision = true;
                break;
            }
        }
    } while (collision);

    appleLocation = [{ x: x1, y: y1 }];
    createSquare(x1, y1, appleColor);
};

// board addEventListener for when user pressed arrow keys
canvas.addEventListener('keydown', (e) => {

    if (gameRunning) {
        if (e.key === 'ArrowRight' && direction != 'left') {
            console.log('right arrow key pressed');
            direction = 'right';
        } else if (e.key === 'ArrowLeft' && direction != 'right') {
            console.log('left arrow key pressed');
            direction = 'left';
        } else if (e.key === 'ArrowUp' && direction != 'down') {
            console.log('up arrow key pressed');
            direction = 'up';
        } else if (e.key === 'ArrowDown' && direction != 'up') {
            console.log('down arrow key pressed');
            direction = 'down';
        };
    };

});

// play button addEventListener
playButton.addEventListener('click', () => {

    // if (gameRunning) {
    //     return;
    // };

    // context.reset();

    canvas.focus();

    // this below gets the game going again, but its broken
    endGame();
    setupGame();


    // interval here
    gameInterval = setInterval(runGame, fps)
    // setInterval(checkGameStatus, 1000)
});

// get game ready
function setupGame() {
    makeBoard();
    console.log({snakeLocation}); // is empty at this point
    console.log(snakeLocation.length)
    makeSnake();
    makeApple();
    score = 0;
    console.log({snakeLocation});
};

// start game
function runGame() {

    gameRunning = true;
    moveSnake();
    checkGameStatus();

};

// end game 
function endGame() {

    // clear interval here
    clearInterval(gameInterval);
    gameOver = false;
    gameRunning = false;
    direction = 'right';
    score = 0;
    // appleLocation = [];
    // snakeLocation = [];
    snakeLocation.length = 0;
    appleLocation.length = 0;
    setupGame();

};

// checks if game is over or not 😏
function checkGameStatus() {
    if (gameOver) {
        if (score > storedHighScore) {
            highScore.innerText = `high score: ${score}`
            localStorage.setItem('high-score', score)
        };
        endGame();
        // window.location.reload();
    } else {
        // logic for when gameOver === false (game is still going)
        // setInterval(mainWrapperFunction, fps)
    };
};

setupGame();
