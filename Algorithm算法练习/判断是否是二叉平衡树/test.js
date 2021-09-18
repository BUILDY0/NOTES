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
const h = new Node('h');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
// c.left = f;
c.right = g;
d.left = h;
h.left = f

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

console.log(isBalanceTree(b));