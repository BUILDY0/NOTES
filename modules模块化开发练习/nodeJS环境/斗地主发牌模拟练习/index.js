// 创建54张牌库
const Poker = require('./poker.js')
const arr = []
for (let i = 1; i <= 13; i++) {
    // i 是扑克牌点数
    for (let j = 1; j <= 4; j++) {
        // j 是扑克牌花色
        arr.push(new Poker(i, j).toString())
    }
}
arr.push(new Poker(14, null).toString(), new Poker(15, null).toString());


//  洗牌
const util = require('./util.js')
util.sortRandom(arr);
console.log('牌库已经准备好了！');
console.log(util.print(arr));


// 发牌
const player1 = arr.slice(0, 17);
const player2 = arr.slice(17, 34);
const player3 = arr.slice(34, 51);
const desk = arr.slice(51, 54);
console.log('player1：   ' + util.print(player1));
console.log('player2：   ' + util.print(player2));
console.log('player3：   ' + util.print(player3));
console.log('desk：   ' + util.print(desk));
// console.log(process.env.NODE_ENV);