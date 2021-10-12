const {
    ser
} = require('../service/studentSer');

function getData(req, res, {
    cls,
    sex
}) {
    if (cls || sex) {
        ser.queryStudent(cls, sex, function (result) {
            res.setHeader('content-Type', 'application/json;charset=utf-8');
            res.write(JSON.stringify(result));
            res.end();
            // console.log('回调成功');
        })
    } else {
        res.writeHead(404);
        res.write(`<html><body><h1>404 NotFound</h1></body></html>`);
        res.end();
    }
}
const path = new Map();
path.set('/getData', getData);
module.exports.path = path;