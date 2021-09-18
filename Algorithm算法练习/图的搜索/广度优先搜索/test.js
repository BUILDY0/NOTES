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

function brandSearch(nodes, target, path) {
    if (Object.prototype.toString.call(nodes) === '[object Object]') {
        nodes = [nodes];
    }
    if (nodes === null || nodes.length === 0) {
        return false;
    }
    let nextNodes = [];
    path = path || [];
    for (let i = 0; i < nodes.length; i++) {
        if (!path.includes(nodes[i])) {
            path.push(nodes[i])
        } else {
            continue;
        }
        if (nodes[i].value === target) {
            return true;
        } else {
            nextNodes = nextNodes.concat(nodes[i].neighbor).reduce((prev, next) => {
                if (prev.includes(next)) {
                    return prev;
                }
                return prev.concat(next);
            }, []);
        }
    }
    return brandSearch(nextNodes, target, path);

}

console.log(brandSearch(a, 'e'), brandSearch(b, 'f'));