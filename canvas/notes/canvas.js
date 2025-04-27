// const canvas = document.getElementById('canvas');
//   const ctx = canvas.getContext('2d');

// // Set custom grid dimensions
//   const rows = 15;
//   const cols = 17;
//   const cellSize = 30; // size of each cell in pixels

// // Set canvas size based on grid
//   canvas.width = cols * cellSize;
//   canvas.height = rows * cellSize;

// // Draw grid function
//   function drawGrid(rows, cols, cellSize) {
//     ctx.strokeStyle = '#ccc';

//     // Horizontal lines
//     for (let i = 0; i <= rows; i++) {
//       ctx.beginPath();
//       ctx.moveTo(0, i * cellSize);
//       ctx.lineTo(cols * cellSize, i * cellSize);
//       ctx.stroke();
//     }

//     // Vertical lines
//     for (let j = 0; j <= cols; j++) {
//       ctx.beginPath();
//       ctx.moveTo(j * cellSize, 0);
//       ctx.lineTo(j * cellSize, rows * cellSize);
//       ctx.stroke();
//     }
//   }

//   drawGrid(rows, cols, cellSize);

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const rows = 15;
  const cols = 17;
  const cellSize = 30;

  canvas.width = cols * cellSize;
  canvas.height = rows * cellSize;

  function drawCheckerboard(rows, cols, cellSize) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Alternate color: even sum = color1, odd sum = color2
        console.log({row})
        console.log({col})
        console.log('seperate')
        const isEven = (row + col) % 2 === 0;
        ctx.fillStyle = isEven ? '#a8d5e2' : '#ffffff'; // light blue and white, for example
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  drawCheckerboard(rows, cols, cellSize);