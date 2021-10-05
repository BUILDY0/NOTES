const net = require('net');
const server = net.createServer();
server.listen(12306, '127.0.0.1');
server.on('listening', () => {
    console.log('服务端正在监听...');
})
server.on('connection', (socket) => {
    console.log('已与客户端建立连接！');
    socket.on('connect', () => {
        console.log(`客户端已连接`);
    })
    socket.on('data', (data) => {
        console.log(data.toString());
        socket.write('hello client!');
        socket.end();
        server.close();
    })
})