// new Poker(4, 1) return {color : 4, number : 1}
class Poker {
    constructor(number, color) {
        this.color = color;
        this.number = number;
    }

    toString() {
        let str = '';
        // 花色处理
        switch (this.color) {
            case 1:
                str += '♠';
                break;
            case 2:
                str += '♥';
                break;
            case 3:
                str += '♣';
                break;
            case 4:
                str += '♦';
                break;
            default:
                '';
        }
        // 点数处理
        if (this.number <= 10) {
            str += this.number;
        }
        if (this.number === 11) {
            str += 'J';
        }
        if (this.number === 12) {
            str += 'Q'
        }
        if (this.number === 13) {
            str += 'K'
        }
        if (this.number === 14) {
            str += 'joker'
        }
        if (this.number === 15) {
            str += 'joker'.toUpperCase()
        }
        return str;
    }
}
module.exports = Poker;