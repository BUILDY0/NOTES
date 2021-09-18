import * as map from "./map.js";
import * as ui from './ui.js'

/**
 * 找某物在地图中的位置
 * @param {*} params 
 * @returns 
 */
function findPos(params) {
    const row = map.content.findIndex(num => num.includes(params));
    const col = map.content[row].findIndex(num => num === params);
    return {
        row,
        col
    };
}

function nextIsWhat(row, col, derection) {
    if (derection === 'up') {
        const next = map.content[row - 1][col];
        if (next === ui.WALL) {
            return ui.WALL;
        } else if (next === ui.BOX) {
            return ui.BOX
        }
    }
    if (derection === 'down') {
        const next = map.content[row + 1][col];
        if (next === ui.WALL) {
            return ui.WALL;
        } else if (next === ui.BOX) {
            return ui.BOX
        }
    }
    if (derection === 'left') {
        const next = map.content[row][col - 1];
        if (next === ui.WALL) {
            return ui.WALL;
        } else if (next === ui.BOX) {
            return ui.BOX
        }
    }
    if (derection === 'right') {
        const next = map.content[row][col + 1];
        if (next === ui.WALL) {
            return ui.WALL;
        } else if (next === ui.BOX) {
            return ui.BOX
        }
    }
    return ui.SPACE;
}

function exchangePos({
    row: row1,
    col: col1
}, {
    row: row2,
    col: col2
}) {
    const temp = map.content[row2][col2];
    map.content[row2][col2] = map.content[row1][col1];
    map.content[row1][col1] = temp;
}

/**
 * 角色移动主函数
 * @param {*} derection 移动的方向
 */
export function move(derection) {
    const playerPos = findPos(ui.PLAYER)
    // 判断下一个移动位置的是什么东西
    if (derection === 'up') {
        if (nextIsWhat(playerPos.row, playerPos.col, derection) === ui.WALL) {
            return;
        } else if (nextIsWhat(playerPos.row, playerPos.col, derection) === ui.BOX) {
            if (nextIsWhat(playerPos.row - 1, playerPos.col, derection) === ui.WALL || nextIsWhat(playerPos.row - 1, playerPos.col, derection) === ui.BOX) {
                return;
            } else {
                exchangePos({
                    row: playerPos.row - 1,
                    col: playerPos.col
                }, {
                    row: playerPos.row - 2,
                    col: playerPos.col
                });

                exchangePos(playerPos, {
                    row: playerPos.row - 1,
                    col: playerPos.col
                });
            }
        } else {
            exchangePos(playerPos, {
                row: playerPos.row - 1,
                col: playerPos.col
            })
        }
    } else if (derection === 'down') {
        if (nextIsWhat(playerPos.row, playerPos.col, derection) === ui.WALL) {
            return;
        } else if (nextIsWhat(playerPos.row, playerPos.col, derection) === ui.BOX) {
            if (nextIsWhat(playerPos.row + 1, playerPos.col, derection) === ui.WALL || nextIsWhat(playerPos.row + 1, playerPos.col, derection) === ui.BOX) {
                return;
            } else {
                exchangePos({
                    row: playerPos.row + 1,
                    col: playerPos.col
                }, {
                    row: playerPos.row + 2,
                    col: playerPos.col
                });

                exchangePos(playerPos, {
                    row: playerPos.row + 1,
                    col: playerPos.col
                });
            }
        } else {
            exchangePos(playerPos, {
                row: playerPos.row + 1,
                col: playerPos.col
            })
        }
    } else if (derection === 'left') {
        if (nextIsWhat(playerPos.row, playerPos.col, derection) === ui.WALL) {
            return;
        } else if (nextIsWhat(playerPos.row, playerPos.col, derection) === ui.BOX) {
            if (nextIsWhat(playerPos.row, playerPos.col - 1, derection) === ui.WALL || nextIsWhat(playerPos.row, playerPos.col - 1, derection) === ui.BOX) {
                return;
            } else {
                exchangePos({
                    row: playerPos.row,
                    col: playerPos.col - 1
                }, {
                    row: playerPos.row,
                    col: playerPos.col - 2
                });

                exchangePos(playerPos, {
                    row: playerPos.row,
                    col: playerPos.col - 1
                });
            }
        } else {
            exchangePos(playerPos, {
                row: playerPos.row,
                col: playerPos.col - 1,
            })
        }
    } else if (derection === 'right') {
        if (nextIsWhat(playerPos.row, playerPos.col, derection) === ui.WALL) {
            return;
        } else if (nextIsWhat(playerPos.row, playerPos.col, derection) === ui.BOX) {
            if (nextIsWhat(playerPos.row, playerPos.col + 1, derection) === ui.WALL || nextIsWhat(playerPos.row, playerPos.col + 1, derection) === ui.BOX) {
                return;
            } else {
                exchangePos({
                    row: playerPos.row,
                    col: playerPos.col + 1
                }, {
                    row: playerPos.row,
                    col: playerPos.col + 2
                });

                exchangePos(playerPos, {
                    row: playerPos.row,
                    col: playerPos.col + 1
                });
            }
        } else {
            exchangePos(playerPos, {
                row: playerPos.row,
                col: playerPos.col + 1
            })
        }
    }
    ui.render();
}