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



// food class (position, handles respawning)

// game (coordinates everything, sets intverals, detects collisions, updates score)

// board (handles drawing things on canvas)

// each class needs : props, methods 

//
