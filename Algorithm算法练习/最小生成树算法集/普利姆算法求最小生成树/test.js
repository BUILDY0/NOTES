function Node(value) {
    this.value = value;
    this.neighbor = [];
}

const a = new Node('A');
const b = new Node('B');
const c = new Node('C');
const d = new Node('D');
const e = new Node('E');
const f = new Node('f');

const MAX = 1000000;

const pointSet = [];
pointSet.push(a, b, c, d, e, f);

const distanceMap = [
    [0, 7, 5, MAX, MAX, MAX],
    [7, 0, 4, 6, 3, 10],
    [5, 4, 0, 8, MAX, 8],
    [MAX, 6, 8, 0, 9, 10],
    [MAX, 3, MAX, 9, 0, MAX],
    [MAX, 10, 8, 10, MAX, 0]
]

function prim(pointSet, distanceMap) {
    const set = [];
    set.push(pointSet[0]);
    while (true) {
        const minNode = getMinEndNode(pointSet, distanceMap, set)
        set.push(minNode);
        if (set.length === pointSet.length) {
            break;
        }
    }
    return pointSet;
}

function getMinEndNode(pointSet, distanceMap, set) {
    //分析起始点所在索引
    let minEndNode, startNode, distance = MAX;
    for (let i = 0; i < set.length; i++) {
        // console.log(i);
        for (let j = 0; j < pointSet.length; j++) {
            // console.log(j);
            const index = pointSet.indexOf(set[i]);
            if (!set.includes(pointSet[j]) && distanceMap[index][j] <= distance) {
                distance = distanceMap[index][j];
                startNode = set[i];
                minEndNode = pointSet[j];
            }
        }
    }
    startNode.neighbor.push(minEndNode);
    minEndNode.neighbor.push(startNode);
    return minEndNode
}

prim(pointSet, distanceMap)

pointSet.forEach(item => console.log(item));