let ws = require('nodejs-websocket');

let chatA = null,
    chatB = null;
console.log(ws);
ws.createServer((conn) => {
    // 收到文本请求
    conn.on("text", (msg) => {
        // 如果双方都建立了连接，可以通信
        if (chatA && chatB) {
            if (conn === chatA) {
                // 向另一个连接发讯息
                chatB.send(msg)
            } else {
                chatA.send(msg)
            }
            return
        }
        // 有人不在线上,判断登录口令
        if (msg === "chatA token") {
            // 保存连接以判断是否上线与发送讯息
            chatA = conn;
            return
        }
        if (msg === "chatB token") {
            chatB = conn;
        }
    })
    conn.on("close", () => {})
    conn.on("error", (code, reason) => {
        console.log("exit with error code " + code + ", reason:" + reason);
    })
}).listen(8888) // 监听 8888 端口
