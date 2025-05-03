const canvas = document.getElementById('canvas'); // canvas
const context = canvas.getContext('2d'); // canvas context
const playButton = document.getElementById('button'); // play button
const userScore = document.getElementById('score'); // player score
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
    if (x < 0 || y < 0 || x >= (cols * cellSize) || y >= (rows * cellSize)) {
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
    snakeLocation.push({x: x1+cellSize, y: y1}); // head
    snakeLocation.push({x: x1, y: y1}); // tail
};

makeSnake2();

// function to move the snake, it's already placed down at this point, 'right' is the default direction
function moveSnake() {
    console.log('snake moving');
    console.log(`snake moving in ${direction} direction`);

    console.log({snakeLocation})

    // coords of snakeHead
    let x1 = snakeLocation[0].x;
    let y1 = snakeLocation[0].y;

    if (direction === 'right') {
        x1+=directionCoords[1].x;
    } else if (direction === 'left') {
        x1+=directionCoords[3].x;
    } else if (direction === 'up') {
        y1+=directionCoords[0].y;
    } else if (direction === 'down') {
        y1+=directionCoords[2].y;
    };

    // if snakehead is out of bounds, end the game 😈
    if (!checkOutOfBounds(x1, y1)) {
        gameOver = true;
    };
    checkGameStatus();

    // since 

    // get current tail and save it, so we can use its coords to color the board color
    let oldTail = { ...snakeLocation[snakeLocation.length - 1] };

    // tail is last element of snakelocation, using pop removes it
    let tail = snakeLocation.pop();

    // update tail with new coords for head (new head)
    tail.x = x1;
    tail.y = y1;

    // at this point we have an updated tail (the new head), and we have a copy of the old tail.
    // we will do a check to see if our tail (new head) collides with our current fruit coordinates

    // checking for body collisions

    for (let i=0; i<snakeLocation.length; i++) {
        if (checkForCollisions(snakeLocation[i].x, snakeLocation[i].y, tail.x, tail.y)) {
            gameOver = true;
            checkGameStatus();
        }
    };
    
    // if new head takes place of fruit, we will continue to add it to the front, but keep our old tail (this is how the snake grows)
    // if not, we will just keep the code as it is already

    if (checkForCollisions(tail.x, tail.y, appleLocation[0].x, appleLocation[0].y)) {
        // if new head is on a fruit spot, add the tail to the front consuming the fruit
        snakeLocation.unshift(tail);
        // push the old tail so that the snake grows by one cell
        snakeLocation.push(oldTail);
        score++;
        userScore.innerText = `score: ${score}`;
        makeApple();
    } else {
        // if new head is not on a fruit spot, just add the tail to the front
        snakeLocation.unshift(tail);
    };

    // // take tail (new head) and add it to the beginning of snakeLocation array
    // snakeLocation.unshift(tail);

    // coloring in new snake && checking for body collisions
    for (let i=0; i<snakeLocation.length; i++) {
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

        for (let i=0; i<snakeLocation.length; i++) {
            let x2 = snakeLocation[i].x;
            let y2 = snakeLocation[i].y;
            if (checkForCollisions(x1, y1, x2, y2)) {
                collision = true;
                break;
            }
        }
    } while (collision);

    appleLocation = [{x: x1, y: y1}];
    createSquare(x1, y1, appleColor);
};

makeApple();

// board addEventListener ArrowLeft, ArrowUp, ArrowDown, ArrowRight
canvas.addEventListener('keydown', (e) => {
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
});

// possibly wrap all game running functions in one func, and ending game functions in one func

// add more to fps to slow it down

// need to work on snake colliding with it's own body

// when user clicks play button, get snake going using snakeHead location (snakeLocation[0]) to test
playButton.addEventListener('click', () => {

    // coords of our snakeHead
    console.log(snakeLocation[0].x);
    console.log(snakeLocation[0].y);

    console.log({appleLocation})

    console.log(appleLocation[0].x);
    console.log(appleLocation[0].y);

    canvas.focus();

    setInterval(moveSnake, fps)
    setInterval(checkGameStatus, 1000)

});

// checks if game is over or not
function checkGameStatus() {
    if (gameOver) {
        // logic for if gameOver === true (player lost and game is over)

        // in future we will not be using window reload, will have a game over screen and button for user to press to restart game...
        window.location.reload();

    } else {
        // logic for when gameOver === false (game is still going)
        // setInterval(mainWrapperFunction, fps)
    };
};
