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

// get snake and apple on canvas (game ready before pressing play)

function makeApple() {

    console.log({rows})
    console.log({cols})

    let x = Math.floor(Math.random() * cols) * cellSize;
    let y = Math.floor(Math.random() * rows) * cellSize;
    // let y = Math.floor(Math.random(cols * cellSize));

    console.log({x})
    console.log({y})
    console.log({cellSize})

    createSquare(x, y, appleColor);
};

// setInterval(makeApple, fps)

makeApple();


if (gameOver) {
    // logic for if gameOver === true (player lost and game is over)
} else {
    // logic for when gameOver === false (game is still going)
    // setInterval(mainWrapperFunction, fps)
};