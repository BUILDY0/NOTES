function Node(value) {
    this.value = value;
    this.neighbor = [];
}

const a = new Node('A');
const b = new Node('B');
const c = new Node('C');
const d = new Node('D');
const e = new Node('E');
const f = new Node('F');

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

function kruskal(pointSet, distanceMap) {
    let mix = [], //mix为部落，判断是否能连接
        distance = MAX,
        beginNode, endNode;

    while (true) { //循环找出第二小的线段，并判断端点是否能连结
        distance = MAX;
        for (let i = 0; i < distanceMap.length; i++) {
            for (let j = 0; j < pointSet.length; j++) {
                if (i === j) continue;
                const tempBegin = pointSet[i];
                const tempEnd = pointSet[j];
                if (distanceMap[i][j] < distance && canLink(tempBegin, tempEnd, mix)) {
                    distance = distanceMap[i][j]
                    beginNode = pointSet[i];
                    endNode = pointSet[j]
                }
            }
        }
        mixLink(beginNode, endNode, mix);
        const pointSetLen = pointSet.length
        if (mix.length === 1 && mix[0].length === pointSetLen) {
            break;
        }
    }
}

function canLink(beginNode, endNode, mix) {
    let beginIndex = -1,
        endIndex = -1;
    mix.length !== 0 && mix.forEach((item, index) => {
        if (item.includes(beginNode)) {
            beginIndex = index;
        }
        if (item.includes(endNode)) {
            endIndex = index;
        }
    });
    if (beginIndex > -1 && endIndex > -1 && beginIndex === endIndex) { //说明和部落重复了
        return false;
    }
    return true;

}

function mixLink(beginNode, endNode, mix) {
    let beginIndex = -1,
        endIndex = -1;
    mix.forEach((item, index) => {
        if (item.includes(beginNode)) {
            beginIndex = index
        }
        if (item.includes(endNode)) {
            endIndex = index
        }
    });
    endNode.neighbor.push(beginNode);
    beginNode.neighbor.push(endNode);
    if (beginIndex > -1 && endIndex === -1) { //起点存在，另一个点不存在需要连接
        mix[beginIndex].push(endNode)
    } else if (beginIndex === -1 && endIndex > -1) { //终点存在，另一个不存在需要连接
        mix[endIndex].push(beginNode)
    } else if (beginIndex === -1 && endIndex === -1) { //两个点都不存在需要创建新线段
        mix.push([beginNode, endNode]);
    } else if (beginIndex > -1 && endIndex > -1 && beginIndex !== endIndex) { //这条正是两条不相连线段的连接线
        mix[beginIndex] = [...mix[beginIndex], ...mix[endIndex]];
        mix.splice(endIndex, 1);
    }
}

kruskal(pointSet, distanceMap);

pointSet.forEach(item => console.log(item));