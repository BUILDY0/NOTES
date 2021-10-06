const net = require('net');
const server = net.createServer();
server.listen(80, '127.0.0.1')

server.on("listening", () => {
    console.log('服务器已连接！');
})

server.on('connection', (socket) => {
    socket.on('data', (data) => {
        console.log(data.toString());
        socket.write('HTTP 200OK\r\nContent-type:text/html\r\nServer:hello/1.1\r\n\r\n<html><body>hello broswer!</body></html>')
    })
})