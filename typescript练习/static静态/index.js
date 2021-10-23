var hello = /** @class */ (function () {
    function hello(data) {
        hello.data = data;
    }
    hello.prototype.tell = function () {
        return hello.data;
    };
    return hello;
}());
var h;
h = new hello(123);
alert(h.tell());
