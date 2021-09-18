import * as map from './map.js';

/**
 * 
 */
export const unitWidth = 45,
    unitHeight = 45,
    SPACE = 0,
    PLAYER = 1,
    WALL = 2,
    BOX = 3,
    rowLen = map.content[0].length,
    colLen = map.content.length;

const gameDiv = document.getElementsByClassName('game')[0];

function isCorrectPlace(row, col) {
    if (map.correct.find(obj => obj.row === row && obj.col === col)) {
        return true;
    }
    return false;
}

export function render() {
    // mainmap
    gameDiv.innerHTML = '';
    gameDiv.style.width = rowLen * unitWidth + 'px';
    gameDiv.style.height = colLen * unitHeight + 'px';
    // Item
    for (let row = 0; row < map.content.length; row++) {
        for (let col = 0; col < map.content[row].length; col++) {
            const div = document.createElement('div');
            div.className = 'item';
            div.style.left = col * unitWidth + 'px';
            div.style.top = row * unitHeight + 'px';
            if (map.content[row][col] === PLAYER) {
                div.classList.add('player');
            } else if (map.content[row][col] === WALL) {
                div.classList.add('wall');
            } else if (map.content[row][col] === BOX) {
                if (isCorrectPlace(row, col)) {
                    div.classList.add('correct-box');
                } else {
                    div.classList.add('box');
                }
            } else if (map.content[row][col] === SPACE) {
                if (isCorrectPlace(row, col)) {
                    div.classList.add('correct')
                } else {
                    continue;
                }
            }
            gameDiv.appendChild(div);
        }

    }
}