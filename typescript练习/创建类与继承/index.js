var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(sex) {
        var _this = _super.call(this, 'ave', 15) || this;
        _this.sex = sex;
        return _this;
    }
    Student.prototype.print = function () {
        _super.prototype.print.call(this);
    };
    return Student;
}(Person));
var s = new Student('f');
s.print();
