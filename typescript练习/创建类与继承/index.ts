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

class Student extends Person {
    sex: string;
    constructor(sex: string) {
        super('ave', 15);
        this.sex = sex;
    }
    print() {
        super.print();
    }
}

var s = new Student('f');
s.print();