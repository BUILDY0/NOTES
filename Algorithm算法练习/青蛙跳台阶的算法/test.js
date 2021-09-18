// 青蛙要跳上n阶台阶，一次性可以跳n阶，问有多少种方法

function fn(n) {
    if (n < 1) {
        return -1;
    }
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2;
    }
    let ret = 1;
    for (let i = 1; i < n; i++) {
        ret += fn(n - i);
    }
    return ret;
}
console.log(fn(30));