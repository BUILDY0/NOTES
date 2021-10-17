const request = require('request')

function chat(req, res, params) {
    if (params && params.text) {
        const temp = {
            "perception": {
                "inputText": {
                    "text": params.text,
                },
            },
            "userInfo": {
                "apiKey": "be3e88b9ae0c49b28582416c86a3f9b5",
                "userId": "123456"
            }
        };
        const content = JSON.stringify(temp);
        // console.log(content);
        request({
            url: 'http://openapi.turingapi.com/openapi/api/v2',
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: content
        }, function (error, resp, body) {
            if (!error && resp.statusCode === 200) {
                const ret = JSON.parse(body);
                // console.log(ret);
                if (ret && ret.results && ret.results.length !== 0 && ret.results[0].values) {
                    res.writeHead(200, {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*", //表示所有域名都能访问
                        // "Access-Control-Allow-Methods": "GET", //表示只允许请求
                        // "Access-Control-Allow-Headers": "x-request-with, content-type"
                    });
                    res.write(JSON.stringify(ret.results[0].values.text));
                    res.end();
                } else {
                    res.writeHead(200, {
                        "content-type": "application/json"
                    });
                    res.write(JSON.stringify({
                        "text": "我不知道你在说什么呢！请重新输入"
                    }));
                    res.end();
                }
            } else {
                res.writeHead(400);
                res.write('数据异常');
                res.end();
            }
        })
    } else {
        req.on('data', (data) => {
            const result = data.toString();
            const temp = {
                "perception": {
                    "inputText": {
                        "text": result,
                    },
                },
                "userInfo": {
                    "apiKey": "be3e88b9ae0c49b28582416c86a3f9b5",
                    "userId": "123456"
                }
            };
            const content = JSON.stringify(temp);
            // console.log(content);
            request({
                url: 'http://openapi.turingapi.com/openapi/api/v2',
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: content
            }, function (error, resp, body) {
                if (!error && resp.statusCode === 200) {
                    const ret = JSON.parse(body);
                    // console.log(ret);
                    if (ret && ret.results && ret.results.length !== 0 && ret.results[0].values) {
                        res.writeHead(200, {
                            "content-type": "application/json",
                            "Access-Control-Allow-Origin": "*", //表示所有域名都能访问
                            "Access-Control-Allow-Methods": "GET", //表示只允许请求
                            "Access-Control-Allow-Headers": "x-request-with, content-type"
                        });
                        res.write(JSON.stringify(ret.results[0].values.text));
                        res.end();
                    } else {
                        res.writeHead(200, {
                            "content-type": "application/json"
                        });
                        res.write(JSON.stringify({
                            "text": "我不知道你在说什么呢！请重新输入"
                        }));
                        res.end();
                    }
                } else {
                    res.writeHead(400);
                    res.write('数据异常');
                    res.end();
                }
            })
        })
    }

}

module.exports = ['/chat', chat]