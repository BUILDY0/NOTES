const mysql = require('mysql');
const connection = function () {
    return mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'mysql666',
        database: 'school'
    });
};
module.exports = connection;