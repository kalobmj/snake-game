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

// get snake and apple on canvas (game ready before pressing play)
function makeApple() {

    // create logic to check collision for the entire snake body, the apple cannot spwan on top of the snakes body.

    // snake length at start is 1, so this is the beginning of the game
    if (snakeLength === 1) {

        let x1 = Math.floor(Math.random() * cols) * cellSize;
        let y1 = Math.floor(Math.random() * rows) * cellSize;
        // save location of the apple
        appleLocation.push({ x: x1, y: y1 })

        console.log({ appleLocation })

        createSquare(x1, y1, appleColor);

    } else {
        // logic to loop through snake location, since snakeLocation arr should be over 1 length
        let x1 = Math.floor(Math.random() * cols) * cellSize;
        let y1 = Math.floor(Math.random() * rows) * cellSize;

        let count = 0;

        // for loop through snakes location
        for (let i = 0; i < snakeLocation.length; i++) {
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
            appleLocation.push({ x: x1, y: y1 })
            console.log({ appleLocation })
            createSquare(x1, y1, appleColor);
            return;
        } else {
            makeApple();
        }
    };
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
        createSquare(x1, y1, snakeColor)

        // push head of snake to snakeLocation
        snakeLocation.push({ x: x1, y: y1 });

        console.log({ snakeLocation });

        // below is logic to add tail to snake head
        // need logic to determine if tail is on top of current apple
        // once our snakehead and snake tail and first apple are made, all we have to do is process the additions to the snake, and place a new apple that is not on top of the snake


        // up, right, down, left
        for (let i = 0; i < tailCoords.length; i++) {
            // copy of original coordinates
            let x2 = x1 + tailCoords[i].x;
            let y2 = y1 + tailCoords[i].y;

            // checking if current cell is not out of bounds, and if cell is not the same as the apple
            if (checkOutOfBounds(x2, y2) && !checkForCollisions(x2, y2, appleX, appleY)) {
                createSquare(x2, y2, snakeColor)
                snakeLocation.push({ x: x2, y: y2 });
                console.log({ snakeLocation })
                len++
                snakeLength = len;

                // getSnakeGoing()

                return;
            };
        };
    } else {
        // if snakeHead out of bounds, or snakeHead on top of current apple, rerun the function
        makeSnake();
    }

};

// setInterval(makeSnake, 2000);
// setInterval(window.location.reload(), 5000)
makeSnake();

// snake will move automatically at game start. to move snake, test the 3 cells in each direction, if the direction only has one or less squares, do not start the game in that direction. if 3 or more squares in that direction, move the snake in that direction when user pressed game button.

// function to begin moving snake when user presses play
function getSnakeGoing(x, y) {
    // test collisions for all paths. if 3 or more in one direction are clear, start the game in that direction
    // loop through directions

    // location of apple, test if tail will go over the apple
    let appleX = appleLocation[0].x;
    let appleY = appleLocation[0].y;

    for (let i = 0; i < tailCoords.length; i++) {
        // copy of original coordinates
        let x2 = x + tailCoords[i].x;
        let y2 = y + tailCoords[i].y;

        // checking if current cell is not out of bounds, and if cell is not the same as the apple
        if (checkOutOfBounds(x2, y2) && !checkForCollisions(x2, y2, appleX, appleY)) {
            // if cell is clear, check the next 2 spaces
            // next cell
            let x3 = x2 + tailCoords[i].x;
            let y3 = y2 + tailCoords[i].y;
            if (checkOutOfBounds(x3, y3) && !checkForCollisions(x3, y3, appleX, appleY)) {
                // next 2 cells
                let x4 = x3 + tailCoords[i].x;
                let y4 = y3 + tailCoords[i].y;
                if (checkOutOfBounds(x4, y4) && !checkForCollisions(x4, y4, appleX, appleY)) {

                    // logic for getting snake going
                    // can possibly use new snake moving function to get this going
                    console.log('next 3 cells are clear for snake to move')

                    console.log({ i })

                    if (i === 0) {
                        // if (direction.length === 0) {
                        //     console.log('up')
                        //     direction.push('up')
                        // }
                    } else if (i === 1) {
                        if (direction.length === 0) {
                            console.log('right')
                            direction = 'right'
                            // moveSnake()
                        }
                    } else if (i === 2) {
                        if (direction.length === 0) {
                            console.log('down')
                            direction = 'down'
                        }
                    } else if (i === 3) {
                        if (direction.length === 0) {
                            console.log('left')
                            direction = 'left'
                        }
                    }

                    // so far we are finding right directions but keep testing...

                    // console.log(i, 'this is our direction')
                }
            }
        };
    };
};

