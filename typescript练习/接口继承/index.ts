interface a {
    name: string;
}
interface b {
    sex: number;
}
interface c extends a, b {
    age: number;
}


var data = <c>{};
data.age = 12;
data.name = 'abc';
data.sex = 1;

interface Counter {
    interval: number;
    reset(): void;
    (start: number): string;
}
var obj: Counter
obj(123);
obj.reset();