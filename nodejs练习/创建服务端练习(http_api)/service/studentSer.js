const {
    dao
} = require('../dao')

function queryStudent(cls, sex, success) {
    return dao.queryStudentByClassAndSex(cls, sex, success);
}

function queryStudentNum(num, success) {
    return dao.queryStudentByNum(num, success);
}
module.exports.ser = {
    queryStudent,
    queryStudentNum
}