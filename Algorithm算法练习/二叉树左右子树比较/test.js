// 笔试的话，左右子树互换后，两个树不同；面试的话，询问是否相同，如果不同则由两种答案。

// 1.子树互换后认为不同

function compare1(root1, root2) {
    if (root1 === root2) {
        return true;
    }
    if (root1 === null && root2 !== null || root1 !== null && root2 === null) {
        return false;
    }

    if (root1.value !== root2.value) {
        return false;
    }



    return compare1(root1.left, root2.left) && compare1(root1.right, root2.right);

}


// 2.子树互换后认为相同
function compare2(root1, root2) {
    if (root1 === root2) {
        return true;
    }
    if (root1 === null && root2 !== null || root1 !== null && root2 === null) {
        return false;
    }

    if (root1.value !== root2.value) {
        return false;
    }



    return compare2(root1.left, root2.left) && compare2(root1.right, root2.right) || compare2(root1.left, root2.right) && compare2(root1.right, root2.left)

}

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

a2.right = b2;
a2.left = c2;
b2.left = d2;
b2.right = e2;
c2.left = f2;
c2.right = g2;

console.log(compare1(a1, a2));
console.log(compare2(a1, a2));