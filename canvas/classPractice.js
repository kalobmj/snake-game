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

// setTimeout(() => {
//     console.log(`There is a ${bob.type} named Bob and...`);
// }, 2000);

// setTimeout(() => {
//     console.log(`They work as an ${bob.job} !!!`)
// }, 5000);

class apple {
    constructor(pos, color) {
        this.pos = pos;
        this.color = color;
    }
}

console.log(apple.pos);
console.log(apple.color);

// apple.pos = {x: 0, y: 0};
// apple.pos = {x: Math.floor(Math.random())}

apple.pos = {
    x: Math.floor(Math.random() * 17) * 30,
    y: Math.floor(Math.random() * 15) * 30
};

// apple respawning after snake eats it will come here

apple.color = 'light-red';

console.log(apple.pos);
console.log(apple.color);

class snake {
    constructor(pos, dir, color) {
        this.pos = pos;
        this.dir = dir;
        this.color = color;
    }
}

class User {
    constructor(name, age) {
        this.age = age;
        this.name = name;
    }

    greet() {
        console.log(`${this.name} is my name, hello !`)
        // return 3+4
    }

}

console.log(User.name)
console.log(User.age)

User.name = 'jerry';
User.age = 23;

console.log(User.name)
console.log(User.age)

// console.log(User.greet())
// User.greet()

const student = new User;

student.age = 21

student.name = 'lex'

console.log(student.age)
console.log(student.name)

student.greet()
