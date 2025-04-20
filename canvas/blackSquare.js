function draw() {
  // define canvas
  const context = document.getElementById('canvas').getContext('2d');

  context.fillStyle = 'gray';
  context.fillRect(0, 0, 350, 350);
  
  for (let i=0; i<4; i++) {
    for (let j=0; j<4; j++) {
      context.strokeStyle = 'white'
      context.strokeRect(j*50, i*50, 50, 50);
      context.fillStyle = 'black';
      context.fillRect(j*50, i*50, 50, 50);
    }
  }

}

draw();