const canvas = document.getElementById('canvas'); // canvas
const context = canvas.getContext('2d'); // canvas context
const cellSize = 30; // play with the size of this
const fps = 80; // try 70 60 100 etc...
const rows = 15; // 15 square long
const cols = 17; // 17 squares wide
const color1 = '#a2d149'; // light green
const color2 = '#8bb042'; // dark green
const snakeLength = 2; // default snake length
const snakeColor = '#3498db'; // blue
const appleColor = '#ff3636'; // red
let direction = ''; // 'right', 'left' etc...
let directionQueue = ''; // next move

let appleLocation = [];
let snakeLocation = [];

let score = 0;

// game over... 😔
let gameOver = false;

// canvas dimensions
canvas.height = rows * cellSize;
canvas.width = cols * cellSize;

// nested for loops to create game board
for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++) {
        // var to determine if cell is even or odd
        const isEven = (i + j) % 2 === 0;
        context.fillStyle = isEven ? color1 : color2;
        context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
    }
};

// function to draw square
function createSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, cellSize, cellSize);
};

// function to check for collisions with 2 sets of coordinates
function checkForCollisions(x1, y1, x2, y2) {
    if (x1 === x2 && y1 === y2) {
        return true;
    } else {
        return false;
    };
};

// takes coords and checks if the cell is outside the game board
function checkOutOfBounds(x, y) {
    if (x < 0 || y < 0 || x > (cols*cellSize) || y > (rows*cellSize)) {
        return false;
    } else {
        return true;
    };
};

// get snake and apple on canvas (game ready before pressing play)
function makeApple() {
    let x1 = Math.floor(Math.random() * cols) * cellSize;
    let y1 = Math.floor(Math.random() * rows) * cellSize;
    // save location of the apple
    appleLocation.push({x: x1, y: y1})

    console.log({appleLocation})

    createSquare(x1, y1, appleColor);
};

// setInterval(makeApple, fps)
makeApple();

function makeSnake() {
    let len = snakeLength; // 2

    // random coords for snake heaad
    let x = Math.floor(Math.random() * cols) * cellSize;
    let y = Math.floor(Math.random() * rows) * cellSize;
    createSquare(x, y, snakeColor);

    // 2-4 possible locations for snake tail
    let tailCoords = [{x: 0, y: -30}, {x: 30, y: 0}, {x: 0, y: 30}, {x: -30, y: 0}];

    // up, right, down, left
    for (let i=0; i<tailCoords.length; i++) {
        // copy of original coordinates
        let x2 = x + tailCoords[i].x;
        let y2 = y + tailCoords[i].y;

        if (checkOutOfBounds(x2, y2)) {
            createSquare(x2, y2, snakeColor)
            return;
        };
    };
};

// setInterval(makeSnake, 2000);
makeSnake();

// snake will move automatically at game start. to move snake, test the 3 cells in each direction, if the direction only has one or less squares, do not start the game in that direction. if 3 or more squares in that direction, move the snake in that direction when user pressed game button.

if (gameOver) {
    // logic for if gameOver === true (player lost and game is over)
} else {
    // logic for when gameOver === false (game is still going)
    // setInterval(mainWrapperFunction, fps)
};
