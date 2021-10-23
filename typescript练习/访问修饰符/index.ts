class People {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
    tell() {
        alert(this.name);
    }
}

class Student extends People {
    private age: number;
    constructor(age: number) {
        super('hia');
        this.age = age;
        this.name = 'bul';
    }
    tell() {
        super.tell();
        alert(this.age);
    }
}

var s = new Student(19);
s.tell();