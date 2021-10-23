interface printVal {
    name: string;
    age?: string;//接口可选类型
    sex: string;
}

interface method {
    (pas1: number, pas2: string): boolean;//接口函数类型
}
var myMethod: method;
myMethod = function (a: number, b: string) {
    return false;
}

interface list {
    [index: number]: string;//接口数组类型
}
var myList: list
myList = ['s', '456']

function tell(obj: printVal) {
    console.log(obj.name, obj.age, obj.sex);
}
var obj = { name: 'abc', sex: 'male' };
tell(obj);

function say(obj: { name: string }): void {
    console.log(obj.name);
}
say(obj);
