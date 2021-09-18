function Node(value) {
    this.value = value;
    this.childs = [];
}

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');
const g = new Node('g');

a.childs.push(b, c, d);
d.childs.push(e, f, g)

function deepSearch(root, target) {
    if (root === null) {
        return false;
    }
    if (root.value === target) {
        return true;
    } else {
        let result = false;
        for (let i = 0; i < root.childs.length; i++) {
            result |= deepSearch(root.childs[i], target);
        }
        return !!result;
    }
}

console.log(deepSearch(a, 'g'));