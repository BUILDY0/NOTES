const {
    ser
} = require('../service/studentSer')

function login(req, res, params) {
    function resHandle(status) {
        if (status === 'ok') {
            res.writeHead(200);
            res.write('ok');
            res.end();
        } else {
            res.writeHead(404);
            res.write('fail')
            res.end()
        }
    }
    req.on('data', (data) => {
        data = data.toString();
        let num = /num=(\d+)/.exec(data)[1];
        let pwd = /pwd=(\w+)/.exec(data)[1];
        ser.queryStudentNum(num, function (result) {
            console.log(result);
            if (result !== null && result.length !== 0) {
                if (result[0].pwd === pwd) {
                    resHandle('ok');
                } else {
                    resHandle('fail');
                }
            } else {
                resHandle('fail');
            }
        })
    })
}
const path = new Map();
path.set('/login', login);
module.exports.path = path;