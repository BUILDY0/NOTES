import {
    move
} from "./play.js";
import {
    correct,
    content
} from "./map.js";
import {
    BOX,
    render
} from "./ui.js";

// 注册事件
let isWinState = false;


function isWin() {
    for (const val of correct) {
        const row = val.row,
            col = val.col;
        if (content[row][col] !== BOX) return false
    }
    return true;
}

document.addEventListener('keydown', e => {
    if (isWinState) {
        return;
    }
    if (e.key === 'ArrowUp') {
        lastMap.push(JSON.parse(JSON.stringify(content)));
        move('up');
    }
    if (e.key === 'ArrowDown') {
        lastMap.push(JSON.parse(JSON.stringify(content)));
        move('down');
    }
    if (e.key === 'ArrowLeft') {
        lastMap.push(JSON.parse(JSON.stringify(content)));
        move('left');
    }
    if (e.key === 'ArrowRight') {
        lastMap.push(JSON.parse(JSON.stringify(content)));
        move('right');
    }
    if (isWin()) {
        setTimeout(() => {
            alert('游戏胜利！');
        }, 0);
        isWinState = true;
    };

})

// 反悔
const lastMap = [];
lastMap[0] = JSON.parse(JSON.stringify(content));

document.addEventListener('keypress', e => {
    if (lastMap.length && !isWinState) {
        if (e.charCode === 26) {
            let data = lastMap.pop()
            for (let i = 0; i < data.length; i++) {
                content[i] = data[i]
            }
            // console.log(content);
            render();
        }
    }
})