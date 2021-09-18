function sort(arr) {
    if (arr.length === 0 || arr === null) {
        return [];
    }
    const ret = [];
    for (let i = 0; i < arr.length; i++) {
        let minIndex = getMinIndex(arr)
        ret.push(arr[minIndex]);
        arr[minIndex] = null;
    }
    arr = 2

    return ret;
}


function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = arr[i];
}

function getMinIndex(arr) {
    let minIndex;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== null) {
            minIndex = i;
            break;
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[minIndex] && arr[i] !== null) {
            minIndex = i;
        }
    }
    return minIndex;
}

const arr = [7, 5, 3, 6, 4, 9, 6]
console.log(sort(arr));