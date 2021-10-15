const http = require('http');
const url = require('url');
const fs = require('fs')
const path = require('path');
const studentService = require('./service/studentService')

http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;
    const params = url.parse(req.url, true).query

    const isStatic = isStaticRequest(pathName);
    if (isStatic) { //读页面
        try {
            const data = fs.readFileSync(path.resolve(__dirname, './page' + pathName))
            res.writeHead(200);
            res.write(data);
            res.end();
        } catch (error) {
            res.writeHead(404);
            res.write('<html><body><h1>404 NotFound</h1></body></html>')
            res.end();
        }
    } else {
        // console.log(params);
        // 访问接口
        if (pathName === '/getData') {
            let offset = +params.offset;
            let limit = +params.limit;
            // console.log(offset, limit);
            studentService.queryStudentAll(function (totalNum) {
                studentService.queryStudentByLimit(offset, limit, function (result) {
                    res.writeHead(200, {
                        "Content-Type": "application/json; charset=utf8",
                    });
                    res.write(JSON.stringify({
                        total: totalNum[0].count,
                        rows: result
                    }));
                    res.end();
                })
            })
        }
    }

}).listen(80, '127.0.0.1');

function isStaticRequest(pathName) {
    const auth = ['.html', '.css', '.js', '.jpg', '.png', '.gif'];
    for (let i = 0; i < auth.length; i++) {
        if (pathName.indexOf(auth[i]) === pathName.length - auth[i].length) {
            return true;
        }
    }
    return false;
}