//rules//
//1.点击开始游戏，btn消失，网格地图出现grapharea打开
//2.初始化食物，背景颜色violet，位置随机，并绘制图形
//3.初始化蛇的位置，头（深红）、身体（深绿），并绘制图形
//4.蛇一开始不运动，默认初始化位置往右走，按下右/上/下键后蛇开始运动，运动方向以按键为准
//5.左右运动时，key-left/key-right失效，只能输入上下进行移动；上下运动同理
//6.吃到食物（判断蛇头的位置是否==食物坐标），再蛇尾push一个body数据
//7.碰到墙壁（判断蛇头的位置是否小于边界或大于边界坐标）或吃到自己（判断蛇头的位置==身体任意body的坐标）判定为失败
//8.失败/成功都将显示分数，按X键关闭提示框并重新加载游戏
//9.bonus如果连续按两次按键可以获得加速效果
//10.暂停功能实现
//11.mode = 1隐藏模式。


//reference//
var startgame = document.getElementsByClassName('startgame')[0];
var grapharea = document.getElementsByClassName('grapharea')[0];
var food = document.getElementsByClassName('food')[0];
var snake = document.getElementsByClassName('snake')[0];
var youlost = document.getElementsByClassName('youlost')[0];
var youwin = document.getElementsByClassName('youwin')[0];
var quit = document.getElementsByTagName('i');
var span = document.getElementsByTagName('span');

//variable//
//map
var unit = parseInt(window.getComputedStyle(grapharea).width) / 20;
var mapH = parseInt(window.getComputedStyle(grapharea).height);
var mapW = parseInt(window.getComputedStyle(grapharea).width);
//food
var foodW = unit;
var foodH = unit;
var foodX, foodY;
//snake con = [posX, posY, content]
var defaltCon = [[3, 3, "head"], [2, 3, "body"], [1, 3, "body"]]; //默认位置
var con; //实时位置
//root
var mode = 0;
var speed = 150;
var score = 0;
var upKey = true;
var downKey = true;
var leftKey = false;
var rightKey = true;
var timer1, timer2, timer3, timer4, timerBonus;
var recTime, recPress, interval = [];
var moveState, count = 0;


//code//
init();

