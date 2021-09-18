function depthSearch(root, target) {
    if (root === null || target === null) {
        return;
    }
    console.log(root.value);
    let left, right;
    if (root.value === target) {
        return true
    } else {
        left = depthSearch(root.left);
        right = depthSearch(root.right);
    }
    return left || right;
}

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');
const g = new Node('g');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;

console.log(depthSearch(a, 'g'));