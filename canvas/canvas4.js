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
let gameOver = false;
let score = 0;

// focus on canvas
canvas.setAttribute('tabindex', 1);
canvas.focus();

// dimensions
canvas.height = rows*cellSize;
canvas.clientWidth = cols*cellSize;

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

// util functions

// structure

// Methods (like .move(), .draw(), .checkCollision())

// snake class (position, direction, handles movement)

class Snake {
    constructor(pos, dir) {
        this.pos = []; // coords will be pushed here
        this.dir = dir;
    }

    move() {

        // move based on dir
        // checkCollision for snakhead hitting apple
        // pop tail and reuse it if apple hit

        let x = snake[0].x;
        let y = snake[0].y;

        if (dir === 'right') {
            x+=directions[1].x;
        } else if (dir === 'left') {
            x+=directions[3].x;
        } else if (dir === 'up') {
            y+=directions[0].y;
        } else if (dir === 'down') {
            y+=directions[2].y;
        };

        // check bounds
        if (this.checkBounds(x, y)) {
            gameOver = true;
        };

        // check gameState
        

    }

    draw(x, y) {
        
        // logic for fillRect with x y and color here
        context.fillRect(x, y, snakeColor); // snakeColor cause we are in snake

    }

}

// food class (position, handles respawning)

// game (coordinates everything, sets intverals, detects collisions, updates score)

class Game {
    constructor() {

    }

    // sets intervals
    
    // collisions
    
    // updates scores

    checkCollision(pos1, pos2) {

        // logic to check whether snake head hits an apple or not

        // check if 2 spot collide, or if snakhead hits apple

    }

    checkBounds(x, y) {

        // logic to check if snakehead is out of bounds

    }

}

// board (handles drawing things on canvas)

// each class needs : props, methods 

//