function init() {
    bindEvent();//绑定事件
    //root
    snake.innerHTML = '';
    con = [[3, 3, "head"], [2, 3, "body"], [1, 3, "body"]];
    score = 0;
    for (var i = 0; i < span.length; i++) {
        span[i].innerHTML = 0;
    }
    upKey = true;
    downKey = true;
    leftKey = false;
    rightKey = true;
    count = 0;
    interval = [];
    //load food
    foodX = Math.floor(Math.random() * mapW / foodW) * foodW;
    foodY = Math.floor(Math.random() * mapH / foodH) * foodH;
    food.style.left = foodX + "px";
    food.style.top = foodY + "px";
    //load snake
    for (var i = 0; i < this.con.length; i++) {
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = defaltCon[i][0] * this.unit + 'px';
        div.style.top = defaltCon[i][1] * this.unit + 'px';
        div.classList.add(defaltCon[i][2]);
        snake.appendChild(div);
    }
    // setInterval(function () {//每20秒清空一次interval数组数据；
    //     interval = [];
    // }, 30000)
}
function bindEvent() {//绑定事件
    startgame.addEventListener('click', function () {//开始游戏btn事件
        startgame.style.display = 'none';
        grapharea.style.display = 'block';
    });
    document.addEventListener('keydown', main);//运动主函数
    document.addEventListener('keydown', bonus);//运动附加函数 加速运动
    document.addEventListener('keydown', pause);//空格暂停功能
    quit[0].addEventListener('click', function () { //关闭lost/win提示框
        youlost.style.display = 'none';
        youwin.style.display = 'none';
        init();
    });
    quit[1].addEventListener('click', function () { //关闭lost/win提示框
        youlost.style.display = 'none';
        youwin.style.display = 'none';
        init();
    });
}
function main(e) {//keydown事件 运动主函数
    var event = e || window.event;
    //连续操作间隔interval小于速度speed错误移动处理
    recTime = new Date().getTime();
    recPress = event.code;
    interval.push([recTime, recPress]); //记录按键时间及按键code
    if (interval.length > 1 && (interval[interval.length - 1][0] - interval[interval.length - 2][0]) < speed) {
        return false;
    }
    switch (event.code) {
        case "ArrowUp":
            if (upKey) {
                changeDirectBool(event.code);
                timerKiller();
                timer1 = setInterval(function () {
                    bodyMove();
                    con[0][1] -= 1;
                    headMove();
                    getScore();
                    judgeResult();
                }, speed);
                moveState = "up";//pause函数需要使用的参数
                count = 0;//pause后如果按键移动，那么下次pause也能正常暂停
            };
            break;
        case "ArrowRight":
            if (rightKey) {
                changeDirectBool(event.code);
                timerKiller();
                timer2 = setInterval(function () {
                    bodyMove();
                    con[0][0] += 1;
                    headMove();
                    getScore();
                    judgeResult();
                }, speed);
                moveState = "right";
                count = 0;
            };
            break;
        case "ArrowDown":
            if (downKey) {
                changeDirectBool(event.code);
                timerKiller();
                timer3 = setInterval(function () {
                    bodyMove();
                    con[0][1] += 1;
                    headMove();
                    getScore();
                    judgeResult();
                }, speed);
                moveState = "down";
                count = 0;
            };
            break;
        case "ArrowLeft":
            if (leftKey) {
                changeDirectBool(event.code);
                timerKiller();
                timer4 = setInterval(function () {
                    bodyMove();
                    con[0][0] -= 1;
                    headMove();
                    getScore();
                    judgeResult();
                }, speed);
                moveState = "left";
                count = 0;
            };
            break;
        default: break;
    }
}
function bonus() {//keydown事件 Bonus加速移动
    var len = interval.length;
    if (len < 2) {
        return false;
    } else if (moveState == 'up' && interval[len - 1][1] == interval[len - 2][1] && interval[len - 1][1] == 'ArrowUp') {
        timerKiller();
        timerBonus = setInterval(function () {
            bodyMove();
            con[0][1] -= 1;
            headMove();
            getScore();
            judgeResult();
        }, speed / 2)
    } else if (moveState == 'right' && interval[len - 1][1] == interval[len - 2][1] && interval[len - 1][1] == 'ArrowRight') {
        timerKiller();
        timerBonus = setInterval(function () {
            bodyMove();
            con[0][0] += 1;
            headMove();
            getScore();
            judgeResult();
        }, speed / 2)
    } else if (moveState == 'down' && interval[len - 1][1] == interval[len - 2][1] && interval[len - 1][1] == 'ArrowDown') {
        timerKiller();
        timerBonus = setInterval(function () {
            bodyMove();
            con[0][1] += 1;
            headMove();
            getScore();
            judgeResult();
        }, speed / 2)
    } else if (moveState == 'left' && interval[len - 1][1] == interval[len - 2][1] && interval[len - 1][1] == 'ArrowLeft') {
        timerKiller();
        timerBonus = setInterval(function () {
            bodyMove();
            con[0][0] -= 1;
            headMove();
            getScore();
            judgeResult();
        }, speed / 2)
    }
}
function pause(e) {
    var event = e || window.event;
    if (event.code == 'Space') {
        if (count % 2 == 0) {
            timerKiller()
            count++;
        } else if (count % 2 == 1) {
            count++;
            switch (moveState) {
                case "up":
                    changeDirectBool(moveState);
                    timerKiller();
                    timer1 = setInterval(function () {
                        bodyMove();
                        con[0][1] -= 1;
                        headMove();
                        getScore();
                        judgeResult();
                    }, speed);
                    moveState = "up";
                    break;
                case "right":
                    changeDirectBool(moveState);
                    timerKiller();
                    timer2 = setInterval(function () {
                        bodyMove();
                        con[0][0] += 1;
                        headMove();
                        getScore();
                        judgeResult();
                    }, speed);
                    moveState = "right";
                    break;
                case "down":
                    changeDirectBool(moveState);
                    timerKiller();
                    timer3 = setInterval(function () {
                        bodyMove();
                        con[0][1] += 1;
                        headMove();
                        getScore();
                        judgeResult();
                    }, speed);
                    moveState = "down";
                    break;
                case "left":
                    changeDirectBool(moveState);
                    timerKiller();
                    timer4 = setInterval(function () {
                        bodyMove();
                        con[0][0] -= 1;
                        headMove();
                        getScore();
                        judgeResult();
                    }, speed);
                    moveState = "left";
                    break;
                default: break;
            }
        }
    }
}
function bodyMove() {//body运动
    var len = con.length;
    var elm = snake.getElementsByTagName('div');
    for (var i = len - 1; i > 0; i--) {
        con[i][0] = con[i - 1][0];
        con[i][1] = con[i - 1][1];
        elm[i].style.left = con[i][0] * unit + 'px';
        elm[i].style.top = con[i][1] * unit + 'px';
    }
}
function headMove() {//head运动
    var elm = document.getElementsByClassName('head')[0];
    elm.style.left = con[0][0] * unit + 'px';
    elm.style.top = con[0][1] * unit + 'px';
}

