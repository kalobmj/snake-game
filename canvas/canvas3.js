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
let direction = 'right'; // defaults right, 'right', 'left' etc...
let directionQueue = ''; // next move

let appleLocation = [];
let snakeLocation = [];

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

// console.log(directionCoords)

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

    console.log({snakeLocation})
};

makeSnake2();

// snake is not moving on first right-arrow

// function to move the snake, it's already placed down at this point, 'right' is the default direction
function moveSnake() {
    console.log('snake moving')

    console.log({snakeLocation})

    // coords of snakeHead
    let x1 = snakeLocation[0].x;
    let y1 = snakeLocation[0].y;

    console.log({x1})
    console.log({y1})

    // if current direction is right
    if (direction === 'right') {
        
        // increasing x by cellsize (30)
        x1+=directionCoords[1].x;

    };

    console.log({snakeLocation})
    console.log('snake elem 1', snakeLocation[0]) // 
    console.log('snake elem 2', snakeLocation[1])

    // get current tail and save it, so we can use its coords to color the board color
    let oldTail = snakeLocation[snakeLocation.length-1];
    console.log({oldTail})

    // tail is last element of snakelocation, using pop removes it
    let tail = snakeLocation.pop();

    console.log({tail})

    // update tail with new coords for head (new head)
    tail.x = x1;
    tail.y = y1;
    // take tail (new head) and add it to the beginning of snakeLength array
    snakeLocation.unshift(tail);

    for (let i=0; i<snakeLocation.length; i++) {
        createSquare(snakeLocation[i].x, snakeLocation[i].y, snakeColor)
    }

    const isEven = ((oldTail.x + oldTail.y) / cellSize) % 2 === 0;

    console.log({isEven})

    const color = isEven ? color1 : color2;

    // this is coloring the old tail a board green color, depending if its on an even or odd cell (this is why we keep track of the old tail before we pop it)

    console.log(oldTail.x)
    console.log(oldTail.y)

    createSquare(oldTail.x, oldTail.y, color)

    console.log({snakeLocation});

    console.log('moveSnake ended')

    // directionQueue will be user last input, 
    
    // V you only need to update the head V
    // the tail = last elem
    // take that last elem using .pop(), give it the updated x and y vals
    // then take that tail and move it to the front with updated vals using .unshift().
    // doing all of this will remove the tail, and add the moved coords for the new head, the rest will remain the same and don't need changing...
    
};

// setInterval(moveSnake, 2000)

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

// below will be the logic for taking user input (arrow keys) and adding the correct direction, updating direction queue and moving the snake in the current direction

// addEventListener for canvas tracking keydowns

// ArrowLeft, ArrowUp, ArrowDown, ArrowRight
canvas.addEventListener('keydown', (e) => {

    if (e.key === 'ArrowRight') {
        console.log('right arrow key pressed');
        // logic for user pressing right arrow key
        direction = 'right'
        moveSnake()
    }
    // if (e.key === 'ArrowLeft') {
    //     console.log('left arrow key pressed');
    //     // logic for user pressing right arrow key
    //     direction = 'left'
    //     moveSnake(direction)
    // }
    // if (e.key === 'ArrowUp') {
    //     console.log('up arrow key pressed');
    //     // logic for user pressing right arrow key
    //     direction = 'up'
    //     moveSnake(direction)
    // }
    // if (e.key === 'ArrowDown') {
    //     console.log('down arrow key pressed');
    //     // logic for user pressing right arrow key
    //     direction = 'down'
    //     moveSnake(direction)
    // }

});

// when user clicks play button, get snake going using snakeHead location (snakeLocation[0]) to test
playButton.addEventListener('click', () => {

    // coords of our snakeHead
    console.log(snakeLocation[0].x)
    console.log(snakeLocation[0].y)

    setInterval(moveSnake, 1000)

});

if (gameOver) {
    // logic for if gameOver === true (player lost and game is over)
    // window.location.reload()
} else {
    // logic for when gameOver === false (game is still going)
    // setInterval(mainWrapperFunction, fps)
};
