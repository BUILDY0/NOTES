const fs = require('fs');
const path = require('path')
const confs = {};
const conf = fs.readFileSync(path.resolve(__dirname, 'server.conf')).toString().split('\r\n');
for (let i = 0; i < conf.length; i++) {
    const temp = conf[i].split('=');
    confs[temp[0]] = temp[1];
}
module.exports = confs;