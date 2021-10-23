class hello {
    static data: number;
    constructor(data: number) {
        hello.data = data;
    }
    tell() {
        return hello.data;
    }
}

var h: hello;
h = new hello(123);
alert(h.tell());