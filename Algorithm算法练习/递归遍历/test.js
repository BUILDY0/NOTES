// 遍历数组
const arr = [1, 2, 3, 4, 5]

/**
 * 
 * @param {Array} arr arr
 * @param {number} i index
 * @returns undefined
 */
function bianli(arr, i) {
    if (arr === null || arr.length <= i) {
        return;
    }
    console.log(arr[i]);
    bianli(arr, i + 1)
}
// bianli(arr, 0);


// 遍历链表
/**
 * @param {Object} value 根节点
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null
    }
}

const node1 = new Node(1),
    node2 = new Node(2),
    node3 = new Node(3),
    node4 = new Node(4),
    node5 = new Node(5),
    node6 = new Node(6);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;

function bianlink(root) {
    if (root === null) {
        return;
    }
    console.log(root.value);
    bianlink(root.next)
}

bianlink(node1);