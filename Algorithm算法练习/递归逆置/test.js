class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const node1 = new Node(1),
    node2 = new Node(2),
    node3 = new Node(3),
    node4 = new Node(4),
    node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

function bianLink(node) {
    if (node === null) {
        return;
    }
    console.log(node.value);
    bianLink(node.next);
}

// function nizhi(root) {
//     if (root.next.next === null) {
//         root.next.next = root;
//         return root;
//     }
//     const result = nizhi(root.next);
//     root.next.next = root;
//     root.next = null
//     return result;
// } 这个还复杂了

function nizhi(root) {
    if (root.next === null) {
        return root;
    }
    const result = nizhi(root.next);
    root.next.next = root;
    root.next = null;
    return result;
}

// bianLink(node1);

bianLink(nizhi(node1));