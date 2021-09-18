const arr = [6, 7, 8, 3, 4, 9, 4, 3, 4, 5];

function swap(arr, a, b) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function compare(a, b) {
    if (a > b) {
        return true;
    }
    return false;
}

function sort(arr) {
    if (arr.length === 0 || arr === null) {
        return [];
    }
    let leader = arr[0],
        left = [],
        right = [];
    for (let i = 1; i < arr.length; i++) {
        if (compare(arr[i], leader)) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    left = sort(left);
    right = sort(right);
    return [...left, leader, ...right];
}

console.log(sort(arr));