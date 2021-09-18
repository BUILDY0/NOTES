//常规方法
let arr = [];
for (let i = 0; i < 1000; i++) {
    arr.push(Math.floor(1000 * Math.random()))
}

let count1 = 0;

function searchNum(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        count1++
        if (arr[i] === target) {
            return true;
        }
    }
    return false;
}

console.log(searchNum(arr, 56), count1);

// 建立一个二叉搜索树

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

function addNode(root, target) {
    if (root === null || root.value === target.value) {
        return;
    }
    if (target.value < root.value) {
        if (root.left) {
            addNode(root.left, target)
        } else {
            root.left = target;
        }
    } else {
        if (root.right) {
            addNode(root.right, target)
        } else {
            root.right = target;
        }
    }
}

function buildSearchTree(arr) {
    if (arr === null || arr.length === 0) {
        return null;
    }
    const root = new Node(arr[0])
    for (let i = 1; i < arr.length; i++) {
        addNode(root, new Node(arr[i]));
    }
    return root;
}

function searchTree(root, target) {
    if (root === null) {
        return false;
    }
    count2++;
    if (root.value === target) {
        return true;
    }
    if (target > root.value) {
        return searchTree(root.right, target);
    } else {
        return searchTree(root.left, target);
    }

}

let count2 = 0;

const tree = buildSearchTree(arr);
console.log(searchTree(tree, 56), count2);

console.log(tree);