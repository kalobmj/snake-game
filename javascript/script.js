// 15 rows, 17 cols
const grid = document.getElementById('grid');

for (let i=0; i<10; i++) {
    grid.innerHTML += `
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>

        <div id='blue-test' class='dark' color='blue'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>
        <div class='light'></div>
        <div class='dark'></div>

    `
}