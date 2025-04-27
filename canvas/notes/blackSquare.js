// function draw() {
//   // define canvas
//   const context = document.getElementById('canvas').getContext('2d');

//   // create gray canvas
//   context.fillStyle = 'gray';
//   context.fillRect(0, 0, 350, 350);

//   // moves black rect starting point
//   context.translate(100, 50);

//   // loop to create black square
//   for (let i=0; i<4; i++) {
//     for (let j=0; j<4; j++) {
//       context.strokeStyle = 'white'
//       context.strokeRect(j*50, i*50, 50, 50);
//       context.fillStyle = 'black';
//       context.fillRect(j*50, i*50, 50, 50);
//     }
//   }

// };

// function drawGrid(maxCellsX, maxCellsY, cellSize) {
//   const context = document.getElementById('canvas').getContext('2d');

//   // create gray canvas
//   context.fillStyle = 'gray';
//   context.fillRect(0, 0, 500, 500);

//   // // moves black rect starting point
//   // context.translate(175, 175);

//   for (let i=0; i<maxCellsX; i++) {
//     for (let j=0; j<maxCellsY; j++) {
//       context.strokeStyle = 'gold';
//       context.strokeRect(i*cellSize, j*cellSize, cellSize, cellSize);
//       context.fillStyle = 'aquamarine';
//       context.fillRect(i*cellSize, j*cellSize, cellSize, cellSize)
//     }
//   }

// };

// drawGrid(17, 15, 29);

// fillRect(x, y, width, height)

// 17 wide
// 15 tall

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// const cellSize = 20.02;

// context.translate(0.5, 0.5)

const rows = 15;
const cols = 17;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const cellSize = Math.min(canvasWidth / cols, canvasHeight / rows);

console.log(cellSize)

function setBackground(c1, c2) {

  context.fillStyle = c1;
  context.strokeStyle = c2;

  context.fillRect(0, 0, canvas.height, canvas.width);

  for (let i=0; i<canvas.width; i+=cellSize) {
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
  }
  for (let j=0; j<canvas.height; j+=cellSize) {
    context.moveTo(0, j);
    context.lineTo(canvas.width, j);
  }

  context.stroke();
}

setBackground('white', 'black')