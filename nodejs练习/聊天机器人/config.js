const fs = require('fs');
const path = require('path')


// console.log(path.resolve(__dirname, 'server.conf'));
let conf = fs.readFileSync(path.resolve(__dirname, 'service.conf')).toString().split('\r\n');
let config = {}
for (let i = 0; i < conf.length; i++) {
    let temp = conf[i].split('=');
    if (temp[1].indexOf('|') > 0) {
        temp[1] = temp[1].split('|');
    }
    config[temp[0]] = temp[1];
}

module.exports = config;