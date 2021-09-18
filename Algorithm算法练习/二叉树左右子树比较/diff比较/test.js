function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

const a1 = new Node('a')
const b1 = new Node('b')
const c1 = new Node('c')
const d1 = new Node('d')
const e1 = new Node('e')
const f1 = new Node('f')
const g1 = new Node('g')

a1.left = b1;
a1.right = c1;
b1.left = d1;
b1.right = e1;
c1.left = f1;
c1.right = g1;


const a2 = new Node('a')
const b2 = new Node('b')
const c2 = new Node('c')
const d2 = new Node('d')
const e2 = new Node('e')
const f2 = new Node('f')
const g2 = new Node('g')

a2.left = b2;
a2.right = c2;
b2.left = d2;
b2.right = e2;
// c2.left = f2;
c2.right = g2;
e2.right = f2



function diff(root1, root2) {
    const diffList = [];

    function exec(root1, root2, diffList) {
        if (root1 === root2) {
            return diffList;
        } else if (root1 === null && root2 !== null) {
            diffList.push({
                type: '新增',
                origin: root1,
                now: root2,
            })
        } else if (root1 !== null && root2 === null) {
            diffList.push({
                type: '删除',
                origin: root1,
                now: root2,
            })
        } else if (root1.value !== root2.value) {
            diffList.push({
                type: '修改',
                origin: root1,
                now: root2
            })
            exec(root1.left, root2.left, diffList);
            exec(root1.right, root2.right, diffList);
        } else {
            exec(root1.left, root2.left, diffList);
            exec(root1.right, root2.right, diffList);
        }
        return diffList;
    }
    return exec(root1, root2, diffList);
}

console.log(diff(a1, a2));