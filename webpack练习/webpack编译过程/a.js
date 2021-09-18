const a = {};
a.abc = function () {
    return "module_a";
}
console.log(a.abc());
module.exports = a;
require('./b.js');