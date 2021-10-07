const net = require('net');
const socket = net.connect(12306, '127.0.0.1')
socket.setTimeout(2000, () => {
    console.log('服务端已超时！');
})

socket.on('close', () => {
    console.log('服务器已断开！');
})

socket.write('hello server!');

socket.on('data', (data) => {
    console.log(data.toString());
})