function changeDirectBool(code) {//改变全局方向判断
    if (code == "ArrowUp" || code == "ArrowDown") {
        upKey = false;
        downKey = false;
        leftKey = true;
        rightKey = true;
    } else if (code == "ArrowLeft" || code == "ArrowRight") {
        upKey = true;
        downKey = true;
        leftKey = false;
        rightKey = false;
    }
}
function timerKiller() { //清除运动计时器
    clearInterval(timer1);
    clearInterval(timer2);
    clearInterval(timer3);
    clearInterval(timer4);
    clearInterval(timerBonus);
}
function getScore() {//score累加器
    var elm = snake.getElementsByTagName('div');
    var len = elm.length;
    for (var i = 0; i < len; i++) {
        if (parseInt(elm[i].style.left) == foodX && parseInt(elm[i].style.top) == foodY) {
            this.score++;
            var score = document.getElementsByTagName('span');
            score.forEach = Array.prototype.forEach;
            score.forEach(function (a) {
                a.innerHTML = this.score;
            })
            //body + 1
            var body = document.createElement('div');
            con.push([con[con.length - 1][0], con[con.length - 1][1], 'body'])
            body.classList.add('body');
            body.style.position = "absolute";
            body.style.left = con[con.length - 1][0] * unit + "px";
            body.style.top = con[con.length - 1][1] * unit + "px";
            snake.appendChild(body);
            //重新生成food
            if (!mode) {
                foodX = Math.floor(Math.random() * mapW / foodW) * foodW;
                foodY = Math.floor(Math.random() * mapH / foodH) * foodH;
                food.style.left = foodX + "px";
                food.style.top = foodY + "px";
            }else{
                food.style.left = con[0][0] * unit + "px";
                food.style.top = con[0][1] * unit + "px";
            }
        }
    }
}
function judgeResult() {//判断输赢
    var head = document.getElementsByClassName('head')[0];
    var body = document.getElementsByClassName('body');
    var bodyLen = body.length;
    while (bodyLen) {
        if (head.style.left == body[bodyLen - 1].style.left && head.style.top == body[bodyLen - 1].style.top) {
            //lost
            timerKiller();
            youlost.style.display = 'block';
            document.removeEventListener('keydown', main);
            document.removeEventListener('keydown', bonus);
            document.removeEventListener('keydown', pause);
            mode = 0;
            speed = 250;
        } else if (!mode && (parseInt(head.style.left) < 0 || parseInt(head.style.top) < 0 || parseInt(head.style.left) > mapW - unit || parseInt(head.style.top) > mapH - unit)) {
            //win
            timerKiller();
            youwin.style.display = 'block';
            document.removeEventListener('keydown', main);
            document.removeEventListener('keydown', bonus);
            document.removeEventListener('keydown', pause);
        } else if (mode) {
            //overwall         
            if (parseInt(head.style.left) < 0) {
                con[0][0] = 19;
                headMove();
            } else if (parseInt(head.style.left) > mapW - unit) {
                con[0][0] = 0;
                headMove();
            } else if (parseInt(head.style.top) < 0) {
                con[0][1] = 19;
                headMove();
            } else if (parseInt(head.style.top) > mapH - unit) {
                con[0][1] = 0;
                headMove();
            } else {
                speed = speed < 50 ? 50 : speed * 0.99;
            }
        }
        bodyLen--;
    }
}
