
// review some of ur var, ur classes have constructors that can replace some of these // 

// 5/15
    // game is mostly working, just need to clean up the classes and add finishing touches like confetti on new high score and such
    // clean up classes
        // remove constructors where they are not being used
        // move class methods into the correct class that makes sense
    // clean up code
    // look over var that are replaced by classes.

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); // canvas context

const userScore = document.getElementById('score'); // player score
const highScore = document.getElementById('high-score'); // high score

const playButton = document.getElementById('button'); // play button

const rows = 15; // 15 square long
const cols = 17; // 17 squares wide
const cellSize = 30; // play with the size of this

const fps = 80; // try 70 60 100 etc...

const color1 = '#a2d149'; // light green
const color2 = '#8bb042'; // dark green
const snakeColor = '#3498db'; // blue 🟦
const appleColor = '#ff3636'; // red 🔴

let gameInterval;
let gameRunning = false;
let score = 0;

// focus on canvas
canvas.setAttribute('tabindex', 1);
canvas.focus();

// dimensions
canvas.height = rows * cellSize;
canvas.width = cols * cellSize;

// clear localStorage
// localStorage.clear();

const directions = [
    { x: 0, y: -cellSize },
    { x: cellSize, y: 0 },
    { x: 0, y: cellSize },
    { x: -cellSize, y: 0 }
];

// board addEventListener ArrowLeft, ArrowUp, ArrowDown, ArrowRight
canvas.addEventListener('keydown', (e) => {
    if (gameRunning) {
        if (e.key === 'ArrowRight' && Game.dir != 'left') {
            console.log('right arrow key pressed');
            Game.dir = 'right';
        } else if (e.key === 'ArrowLeft' && Game.dir != 'right') {
            console.log('left arrow key pressed');
            Game.dir = 'left';
        } else if (e.key === 'ArrowUp' && Game.dir != 'down') {
            console.log('up arrow key pressed');
            Game.dir = 'up';
        } else if (e.key === 'ArrowDown' && Game.dir != 'up') {
            console.log('down arrow key pressed');
            Game.dir = 'down';
        }
    }
});

// playButton addEventListener:
playButton.addEventListener('click', () => {
    gameRunning = true;
    canvas.focus();
    gameInterval = setInterval(runGame.running, fps);
});

class Snake {
    constructor(x, y, dir, body) {
        this.pos = []; // coords will be pushed here
        this.dir = dir;
    }

    static body = []; // array of snake coordinates (body) 🐍

    // create snake on game start
    static createSnake() {
        let x1 = 4 * cellSize;
        let y1 = 7 * cellSize;

        Board.draw(x1, y1, snakeColor);
        Board.draw(x1 + cellSize, y1, snakeColor);
        Snake.body.push({ x: x1 + cellSize, y: y1 }); // head
        Snake.body.push({ x: x1, y: y1 }); // tail
    }

    // spawn snake (draw snake when you have coordinates)
    static drawSnake(body) {
        for (const cell of body) {
            Board.draw(cell.x, cell.y, snakeColor)
        };
    };

    static move() {
        // checking if snakeHead location is out of bounds...
        if (Game.checkBounds(Snake.body[0].x, Snake.body[0].y)) {
            // check down the line will run endGame logic
            EndGame.over = true;
        }

        let x = Snake.body[0].x;
        let y = Snake.body[0].y;

        if (Game.dir === 'right') {
            x += directions[1].x;
        } else if (Game.dir === 'left') {
            x += directions[3].x;
        } else if (Game.dir === 'up') {
            y += directions[0].y;
        } else if (Game.dir === 'down') {
            y += directions[2].y;
        };

        // check snakeHead out of bounds
        if (Game.checkBounds(x, y)) {
            EndGame.over = true;
        };

        // check gameState
        if (!EndGame.over) {
            // if game not over
            // pop removes tail (moves snake)
            let newHead = Snake.body.pop();

            // copy old tail for if snake eats apple (we keep it)
            let oldTail = { ...newHead };

            // replace tail with coordinates of updated head
            newHead.x = x;
            newHead.y = y;

            // check body collision logic here :
            for (const cell of Snake.body) {
                if (Game.checkCollision(newHead.x, newHead.y, cell.x, cell.y)) {
                    EndGame.over = true;
                    EndGame.gameOver();
                    return;
                }
            }

            // check for collision with apple (snake eats apple 😋)
            if (Game.checkCollision(newHead.x, newHead.y, Apple.x, Apple.y)) {
                // add +1 to score
                score++;

                Snake.body.unshift(newHead);
                Snake.body.push(oldTail);

                // spawn new apple (method updates Apple x and y)
                Setup.displayScore();
                Apple.spawnApple();
            } else {
                // no apple eaten 🥲
                Snake.body.unshift(newHead);

                // color old tail
                const isEven = ((oldTail.x + oldTail.y) / cellSize) % 2 === 0;
                const color = isEven ? color1 : color2;
                // context.fillStyle
                Board.draw(oldTail.x, oldTail.y, color);
            }
        } else {
            // end game method
            EndGame.gameOver();
            return;
        }
    }
}

