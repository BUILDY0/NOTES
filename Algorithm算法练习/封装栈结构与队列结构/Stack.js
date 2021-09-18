class Stack {
    constructor() {
        this.arr = [];
    }

    push(value) {
        this.arr.push(value);
        return this.arr
    }

    pop() {
        this.arr.pop();
        return this.arr
    }
}


const stack = new Stack()
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.arr);
stack.pop()
console.log(stack.push(4))