
// review some of ur var, ur classes have constructors that can replace some of these // 

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

let dir = 'right'; // right by default
// let apple = []; // 🍎
let snake = []; // 🐍

let gameInterval;
let gameRunning = false;
// let gameOver = false;
let score = 0;

// focus on canvas
canvas.setAttribute('tabindex', 1);
canvas.focus();

// dimensions
canvas.height = rows * cellSize;
canvas.clientWidth = cols * cellSize;

// retrieving highScore from localStorage.. if it exists..
let storedHighScore = localStorage.getItem('high-score');

// if exists, update highScore to user
if (storedHighScore) {
    highScore.innerText = `high score: ${storedHighScore}`;
};

const directions = [
    { x: 0, y: -cellSize },
    { x: cellSize, y: 0 },
    { x: 0, y: cellSize },
    { x: -cellSize, y: 0 }
];

//

// arrow key add event listeners here:
// board addEventListener ArrowLeft, ArrowUp, ArrowDown, ArrowRight
canvas.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && dir != 'left') {
        console.log('right arrow key pressed');
        dir = 'right';
    } else if (e.key === 'ArrowLeft' && dir != 'right') {
        console.log('left arrow key pressed');
        dir = 'left';
    } else if (e.key === 'ArrowUp' && dir != 'down') {
        console.log('up arrow key pressed');
        dir = 'up';
    } else if (e.key === 'ArrowDown' && dir != 'up') {
        console.log('down arrow key pressed');
        dir = 'down';
    };
});

//

class Snake {
    constructor(x, y, dir, body) {
        this.pos = []; // coords will be pushed here
        this.dir = dir;
        this.body = []; // array of snake coordinates (body) 🐍
    }

    // spawn snake (draw snake when you have coordinates)
    drawSnake(body) {
        for (const cell of body) {
            Board.draw(cell.x, cell.y, snakeColor)
        };
    };

    move() {
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
            newHead.x = Snake.body[0].x;
            newHead.y = Snake.body[0].y;

            // check body collision logic here :
            for (const cell of Snake.body) {
                if (Game.checkCollision(newHead.x, newHead.y, cell.x, cell.y)) {
                    EndGame.over = true;
                    gameOver();
                    return;
                }
            }

            // check for collision with apple (snake eats apple 😋)
            if (Game.checkCollision(Snake.body[0].x, Snake.body[0].y, Apple.x, Apple.y)) {
                // keep old tail, and move new head to front
                Snake.body.unshift(newHead);
                snake.body.push(oldTail);
            } else {
                // no apple eaten 🥲
                Snake.body.unshift(newHead);
            }
        } else {
            // end game method
            gameOver();
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

    spawnApple() {
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
    constructor(dir, x, y, x1, y1, gameOver, gameRunning) {
        // this.x = x;
        // this.y = y;
        // this.x1 = x1;
        // this.y1 = y1;
        this.dir = 'right';
        this.gameOver = gameOver;
        this.gameRunning = gameRunning;
    }

    // sets intervals

    // collisions

    // updates scores

    checkCollision(x, y, x1, y1) {
        if (x === x1 && y === y1) {
            return true;
        } else {
            return false;
        }
    }

    checkBounds(x, y) {
        if (x < 0 || y < 0 || x >= (cols * cellSize) || y >= (rows * cellSize)) {
            return false;
        } else {
            return true;
        };
    }

    checkStatus(EndGame) {
        if (EndGame.over) {

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

    draw(x, y, color) {
        context.fillRect(x, y, color);
    }
}

// class Setup

class Setup {

    constructor() {
        
    }

}

// class CheckGame

class CheckGame {

    constructor() {
        this.status = true;
    }

}

// class EndGame
// possible replace for gameOver -> if this is true on interval check. restart game
class EndGame {
    constructor() {
        // game over default false
        this.over = false;
    }

    gameOver() {



    }
}
