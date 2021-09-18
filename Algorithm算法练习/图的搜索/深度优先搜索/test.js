function Node(value) {
    this.value = value;
    this.neighbor = [];
}

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const f = new Node('f');

a.neighbor.push(b, c);
b.neighbor.push(a, c, d);
c.neighbor.push(a, b);
d.neighbor.push(f);

function deepSearch(node, target, path) {
    if (node === null) {
        return false;
    }
    path = path || [];
    if (path.includes(node)) {
        return false;
    } else {
        path.push(node);
    }
    if (node.value === target) {
        return true;
    } else {
        let result = false;
        for (let i = 0; i < node.neighbor.length; i++) {
            result |= deepSearch(node.neighbor[i], target, path);
        }
        return !!result;
    }
}

console.log(deepSearch(a, 'e'), deepSearch(b, 'f'));