// function to move snake
function moveSnake(direction) {

    let newSnakeLocation = [];

    console.log({ snakeLocation })

    console.log({ direction })

    // cellSize = 30;
    // you need to recolor the behind cell when the snake moves
    // determine based on the coordinates, if its even or odd, then color the cell accordingly


    // this logic basically is: take current direction, loop through our snakeLocation array, create our new snake using updated coords. update our array after we are done looping. Then I guess just take the last tail off unless we hit an apple.

    // need to fix logic so when snake moves, it just doesn't move the entire body, the cell behind the head should take its heads last place

    if (direction === 'up') {
        for (let i = 0; i < snakeLocation.length; i++) {
            console.log('direction up, heres i: ', i)

            let currCellX = snakeLocation[i].x;
            let currCellY = snakeLocation[i].y;

            createSquare(currCellX + tailCoords[0].x, currCellY + tailCoords[0].y, snakeColor);

            let cellCols = currCellX / 30;
            let cellRows = currCellY / 30;

            const isEven = (cellCols + cellRows) % 2 === 0;

            context.fillStyle = isEven ? color1 : color2;
            context.fillRect(currCellX, currCellY, cellSize, cellSize)

            snakeLocation[i].x = currCellX + tailCoords[0].x;
            snakeLocation[i].y = currCellY + tailCoords[0].y;
        }
    };

    if (direction === 'right') {
        for (let i = 0; i < snakeLocation.length; i++) {
            console.log('direction right, heres i: ', i)

            // logic here will be:
            // if working with snake head (snakeLocation[0]), we will move the cell in that direction
            // every other cell of the snake will go into the postition of the cell that came before it, and so on..
            // last cell will become a part of the board. (light green or dark green)

            // snakeHead
            if (i === 0) {

                // current snakeHead coords
                let currCellX = snakeLocation[i].x;
                let currCellY = snakeLocation[i].y;

                // create new square moving to the right
                createSquare(currCellX + tailCoords[1].x, currCellY + tailCoords[1].y, snakeColor);

                // update current cell coordinates with updated one
                // snakeLocation[i].x = currCellX + tailCoords[1].x;
                // snakeLocation[i].y = currCellY + tailCoords[1].y;

                // get updated coordinates of snakeHead
                let x1 = currCellX + tailCoords[1].x;
                let y1 = currCellY + tailCoords[1].y;

                // push new snakeHead coordinates into our localSnakeLocation that will replace our global snakeLocation var
                newSnakeLocation.push({x: x1, y: y1})

            } else if (i === (snakeLocation.length - 1)) {

                // with our logic, all we have to do is extend the head of the snake by 1, and then cut off the tail by one, while keeping the rest the same. (we will continue to test this)
                // so here all we will do is change its color to green, push the location of the cell that came before it (head at start) to our new array since that is the tail moving.

                // get cols and rows numbers
                let cellCols = currCellX / 30;
                let cellRows = currCellY / 30;

                // check if even or odd
                const isEven = (cellCols + cellRows) % 2 === 0;

                // based on if cell is even or odd, color correctly
                context.fillStyle = isEven ? color1 : color2;
                context.fillRect(currCellX, currCellY, cellSize, cellSize)

                // // create square in cell position before it
                // createSquare(currCellX + tailCoords[1].x, currCellY + tailCoords[1].y, snakeColor);

                // here we push the location of the cell ahead of our ending (the head) to our new array, because that is our new ending.
                newSnakeLocation.push(snakeLocation[i-1].x, snakeLocation[i-1].y);

            } else {

                // the logic here is to update the middle of our snake. Pretty much all we will be doing is 
                
            }

            let currCellX = snakeLocation[i].x;
            let currCellY = snakeLocation[i].y;

            createSquare(currCellX + tailCoords[1].x, currCellY + tailCoords[1].y, snakeColor);

            let cellCols = currCellX / 30;
            let cellRows = currCellY / 30;

            const isEven = (cellCols + cellRows) % 2 === 0;

            context.fillStyle = isEven ? color1 : color2;
            context.fillRect(currCellX, currCellY, cellSize, cellSize)

            snakeLocation[i].x = currCellX + tailCoords[1].x;
            snakeLocation[i].y = currCellY + tailCoords[1].y;
        }
    };

    if (direction === 'down') {
        for (let i = 0; i < snakeLocation.length; i++) {
            console.log('direction down, heres i: ', i)

            let currCellX = snakeLocation[i].x;
            let currCellY = snakeLocation[i].y;

            createSquare(currCellX + tailCoords[2].x, currCellY + tailCoords[2].y, snakeColor);

            let cellCols = currCellX / 30;
            let cellRows = currCellY / 30;

            const isEven = (cellCols + cellRows) % 2 === 0;

            context.fillStyle = isEven ? color1 : color2;
            context.fillRect(currCellX, currCellY, cellSize, cellSize)

            snakeLocation[i].x = currCellX + tailCoords[2].x;
            snakeLocation[i].y = currCellY + tailCoords[2].y;
        }
    };

    if (direction === 'left') {
        for (let i = 0; i < snakeLocation.length; i++) {
            console.log('direction left, heres i: ', i)

            let currCellX = snakeLocation[i].x;
            let currCellY = snakeLocation[i].y;

            createSquare(currCellX + tailCoords[3].x, currCellY + tailCoords[3].y, snakeColor);

            let cellCols = currCellX / 30;
            let cellRows = currCellY / 30;

            const isEven = (cellCols + cellRows) % 2 === 0;

            context.fillStyle = isEven ? color1 : color2;
            context.fillRect(currCellX, currCellY, cellSize, cellSize)

            snakeLocation[i].x = currCellX + tailCoords[3].x;
            snakeLocation[i].y = currCellY + tailCoords[3].y;
        }
    };

};

// when user clicks play button, get snake going using snakeHead location (snakeLocation[0]) to test
playButton.addEventListener('click', () => {

    console.log(snakeLocation[0].x)
    console.log(snakeLocation[0].y)

    getSnakeGoing(snakeLocation[0].x, snakeLocation[0].y)

    // every direction is working except up (probably has to do with the tail pointing up, and the snake is going in onto istelf), (up is turning snake into one square)
    moveSnake(direction);

    // logic is working fine but is testing snake moving on itself

})

// need seperate function for moving snake and getting it going cause of apple
// need 3 or more free spaces to move on game start, where as general snake moving can be done with collisions or apples in the way.


if (gameOver) {
    // logic for if gameOver === true (player lost and game is over)
} else {
    // logic for when gameOver === false (game is still going)
    // setInterval(mainWrapperFunction, fps)
};
