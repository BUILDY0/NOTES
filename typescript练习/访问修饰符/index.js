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
var People = /** @class */ (function () {
    function People(name) {
        this.name = name;
    }
    People.prototype.tell = function () {
        alert(this.name);
    };
    return People;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(age) {
        var _this = _super.call(this, 'hia') || this;
        _this.age = age;
        _this.name = 'bul';
        return _this;
    }
    Student.prototype.tell = function () {
        _super.prototype.tell.call(this);
        alert(this.age);
    };
    return Student;
}(People));
var s = new Student(19);
s.tell();
