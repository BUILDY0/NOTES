class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    print() {
        alert(this.name + ':' + this.age);
    }
}

var p = new Person('jaccey', 12);
p.print();