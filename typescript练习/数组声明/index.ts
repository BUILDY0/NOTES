var arr: number[] = [1, 2, 3];

function tell() {
    alert(arr[0]);
    alert(arr[1]);
    alert(arr[2]);
}

// tell();

var list: Array<string> = ['hello', 'hi'];

function say() {
    alert(list[0]);
    alert(list[1]);
}
// say();

enum Color { red, green = 20, blue };
var c: Color = Color.green;
function exec() {
    alert(Color.blue);
    alert(c);
}
exec();