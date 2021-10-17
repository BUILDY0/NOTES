const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path')
const conf = require('./config')
const loader = require('./loader')

http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;
    const params = url.parse(req.url, true).query

    // 读取静态资源
    if (isStatic(pathName)) {
        // console.log(path.resolve(__dirname, '.' + pathName));
        if (pathName === '/') {
            res.writeHead(302, {
                location: '/index.html'
            });
            res.end();
        } else {
            try {
                let data;
                try {
                    data = fs.readFileSync(path.resolve(__dirname + pathName));
                } catch (error) {
                    data = fs.readFileSync(path.resolve(__dirname, conf['page_path'] + pathName));
                }
                res.writeHead(200);
                res.write(data);
                res.end();
            } catch (error) {
                res.writeHead(404);
                res.write('<html><body><h1>404 NotFound</h1></body></html>');
                res.end()
            }
        }
    } else {
        // 读取动态资源
        if (loader.get(pathName)) {
            try {
                loader.get(pathName)(req, res, params);
            } catch (error) {
                res.writeHead(502);
                res.write('<html><body><h1>Bad Gateway</h1></body></html>');
                res.end()
                throw new Error('web端处理函数写错');
            }
        } else {
            res.writeHead(404);
            res.write('<html><body><h1>404 NotFound</h1></body></html>');
            res.end()
        }
    }
}).listen(80);

function isStatic(pathName) {
    const assets = conf['static_assets']
    for (let i = 0; i < assets.length; i++) {
        if (pathName.indexOf(assets[i]) === pathName.length - assets[i].length) {
            return true;
        }
    }
    return false;
}