function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

function getDeep(root) {
    if (root === null) {
        return 0
    }
    return 1 + Math.max(getDeep(root.left), getDeep(root.right));
}

function isBalanceTree(root) {
    if (root === null) {
        return true;
    }
    const leftDeep = getDeep(root.left);
    const rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) <= 1) {
        return isBalanceTree(root.left) && isBalanceTree(root.right)
    } else {
        return false;
    }
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
    count++;
    if (root.value === target) {
        return true;
    }
    if (target > root.value) {
        return searchTree(root.right, target);
    } else {
        return searchTree(root.left, target);
    }

}

function change(root) { //不平衡->平衡的算法
    if (isBalanceTree(root)) {
        return root;
    }
    if (root.left) {
        root.left = change(root.left);
    }
    if (root.right) {
        root.right = change(root.right);
    }

    const leftDeep = getDeep(root.left);
    const rightDeep = getDeep(root.right);
    if (Math.abs(leftDeep - rightDeep) <= 1) { //则为平衡树
        return root;
    } else if (leftDeep > rightDeep) { //左深右浅 需要右旋
        const changeTreeDeep = getDeep(root.left.right);
        const noChangeTreeDeep = getDeep(root.left.left);
        if (changeTreeDeep > noChangeTreeDeep) { //变化子树深度大于不变子树，则整个root的左子树先进行一次左旋
            root.left = leftRotate(root.left);
        }
        // 以下为根节点进行右旋
        let newRoot = rightRotate(root);
        // 避免出现changeTreeDeep === noChangeTreeDeep的情况，此时对新根的右子树再进行一次平衡
        newRoot.right = change(newRoot.right);
        // 最后在对新根再平衡一次
        newRoot = change(newRoot);
        return newRoot;
    } else { //左浅右深 需要左旋
        const changeTreeDeep = getDeep(root.right.left);
        const noChangeTreeDeep = getDeep(root.right.right);
        if (changeTreeDeep > noChangeTreeDeep) { //变化子树深度大于不变子树，则整个root的右子树先进行一次右旋
            root.right = rightRotate(root.right);
        }
        // 以下为根节点进行右旋
        let newRoot = leftRotate(root);
        // 避免出现changeTreeDeep === noChangeTreeDeep的情况，此时对新根的右子树再进行一次平衡
        newRoot.left = change(newRoot.left);
        // 最后在对新根再平衡一次
        newRoot = change(newRoot);
        return newRoot;
    }
}

function leftRotate(root) {
    const newRoot = root.right;
    const changeTree = root.right.left;
    root.right = changeTree;
    newRoot.left = root;
    return newRoot;
}

function rightRotate(root) {
    const newRoot = root.left;
    const changeTree = root.left.right;
    root.left = changeTree;
    newRoot.right = root;
    return newRoot;
}

// 测试平衡函数是否正常工作
// const testArr = [10, 5, 3, 1, 6, 8];
// const testSearchTree = buildSearchTree(testArr);
// console.log(testSearchTree);
// const testBalanceTree = change(testSearchTree);
// console.log(testBalanceTree);

// 测试搜索树和平衡树的性能

let arr = [];
for (let i = 0; i < 10000; i++) {
    arr.push(Math.floor(10000 * Math.random()))
}
let count = 0;

const testTree1 = buildSearchTree(arr);
console.log(searchTree(testTree1, 2500), count);

count = 0;

const testTree2 = change(testTree1);
console.log(searchTree(testTree2, 2500), count);