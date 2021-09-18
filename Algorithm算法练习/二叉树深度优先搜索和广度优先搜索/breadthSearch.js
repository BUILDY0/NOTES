function breadthSearch(root, target) {
    if (root === null || root.length === 0 || target === null) {
        return false;
    }

    if (Object.prototype.toString.call(root) === '[object Object]') {
        (root instanceof Node) && (root = [root]);
    }

    let nodeList = [];
    for (let i = 0; i < root.length; i++) {
        console.log(root[i].value);
        if (root[i].value === target) {
            return true;
        } else {
            root[i].left && nodeList.push(root[i].left);
            root[i].right && nodeList.push(root[i].right);
        }
    }
    return breadthSearch(nodeList, target);
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
const h = new Node('h');
const i = new Node('i');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;
d.right = h;
g.left = i;


console.log(breadthSearch(123, 'h'));