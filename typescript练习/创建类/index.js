var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.print = function () {
        alert(this.name + ':' + this.age);
    };
    return Person;
}());
var p = new Person('jaccey', 12);
p.print();