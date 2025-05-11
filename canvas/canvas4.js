
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

        // apple cannot spawn on top of snake head, snake body



    }
}

// game (coordinates everything, sets intverals, detects collisions, updates score)
class Game {
    constructor(dir, x, y, x1, y1, gameOver, gameRunning) {
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.dir = 'right';
        this.gameOver = gameOver;
        this.gameRunning = gameRunning;
    }

    // sets intervals

    // collisions

    // updates scores

    checkCollision(x, y, x1, y1) {
        // collision or not
        if (x === x1 && y === y1) {
            return true;
        } else {
            return false;
        }
    }

    checkBounds(x, y) {

        // logic to check if snakehead is out of bounds

    }

    checkStatus() {



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

// class CheckGame

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
