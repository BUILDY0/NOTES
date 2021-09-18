class Queue {
    constructor() {
        this.arr = []
    }

    push(value) {
        this.arr.push(value);
        return this.arr;
    }

    pop() {
        this.arr.shift();
        return this.arr;
    }
}

const queue = new Queue();
queue.push(1)
queue.push(2)
queue.push(3)
console.log(queue.arr);
queue.pop();
console.log(queue.arr);