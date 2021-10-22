//冒泡排序是将集合从左至右，两两比较确定是否交换，每次循环都把最大或最小的那个放在所选取片段集合的最后，因而需要两次循环嵌套完成。

function sort(arr) {
    for (let j = 0; j < arr.length - 1; j++) {
        for (let i = 0; i < (arr.length - j); i++) {
            if (compare(arr[i], arr[i + 1])) {
                swap(arr, i, i + 1);
            }
        }
    }
    return arr;
}

function compare(a, b) {
    if (a < b) {
        return true;
    }

    return false;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const arr = [1, 7, 8, 3, 6, 5];

console.log(sort(arr));