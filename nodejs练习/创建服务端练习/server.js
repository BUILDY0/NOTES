const fs = require('fs')
const net = require('net');
const server = net.createServer();
const config = require('./config');
server.listen(config.port, config.domain);


server.on('listening', () => {
    console.log('服务已启动');
})

server.on('connection', socket => {
    socket.on('data', data => {
        const url = data.toString().split('\r\n')[0].split(' ')[1];
        try {
            const dataFile = fs.readFileSync(__dirname + url);
            socket.write('HTTP/1.1 200OK\r\n\r\n');
            socket.write(dataFile);
        } catch (error) {
            socket.write('HTTP/1.1 404NotFound\r\n\r\n<html><body><h1>404NotFound</h1></body></html>')
        }
        socket.end();
    })

})