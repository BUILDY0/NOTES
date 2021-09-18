module.exports = {
    sortRandom(arr) {
        return arr.sort((a, b) => Math.random() - 0.5)
    },
    print(arr) {
        let str = ''
        for (const val of arr) {
            str += val + '   ';
        }
        return str;
    }
}