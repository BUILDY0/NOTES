function printName() {
    var strs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        strs[_i] = arguments[_i];
    }
    strs.map(function (val) {
        return val.toString;
    });
    return strs.join(' ');
}
var result = printName('abc', 'efg', '?');
var div = document.getElementById('div');
div.innerHTML = result;
