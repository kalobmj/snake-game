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

function drawGrid(maxCellsX, maxCellsY, cellSize) {
  const context = document.getElementById('canvas').getContext('2d');

  // create gray canvas
  context.fillStyle = 'gray';
  context.fillRect(0, 0, 350, 350);

  // moves black rect starting point
  // context.translate(100, 50);


  for (let i=0; i<maxCellsX; i++) {
    for (let j=0; j<maxCellsY; j++) {
      context.strokeStyle = 'gold';
      context.strokeRect(maxCellsX*cellSize, maxCellsY*cellSize, cellSize, cellSize);
      context.fillStyle = 'aquamarine';
      context.fillRect(maxCellsX*cellSize, maxCellsY*cellSize, cellSize, cellSize)
    }
  }

};

drawGrid(4, 4, 50);

// Make a function that draws a grid. The function could take 3 parameters: maxCellsX, maxCellsY, cellSize. In short, maxCellsX and maxCellsY are the number of horizontal and vertical cells and cellSize is the size of each cell. You can use this function in your initial setup to determine the width and height of your canvas (maxCells * cellSize).

// draw();