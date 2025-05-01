const canvas = document.getElementById('canvas'); // canvas
const context = canvas.getContext('2d'); // canvas context
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
    // if collision return true, else false
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

    // create logic to check collision for the entire snake body, the apple cannot spwan on top of the snakes body.

    // snake length at start is 1, so this is the beginning of the game
    if (snakeLength === 1) {

        let x1 = Math.floor(Math.random() * cols) * cellSize;
        let y1 = Math.floor(Math.random() * rows) * cellSize;
        // save location of the apple
        appleLocation.push({x: x1, y: y1})

        console.log({appleLocation})

        createSquare(x1, y1, appleColor);

    } else {
        // logic to loop through snake location, since snakeLocation arr should be over 1 length
        let x1 = Math.floor(Math.random() * cols) * cellSize;
        let y1 = Math.floor(Math.random() * rows) * cellSize;

        let count = 0;

        // for loop through snakes location
        for (let i=0; i<snakeLocation.length; i++) {
            let x2 = snakeLocation[i].x;
            let y2 = snakeLocation[i].y;
            if (!checkForCollisions(x1, y1, x2, y2)) {
                count++
                // appleLocation.push({x: x1, y: y1})
                // console.log({appleLocation})
                // createSquare(x1, y1, appleColor);
                // return;
            }
        } // end for loop
        if (count === snakeLocation.length) {
            appleLocation.push({x: x1, y: y1})
            console.log({appleLocation})
            createSquare(x1, y1, appleColor);
            return;
        } else {
            makeApple();
        }
    };

    // let x1 = Math.floor(Math.random() * cols) * cellSize;
    // let y1 = Math.floor(Math.random() * rows) * cellSize;
    // // save location of the apple
    // appleLocation.push({x: x1, y: y1})

    // console.log({appleLocation})

    // createSquare(x1, y1, appleColor);
};

// setInterval(makeApple, fps)
makeApple();

// snake is going over apple

// creates snake with 2 length, does not add to existing snake
function makeSnake() {
    let len = snakeLength; // 1

    // location of apple, test if tail will go over the apple
    let appleX = appleLocation[0].x;
    let appleY = appleLocation[0].y;

    // random coords for snake head
    let x1 = Math.floor(Math.random() * cols) * cellSize;
    let y1 = Math.floor(Math.random() * rows) * cellSize;

    // if snakeHead is not out of bounds, and not on top of the current apple
    if (checkOutOfBounds(x1, y1) && !checkForCollisions(x1, y1, appleX, appleY)) {



    };

    createSquare(x1, y1, snakeColor);
    // push head of snake to snakeLocation
    snakeLocation.push({x: x1, y: y1});

    // 2-4 possible locations for snake tail
    let tailCoords = [{x: 0, y: -30}, {x: 30, y: 0}, {x: 0, y: 30}, {x: -30, y: 0}];

    // up, right, down, left
    for (let i=0; i<tailCoords.length; i++) {
        // copy of original coordinates
        let x2 = x1 + tailCoords[i].x;
        let y2 = y1 + tailCoords[i].y;


        // checking if current cell is not out of bounds, and if cell is not the same as the apple
        if (checkOutOfBounds(x2, y2) && !checkForCollisions(x2, y2, appleX, appleY)) {
            createSquare(x2, y2, snakeColor)
            snakeLocation.push({x: x2, y: y2});
            console.log({snakeLocation})
            len++
            snakeLength = len;
            return;
        };
    };
};

// setInterval(makeSnake, 2000);
// setInterval(window.location.reload(), 5000)
makeSnake();

// snake will move automatically at game start. to move snake, test the 3 cells in each direction, if the direction only has one or less squares, do not start the game in that direction. if 3 or more squares in that direction, move the snake in that direction when user pressed game button.

if (gameOver) {
    // logic for if gameOver === true (player lost and game is over)
} else {
    // logic for when gameOver === false (game is still going)
    // setInterval(mainWrapperFunction, fps)
};
