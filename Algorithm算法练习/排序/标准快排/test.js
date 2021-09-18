var arr = [4, 1, 6, 9, 3, 2, 8, 7];

function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function quickSort(arr, begin, end) {
    if (begin >= end - 1) return;
    var left = begin;
    var right = end;
    do {
        do left++; while (left < right && arr[left] < arr[begin]);
        do right--; while (right > left && arr[right] > arr[begin]);
        if (left < right) swap(arr, left, right);
        // console.log(arr);
    } while (left < right);
    var swapPoint = left == right ? right - 1 : right;
    // console.log(swapPoint, 'skip');
    swap(arr, begin, swapPoint);
    // console.log(arr);
    quickSort(arr, begin, swapPoint);
    quickSort(arr, swapPoint + 1, end);
    return arr;
}
console.log(quickSort(arr, 0, arr.length));