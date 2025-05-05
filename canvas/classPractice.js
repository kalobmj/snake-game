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

setTimeout(() => {
    console.log(`There is a ${bob.type} named Bob and...`);
}, 2000);

setTimeout(() => {
    console.log(`They work as an ${bob.job} !!!`)
}, 5000);
