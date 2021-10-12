const fs = require('fs');
const p = require('path')
/**
 * 生成日志
 * @param {String} str 字符串
 * @param {Object} [option] 设置flag值，默认为{flag:'a'}(追加模式）,可选值w/r分别为可写/可读
 * @param {Function} [cb] callback_fn
 */
function log(str, cb, option) {
    try {
        cb = cb || function () {};
        option = option || {
            flag: 'a'
        };
        const now = new Date();
        fs.writeFile(p.resolve(__dirname, 'log.txt'), `${now.toLocaleString()} ${str}\n`, option, cb);
        console.log('日志已生成！');
    } catch (error) {
        throw new Error('生成文件错误!\n', error);
    }
}


module.exports = log