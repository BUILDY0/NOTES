const c = require('./db');

function queryStudentByClassAndSex(cls, sex, success) {
    // 创建mysql连接
    const connection = c();
    connection.connect(function () {
        console.log('mysql已连接！')
    })
    // 创建musql语句
    const querySql = 'select * from student where class = ? and sex = ?;';
    let result = null;
    // 数据验证;
    // console.log(cls, sex);
    cls = cls || 0;
    if (+sex === 1) {
        sex = '男';
    } else if (+sex === 2) {
        sex = '女';
    } else {
        sex = 0;
    }
    connection.query(querySql, [cls, sex], function (err, ret) {
        if (err === null) {
            // console.log(ret);
            success(ret);
        } else {
            // console.log(err);
            result = err;
        }
        connection.end();
        return result;
    })

}

function queryStudentByNum(num, success) {
    // 创建mysql连接
    const connection = c();
    connection.connect(function () {
        console.log('mysql已连接！')
    })
    // 创建musql语句
    const querySql = 'select * from student where num = ?;';
    let result = null;

    connection.query(querySql, num, function (err, ret) {
        if (err === null) {
            success(ret);
        } else {
            result = err;
        }
        connection.end();
        return result;
    })
}


module.exports = {
    queryStudentByClassAndSex,
    queryStudentByNum
}