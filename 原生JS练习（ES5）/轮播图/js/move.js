var lunbo = function () {//公共域
    //initial variale
    var elem = document.getElementsByTagName('ul')[0],
        img = document.getElementsByTagName('img')[0],
        count = elem.getElementsByTagName('img').length - 1,//有效图片数量
        width = img.width,
        num = 0,//计数器
        key = true,
        ul = document.getElementsByTagName('ul')[1],
        a = ul.getElementsByTagName('a'),
        len = a.length,
        pos = [];//变量pos储存绝对位置数据
    for (var i = 0; i <= len; i++) {
        pos.push(i * width);
    }
    var pointer = 0,
        liTimer,
        maxLeft = count * width,
        minLeft = 0;
    //initial statements
    elem.style.position = "relative";
    elem.style.left = "0px";
    // console.log(pos);
    function pointerReset() {//方法：指针复原
        var timer = setInterval(function () {
            // console.log(pointer);
            pointer = parseInt(parseInt(elem.style.left) / width);
            if (parseInt(elem.style.left) / width >= count) {
                pointer = 0;
                elem.style.left = "0px";
            }
        }, 10)
    };
    function elemMove() {//图片移动
        var ulTimer = setInterval(function () {
            if (key) {
                clearInterval(liTimer);//挂在后台不会判断if，造成多个计时器启动无法停止，每次运行先清除一次。
                liTimer = setInterval(function () {
                    elem.style.left = parseInt(elem.style.left) + 5 + "px";
                    if (!key || parseInt(elem.style.left) >= pos[pointer + 1]) {
                        // console.log(parseInt(window.getComputedStyle(img, null).width));
                        clearInterval(liTimer);
                        elem.style.left = pos[pointer + 1] + "px";
                        pointMove();
                    }
                }, 10)
            } else { clearInterval(liTimer); }
        }, 3000)
    };
    function pointMove() {//所指处圆点高亮显示
        for (var i = 0; i < len; i++) {
            a[i].className = "";
        }
        setTimeout(function () {
            a[pointer].className = "active";
        }, 20)
    };
    function imgPointAt() {//指针click圆点跳转至对应图
        for (var i = 0; i < a.length; i++) {
            a[i].onclick = function () {
                //先清除自动放映影响
                key = false;
                clearInterval(liTimer);//
                var stopPoint = this.title * width;
                if (parseInt(elem.style.left) - stopPoint < 0) {
                    var timer1 = setInterval(function () {
                        elem.style.left = parseInt(elem.style.left) + 10 + "px";
                        if (parseInt(elem.style.left) >= stopPoint) { //left是字符串，要先转化
                            clearInterval(timer1);
                            elem.style.left = stopPoint + "px";
                            key = true;
                            pointMove();
                        }
                    }, 1)
                } else if (parseInt(elem.style.left) - stopPoint > 0) {
                    var timer2 = setInterval(function () {
                        elem.style.left = parseInt(elem.style.left) - 10 + "px";
                        if (parseInt(elem.style.left) <= stopPoint) {
                            clearInterval(timer2);
                            elem.style.left = stopPoint + "px";
                            key = true;
                            pointMove();
                        }
                    }, 1)
                } else {
                    key = true;
                    return false;
                }
            }
        }
    };
    function slider() {//左右滑动功能
        var a = document.getElementsByClassName('slider'),
            len = a.length;
        for (var i = 0; i < len; i++) {
            a[i].onclick = function () {
                if (key) {
                    //先清除自动放映影响
                    key = false;
                    clearInterval(liTimer);//
                    // console.log(this.getAttribute("data-temp"));
                    var stopPoint;
                    switch (this.getAttribute("data-temp")) {
                        case "0":
                            if (pos[pointer]) {
                                stopPoint = pos[pointer - 1];
                                var timer1 = setInterval(function () {
                                    // console.log(parseInt(elem.style.left));
                                    elem.style.left = parseInt(elem.style.left) - 10 + "px";
                                    if (parseInt(elem.style.left) <= stopPoint) {
                                        clearInterval(timer1);
                                        elem.style.left = stopPoint + "px";
                                        key = true;
                                        pointMove();
                                    }
                                }, 1)
                            } else {
                                elem.style.left = pos[count] + "px";
                                stopPoint = pos[count - 1];
                                var timer = setInterval(function () {
                                    elem.style.left = parseInt(elem.style.left) - 10 + "px";
                                    if (parseInt(elem.style.left) <= stopPoint) {
                                        clearInterval(timer);
                                        elem.style.left = stopPoint + "px";
                                        key = true;
                                        pointMove();
                                    }
                                }, 1)}
                                break;
                        case "1":
                            var timer2 = setInterval(function () {
                                elem.style.left = parseInt(elem.style.left) + 10 + "px";
                                if (parseInt(elem.style.left) >= pos[pointer + 1]) {
                                    clearInterval(timer2);
                                    elem.style.left = pos[pointer + 1] +"px";
                                    key = true;
                                    pointMove();
                                }
                            }, 1)
                            break;
                    }
                } else { return false; }
            }
        }
    };
    return function () {
        elemMove();
        pointMove();
        imgPointAt();
        slider();
        pointerReset();
    };
}
window.onload = function () {
    lunbo()();
}