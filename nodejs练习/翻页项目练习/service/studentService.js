const studentDao = require('../dao/studentDao')

function queryStudentAll(success) {
    studentDao.queryStudentAll(success);
}

function queryStudentByLimit(offset, num, success) {
    studentDao.queryStudentByLimit(offset, num, success);
}

module.exports = {
    queryStudentAll,
    queryStudentByLimit
}