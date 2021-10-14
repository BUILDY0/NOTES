const {
    ser
} = require('../service/studentSer')

function login(req, res, params) {
    function getExpireTime() {
        let time = new Date();
        time.setTime(time.getTime() + 1000 * 60 * 60 * 24 * 15);
        return time.toUTCString();
    }

    function resHandle(status, num, pwd) {
        if (status === 'ok') {
            res.writeHead(302, {
                location: '/login.html',
                "Set-Cookie": `num=${num};expires=${getExpireTime()};pwd=${pwd};expires=${getExpireTime()};abc=123;expires=${getExpireTime()}`,
            });

            // res.write('ok');
            res.end();
        } else {
            res.writeHead(302, {
                location: '/register.html',
            });
            // res.write('fail')
            res.end();
            // location.href = '/register.html'
        }
    }
    // post请求
    req.on('data', (data) => {
        data = data.toString();
        console.log(data);
        let num = /num=(\d+)/.exec(data)[1];
        let pwd = /pwd=(\w+)/.exec(data)[1];
        ser.queryStudentNum(num, function (result) {
            console.log(result);
            if (result !== null && result.length !== 0) {
                if (result[0].pwd === pwd) {
                    resHandle('ok', num, pwd);
                } else {
                    resHandle('fail', num, pwd);
                }
            } else {
                resHandle('fail', num, pwd);
            }
        })
    })

    // cookie
    // 服务器端读取cookie
    // console.log(req.headers.cookie);
    // req.cookie = {}
    // let cookies = req.headers.cookie ? req.headers.cookie.split(';') : []
    // if (cookies.length > 0) {
    //     cookies.forEach(item => {
    //         if (item) {
    //             let cookieArray = item.split('=')
    //             if (cookieArray && cookieArray.length > 0) {
    //                 let key = cookieArray[0].trim()
    //                 let value = cookieArray[1] ? cookieArray[1].trim() : undefined
    //                 req.cookie[key] = value
    //             }
    //         }
    //     })
    // }
    // 服务器端设置cookie

    // res.setHeader('Set-Cookie', `key1=value1;httpOnly;expires=${getExpireTime()}`)
    // res.end(
    //     JSON.stringify(req.cookie)
    // )

}
const path = new Map();
path.set('/login', login);
module.exports.path = path;