// food class (position, handles respawning)
class Apple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static spawnApple() {
        let x1, y1, collision;

        do {
            collision = false;
            x1 = Math.floor(Math.random() * cols) * cellSize;
            y1 = Math.floor(Math.random() * rows) * cellSize;

            for (let i = 0; i < Snake.body.length; i++) {
                let x2 = Snake.body[i].x;
                let y2 = Snake.body[i].y;
                if (Game.checkCollision(x1, y1, x2, y2)) {
                    collision = true;
                    break;
                }
            }
        } while (collision);

        Apple.x = x1;
        Apple.y = y1;
        Board.draw(Apple.x, Apple.y, appleColor);
    }
}

// game (coordinates everything, sets intverals, detects collisions, updates score)
class Game {
    constructor(dir, gameOver, gameRunning) {
        // this.dir = dir;
        this.gameOver = gameOver;
        this.gameRunning = gameRunning;
    }

    static dir = 'right'; // defaults to right

    // sets intervals

    // collisions

    // updates scores

    static checkCollision(x, y, x1, y1) {
        if (x === x1 && y === y1) {
            return true;
        } else {
            return false;
        }
    }

    static checkBounds(x, y) {
        if (x < 0 || y < 0 || x >= (cols * cellSize) || y >= (rows * cellSize)) {
            return true;
        } else {
            return false;
        };
    }

    static checkStatus(EndGame) {
        if (EndGame.over) {
            Setup.displayScore();

            // logic to end game
            // call EndGame.gameOver()

        }
    }
}

// board (handles drawing things on canvas)
class Board {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    static draw(x, y, color) {
        context.fillStyle = color;
        context.fillRect(x, y, cellSize, cellSize);
    }
}

// class Setup
class Setup {
    constructor() {
        this.status = true;
    }

    static resetStats() {
        Game.dir = 'right'; // right by default
        gameRunning = false;
        score = 0;
        Snake.body = [];
        userScore.innerHTML = `score: 0`;
        EndGame.over = false; // game not over anymore
    }

    // method to display highscore based on localstorage
    static displayScore() {
        // updating score per interval
        userScore.innerText = `score: ${score}`;

        // retrieving highScore from localStorage.. if it exists..
        let storedHighScore = localStorage.getItem('high-score');

        // if exists, update highScore to user
        if (storedHighScore) {
            // display highScore if it exists in localStorage
            highScore.innerText = `high score: ${storedHighScore}`

            // update highscore if current score is higher
            if (score > storedHighScore) {
                highScore.innerText = `high score: ${score}`
                localStorage.setItem('high-score', score)
            }
        } else {
            // if doesn't exist, set it using current score or 0
            localStorage.setItem('high-score', score)
        }
    }

    static makeBoard() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // var to determine if cell is even or odd
                const isEven = (i + j) % 2 === 0;
                context.fillStyle = isEven ? color1 : color2;
                context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
            }
        }
    }
}

// class runGame
// main obj to run the game (this will run every interval)
class runGame {
    constructor() {
        this.status = true;
    }

    static running() {
        Snake.move(); // move snake
        Snake.drawSnake(Snake.body) // draw snake after moving it
    }

    // logic for checking vars

}

// class EndGame
// possible replace for gameOver -> if this is true on interval check. restart game
class EndGame {
    constructor() {
        // game over default false
        this.status = false;
    }

    static over = false;

    static gameOver() {
        // clear interval running game
        clearInterval(gameInterval)

        // setup game again
        Setup.makeBoard();
        // displayScore first since we are resetting score right after
        Setup.displayScore();
        Setup.resetStats();

        // snake needs to come after apple, since it depends on it
        Snake.createSnake();
        Apple.spawnApple();
    }
}

// // setup board
Setup.makeBoard();

// display high score
Setup.displayScore();

// setup snake & apple on board
// snake needs to come after apple, since it depends on it
Snake.createSnake();
Apple.spawnApple();
