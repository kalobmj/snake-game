// console.log('script linked')

// //grid width and height
// var bw = 400;
// var bh = 400;
// //padding around grid
// var p = 10;
// //size of canvas
// var cw = bw + (p*2) + 1;
// console.log({cw})
// var ch = bh + (p*2) + 1;
// console.log({ch})

// // var canvas = $('<canvas/>').attr({width: cw, height: ch}).appendTo('body');

// // console.log({canvas})

// document.body.innerHTML += `
//     <canvas id='canvas' width='${cw}' height='${ch}'></canvas>
// `

// // var context = canvas.get(0).getContext("2d");

// let context = document.getElementById('canvas').getContext('2d')

// console.log({context})

// function drawBoard(){
//     for (var x = 0; x <= bw; x += 40) {
//         context.moveTo(0.5 + x + p, p);
//         context.lineTo(0.5 + x + p, bh + p);
//         // work under here, get rectangle to form and color it in
//         // context.fillRect(0.5 + x + p, )
//     }


//     for (var x = 0; x <= bh; x += 40) {
//         context.moveTo(p, 0.5 + x + p);
//         context.lineTo(bw + p, 0.5 + x + p);
//     }

//     context.strokeStyle = "black";
//     context.stroke();
// }

// drawBoard();

function test() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw a line
    ctx.beginPath();
    ctx.moveTo(10, 10); // Start at (10, 10)
    ctx.lineTo(100, 100); // Draw a line to (100, 100)
    ctx.stroke(); // Draw the path
    
    // Draw a rectangle
    ctx.beginPath();
    ctx.rect(10, 10, 150, 100); // Rectangle at (200, 20) with width 150, height 100
    ctx.stroke(); // Draw the rectangle
}

test()
