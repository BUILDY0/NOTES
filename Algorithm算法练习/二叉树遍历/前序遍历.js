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

function qianxu(root) {
    if (root === null) {
        return;
    }
    console.log(root.value);
    qianxu(root.left);
    qianxu(root.right);
}

qianxu(a);