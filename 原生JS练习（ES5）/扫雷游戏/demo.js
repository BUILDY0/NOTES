//today
//1.gameover后要remove鼠标点击事件 //ok
//2.通关页面（通关条件a插旗减少剩余雷数到0，或所有非雷的标签全部添加） 
//3.右键插旗功能
//按回车会触发重新加载的func

//variable
var squr = 10;
var setMine = 10;
var restMine = 10;
var currentMine = 10;
var data = {};
//reference
var mineBox = document.getElementsByClassName('mineBox')[0];
var alertGameover = document.getElementsByClassName('alertGameover')[0];
var close = document.getElementsByClassName('close')[0];
var graphArea = document.getElementsByClassName('graphArea')[0];
var startBtn = document.getElementsByClassName('startBtn')[0];
var alertCongratulation = document.getElementsByClassName('alertCongratulation')[0];
var span = document.getElementsByTagName('span')[0];

startBtn.addEventListener("mousedown", reset);
document.addEventListener("keydown", function(e){
    var event = e || window.event;
    if(event.code == "Enter"){
        reset();
    }
});
close.addEventListener("mousedown", function () {
    reset();
})

init();
function reset() {
    mineBox.innerHTML = "";
    graphArea.style.display = 'block';
    mineBox.style.display = 'block';
    close.style.display = 'none';
    alertGameover.style.display = 'none';
    data = {}; 
    init();
}
function init() {//添加格子
    mineBox.oncontextmenu = function () { return false; };
    mineBox.onselectstart = function () { return false; };
    loadIni();
    for (var i = 1; i <= squr; i++) {
        for (var j = 1; j <= squr; j++) {
            data[i + "-" + j] = 0;
            var div = document.createElement('div');
            div.id = "" + i + "-" + j;
            div.className = "mine"
            mineBox.appendChild(div);
            div.addEventListener("mousedown", addMouseEvents);
        }
    }
    for (var mark = {}; currentMine;) {//随机添加雷； 
        var marked = Math.floor(Math.random() * squr) + "-" + Math.floor(Math.random() * squr);
        if (!mark[marked] && document.getElementById(marked)) {
            mark[marked] = marked;
            var isMine = document.getElementById(marked);
            isMine.classList.add('isMine');
            currentMine --;
        }
    }
    for (var prop in data) {//遍历对象data
        for (var i = +prop.split('-')[0] - 1; i <= +prop.split('-')[0] + 1; i++) {
            for (var j = +prop.split('-')[1] - 1; j <= +prop.split('-')[1] + 1; j++) {
                var around = document.getElementById(i + "-" + j);
                if (around && around.classList.contains('isMine')) {
                    data[prop]++;
                }
            }
        }
    }
}
function changeRestmine() {//改变剩余雷数文本
    var span = document.getElementsByTagName('span')[0];
    span.innerHTML = "剩余雷数：" + restMine;
}
function addMouseEvents(e) {
    var event = e || window.event,
        target = event.target,
        targetX = +target.id.split('-')[0],
        targetY = +target.id.split('-')[1];
    if (event.button == 0) {
        if (target.classList.contains('isMine')) {//判断点的是不是雷
            judgeLost();
        } else {
            if (target.classList.contains('num') && target.classList.contains('flag')) { return false; }
            //判断一下是不是全部找完了
            infect(targetX, targetY)//扩散算法
            function infect(posX, posY) {
                var current = document.getElementById(posX + "-" + posY);
                var count = data[posX + "-" + posY];
                if (current) {//数据容错 引用存在才执行
                    //是否被标记，被标记return false结束函数； 状态：标记雷/标记数量/标记红旗/标记空白
                    if (current.classList.contains('isMine') || current.classList.contains('num') || current.classList.contains('flag')) {
                        return false;
                    } else if (count > 0) {
                        current.classList.add('num');
                        current.innerHTML = count; //写上周围雷的数量
                    } else if (count == 0) {
                        current.classList.add('num');
                        current.innerHTML = ''; //写上周围雷的数量
                        for (var i = posX - 1; i <= posX + 1; i++) {//探测周围格子是否有雷
                            for (var j = posY - 1; j <= posY + 1; j++) {
                                infect(i, j);
                            }
                        }
                    }
                } else { return false; }
            }
        }
        judgeWin();
    } else if (event.button == 2 && !target.classList.contains('num')) {
        target.classList.toggle('flag');
        var flag = document.getElementsByClassName('flag');
        restMine = setMine - flag.length;
        if (restMine >= 0) {
            span.innerHTML = '剩余雷数：' + restMine;
        } else {
            target.classList.toggle('flag');
        }
    }
}
function judgeWin() {
    var numLen = document.getElementsByClassName('num').length;
    if (numLen == Math.pow(squr, 2) - setMine) {
        alertCongratulation.style.display = 'block';
        var div = document.getElementsByTagName('div'),//触发获胜不允许点击方块
            len = div.length;
        while (len) {
            div[len - 1].removeEventListener('mousedown', addMouseEvents);
            len--;
        }
        setTimeout(function () {
            graphArea.style.display = 'none';
            mineBox.style.display = 'none';
            alertCongratulation.style.display = 'none';
            reset();
        }, 3000);

    }
}
function judgeLost() {
    var isMine = document.getElementsByClassName('isMine');
    for (var i = 0; i < isMine.length; i++) {
        isMine[i].style.backgroundColor = "#F40";
        var div = document.getElementsByTagName('div'),
            len = div.length;
        while (len) {
            div[len - 1].removeEventListener('mousedown', addMouseEvents);
            len--;
        }
    }
    setTimeout(function () {
        graphArea.style.display = 'none';
        mineBox.style.display = 'none';
        alertGameover.style.display = 'block';
        close.style.display = 'block';
    }, 1000);
}
function loadIni() {
    var NSet = document.getElementsByTagName('input')[0];
    var MineName = document.getElementsByTagName('input')[1];
    squr = +NSet.value;
    setMine = +MineName.value;
    currentMine = setMine;
    restMine = setMine;
    span.innerHTML = '剩余雷数：' + restMine;
    mineBox.style.width = 40 * squr + "px";
    mineBox.style.height = 40 * squr + "px";
    graphArea.style.width = 40 * squr + "px";
    graphArea.style.height = 40 * squr + "px";
}