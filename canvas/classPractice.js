// practice classes

class Person {
    constructor (job, type) {
        this.job = job;
        this.type = type;
    }
}

let bob = new Person('accountant', 'man');

// console.log(bob.job);
// console.log(bob.type);

// Methods (like .move(), .draw(), .checkCollision())

class apple {
    constructor(pos, color) {
        this.pos = pos;
        this.color = color;
    }
};

console.log(apple.pos);
console.log(apple.color);

// apple.pos = {x: 0, y: 0};
// apple.pos = {x: Math.floor(Math.random())}

apple.pos = {
    x: Math.floor(Math.random() * 17) * 30,
    y: Math.floor(Math.random() * 15) * 30
};

apple.color = 'light-red';

console.log(apple.pos);
console.log(apple.color);

// setTimeout(() => {
//     console.log(`There is a ${bob.type} named Bob and...`);
// }, 2000);

// setTimeout(() => {
//     console.log(`They work as an ${bob.job} !!!`)
// }, 5000);
