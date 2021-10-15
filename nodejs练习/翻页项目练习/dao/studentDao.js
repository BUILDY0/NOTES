const dbUtil = require('./dbUtil');

function queryStudentAll(success) {
    const sql = 'select count(1) as count from student;'
    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(sql, function (err, result) {
        if (err === null) {
            success(result);
        }
        connection.end();
    })
}

function queryStudentByLimit(offset, num, success) {
    const sql = 'select * from student limit ?,?;'
    const connection = dbUtil.createConnection();
    connection.connect();
    const params = [offset, num];
    connection.query(sql, params, function (err, result) {
        if (err === null) {
            success(result);
        }
        connection.end();
    })
}
module.exports = {
    queryStudentAll,
    queryStudentByLimit
}