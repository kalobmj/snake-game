// main program

// define canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// food (apple)

let appleSize = 1; // apple will always be 1 block in size

// snake

let snakeSize = 2; // snake will be 2 blocks long at start


const drawCustomGrid = (rows, cols, cellSize) => {

    // set canvas height based on dimensions
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            // check if our position is even or odd
            const isEven = (i + j) % 2 === 0;
            // ternary based on isEven true or false
            context.fillStyle = isEven ? '#a2d149' : '#8bb042';
            context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
        }
    }
};

// 15 rows, 17 cols, 30 cellSize
drawCustomGrid(15, 17, 35);