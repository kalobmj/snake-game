function drawGrid() {
    const context = document.getElementById("canvas").getContext("2d");
    
    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 15; j++) {
            context.fillStyle = '#4a752c'
            context.strokeStyle = 'black'
            context.fillRect(j * 25, i * 25, 25, 25);
            context.strokeRect(j * 25, i * 25, 25, 25)
        }
    }
};

drawGrid();
