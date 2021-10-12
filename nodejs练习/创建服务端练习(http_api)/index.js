const http = require('http');
const url = require('url');
const fs = require('fs')
const conf = require('./config');
const loader = require('./loader');
const path = require('path');
const log = require('./log')
http.createServer((request, response) => {
    const pathName = url.parse(request.url).pathname;
    const params = url.parse(request.url, true).query;
    // 判断是否读取静态资源
    if (isStatic(pathName)) {
        // 加载静态资源
        try {
            const data = fs.readFileSync(path.resolve(__dirname, conf.page_path + pathName))
            loader.return200(response, data);
            log(`读取${path.resolve(__dirname, conf.page_path + pathName)}成功`);
        } catch (error) {
            loader.return404(response);
            log(`读取${path.resolve(__dirname, conf.page_path + pathName)}失败`);
        }
    } else {
        // 加载动态资源
        // console.log('加载动态资源');
        // console.log(pathName, params);
        if (loader.pathMap.get(pathName)) {
            try {
                loader.pathMap.get(pathName)(request, response, params);
                log(`读取 pathMap[${pathName}] 成功`);
            } catch (error) {
                loader.return404(response);
                log(`读取 pathMap[${pathName}] 失败`);
            }
        } else {
            log(`在pathMap中未找到${pathName} 失败`);
        }

    }
}).listen(conf.port)

function isStatic(url) {
    const urlLen = url.length;
    const target = conf.statics_sign.split('|');
    for (let i = 0; i < target.length; i++) {
        if (url.indexOf(target[i]) === urlLen - target[i].length) {
            return true;
        }
    }
    return false;
}