// define canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const cellSize = 30;
const fps = 70;

// nested for loops to create game board
for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++) {
        // var to determine if cell is even or odd
        const isEven = (i + j) % 2 === 0;
        context.fillStyle = isEven ? '#a2d149' : '#8bb042';
        context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
    }
};

// 15 x 17 game board
const rows = 15;
const cols = 17;

// set canvas dimensions
canvas.height = rows * cellSize;
canvas.width = cols * cellSize;

const color1 = '#a2d149'; // light green
const color2 = '#8bb042'; // dark green

const snakeLength = 2;
const snakeColor = '#3498db'; // blue

const appleColor = '#ff3636'; // red

let direction = '';
let directionQueue = '';
let score = 0;

// fillRect(x, y, width, height)

