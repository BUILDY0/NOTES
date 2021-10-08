const fs = require('fs');
const conf = fs.readFileSync('base.conf').toString().split('\r\n');
const confs = {};
conf.forEach(val => {
    let temp = val.split('=');
    confs[temp[0]] = temp[1];
})
module.exports = confs