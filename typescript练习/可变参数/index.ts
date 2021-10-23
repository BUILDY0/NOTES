function printName(...strs: string[]) {
    strs.map(val => {
        return val.toString();
    });
    return strs.join(' ');
}

var result = printName('abc', 'efg', '?')
var div = document.getElementById('div');
div.innerHTML = result;