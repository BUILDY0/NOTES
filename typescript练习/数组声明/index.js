var arr = [1, 2, 3];
function tell() {
    alert(arr[0]);
    alert(arr[1]);
    alert(arr[2]);
}
// tell();
var list = ['hello', 'hi'];
function say() {
    alert(list[0]);
    alert(list[1]);
}
// say();
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 20] = "green";
    Color[Color["blue"] = 21] = "blue";
})(Color || (Color = {}));
;
var c = Color.green;
function exec() {
    alert(Color.blue);
    alert(c);
}
exec();
