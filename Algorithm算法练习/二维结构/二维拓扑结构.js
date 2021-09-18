//      a--b--c
//      |     |
//      d     f

class NODE {
    constructor(value) {
        this.value = value
        this.neighbor = [];
    }
}

const node_a = new NODE(1)
const node_b = new NODE(2)
const node_c = new NODE(3)
const node_d = new NODE(4)
const node_f = new NODE(5)

node_a.neighbor.push(node_b, node_d);
node_b.neighbor.push(node_a, node_c);
node_c.neighbor.push(node_b, node_f);
node_d.neighbor.push(node_a);
node_f.neighbor.push(node_c)

console.log(node_a, node_b, node_c, node_d, node_f);