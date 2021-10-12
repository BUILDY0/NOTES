// 状态码管理
function return200(response, data) {
    response.writeHead(200);
    response.write(data);
    response.end();
}

function return404(response) {
    response.writeHead(404);
    response.write(`<html><body><h1>404 NotFound</h1></body></html>`);
    response.end();
}

// 动态请求管理
const fs = require('fs');
const p = require('path');
const conf = require('./config');

const pathMap = new Map();
const webDirs = fs.readdirSync(p.resolve(__dirname, conf.web_path));
for (let i = 0; i < webDirs.length; i++) {
    try {
        const temp = require(p.resolve(__dirname, conf.web_path, webDirs[i]));
        if (temp.path) {
            for (const [k, v] of temp.path) {
                if (pathMap.get(k)) {
                    throw new Error('one key of pathMap repeated! key:' + k);
                } else {
                    pathMap.set(k, v);
                }
            }
        }
    } catch (error) {
        console.log(error);
        continue;
    }
}

module.exports = {
    return200,
    return404,
    pathMap
}