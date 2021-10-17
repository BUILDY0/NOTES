// 加载动态资源的模块
const fs = require('fs');
const config = require('./config');
const path = require('path')
const dirs = fs.readdirSync(path.resolve(__dirname, config['web_path']));

const loader = new Map()
if (dirs) {
    for (let i = 0; i < dirs.length; i++) {
        const temp = require(path.resolve(__dirname, config['web_path'], dirs[i]));
        // temp[0]是key值；temp[1]是value值
        loader.set(temp[0], temp[1])
    }
}

module.exports = loader;