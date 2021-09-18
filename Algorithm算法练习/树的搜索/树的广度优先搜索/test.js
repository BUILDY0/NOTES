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

function brandSearch(roots, target) {
    let toString = Object.prototype.toString
    if (toString.call(roots) === '[object Object]') {
        roots = [roots];
    }
    if (roots === null || roots.length === 0 || !Array.isArray(roots)) {
        return false;
    }
    let childs = [];
    for (let i = 0; i < roots.length; i++) {
        if (roots[i].value === target) {
            return true;
        } else {
            childs = roots[i].childs.concat(childs);
        }
    }
    // console.log(childs);
    return brandSearch(childs, target);

}

console.log(brandSearch(a, 'i'));