const hou = ['d', 'e', 'b', 'f', 'g', 'c', 'a']
const zhong = ['d', 'b', 'e', 'a', 'f', 'c', 'g']

function huanyuan(hou, zhong) {
    if (hou === null || zhong === null || hou.length === 0 || zhong.length === 0 || zhong.length !== hou.length) {
        return null
    }
    const root = new Node(hou[hou.length - 1]);
    const rootIndex = zhong.indexOf(root.value)
    const houLeft = hou.slice(0, rootIndex);
    const houRight = hou.slice(rootIndex, rootIndex + houLeft.length);
    const zhongLeft = zhong.slice(0, rootIndex);
    const zhongRight = zhong.slice(rootIndex + 1, rootIndex.length);
    root.left = huanyuan(houLeft, zhongLeft);
    root.right = huanyuan(houRight, zhongRight);
    return root
}

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

const root = huanyuan(hou, zhong);

console.log(root);