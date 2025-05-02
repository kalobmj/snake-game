const canvas = document.getElementById('canvas'); // canvas
const context = canvas.getContext('2d'); // canvas context
const playButton = document.getElementById('button') // play button
const cellSize = 30; // play with the size of this
const fps = 80; // try 70 60 100 etc...
const rows = 15; // 15 square long
const cols = 17; // 17 squares wide
const color1 = '#a2d149'; // light green
const color2 = '#8bb042'; // dark green
const snakeColor = '#3498db'; // blue
const appleColor = '#ff3636'; // red
let snakeLength = 1; // default snake length
let direction = ''; // 'right', 'left' etc...
let directionQueue = ''; // next move

let appleLocation = [];
let snakeLocation = [];

let score = 0;

// 2-4 possible locations for snake tail (up, right, down, left) in that order
let tailCoords = [
    { x: 0, y: -30 },
    { x: 30, y: 0 },
    { x: 0, y: 30 },
    { x: -30, y: 0 }
];

// game over... 😔
let gameOver = false;

// canvas dimensions
canvas.height = rows * cellSize;
canvas.width = cols * cellSize;

// nested for loops to create game board
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
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
    // if collision return true, else false
    if (x1 === x2 && y1 === y2) {
        return true;
    } else {
        return false;
    };
};

// takes coords and checks if the cell is outside the game board
function checkOutOfBounds(x, y) {
    if (x < 0 || y < 0 || x > (cols * cellSize) || y > (rows * cellSize)) {
        return false;
    } else {
        return true;
    };
};

// function to place snake on board
function makeSnake2() {
    let x1 = 4*cellSize;
    let y1 = 7*cellSize;

    createSquare(x1, y1, snakeColor);
    createSquare(x1+cellSize, y1, snakeColor);
    snakeLocation.push({x: x1, y: y1});
    snakeLocation.push({x: x1+cellSize, y: y1});
};

makeSnake2();

// function to move the snake
function moveSnake() {



};

// function to place apple on board (works at all times)
function makeApple() {
    let x1;
    let y1;
    let collision;

    do {
        collision = false;
        x1 = Math.floor(Math.random() * cols) * cellSize;
        y1 = Math.floor(Math.random() * rows) * cellSize;

        for (let i=0; i<snakeLocation.length; i++) {
            let x2 = snakeLocation[i].x;
            let y2 = snakeLocation[i].y;
            if (checkForCollisions(x1, y1, x2, y2)) {
                collision = true;
                break;
            }
        }
    } while (collision);

    createSquare(x1, y1, appleColor);
};

makeApple();
// setInterval(makeApple, 1);

// when user clicks play button, get snake going using snakeHead location (snakeLocation[0]) to test
playButton.addEventListener('click', () => {

    // coords of our snakeHead
    console.log(snakeLocation[0].x)
    console.log(snakeLocation[0].y)

});

if (gameOver) {
    // logic for if gameOver === true (player lost and game is over)
} else {
    // logic for when gameOver === false (game is still going)
    // setInterval(mainWrapperFunction, fps)
};
