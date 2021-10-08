function ajax(url) {
    if (!typeof url === 'string') return;
    if (window.XMLHttpRequest) {
        var xhr = new window.XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    xhr.open('get', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var ret = JSON.parse(xhr.responseText)
            console.log(ret);
            Object.values(ret).forEach(function (val) {
                var oDiv = document.createElement('div');
                oDiv.innerHTML += val
                document.body.appendChild(oDiv);
            })
        }
    }
    xhr.send(null);

    // readyState == 4表示请求完成，已经接收到数据。
    // status == 200  网络请求，结果都会有一个状态码。来表示这个请求是否正常
    // 200表示请求成功
    // http状态码
    // 2**表示成功
    // 3**表示重定向
    // 4**表示客户端错误,404页面没找到。
    // 5**表示服务端错误
}