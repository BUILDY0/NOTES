const {
    Compilation
} = require("webpack");

module.exports = class myplugin {
    constructor(filename = 'filename.txt') {
        this.filename = filename;
    }
    apply(compiler) {
        compiler.hooks.emit.tap('myplugin', compilation => {
            let str = '';
            for (const key in compilation.assets) {
                str += `【${key}】\n大小：${(Math.floor(compilation.assets[key].size() * 100 / 1024)/100).toFixed(2)}KB\n\n`
            }
            compilation.assets[this.filename] = {
                source() {
                    return str;
                },
                size() {
                    return str.length;
                }
            }
        })
    }
}