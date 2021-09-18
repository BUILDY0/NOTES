const   gameDom = document.querySelector('.game'),
        gameWidth = gameDom.clientWidth,
        gameHeight = gameDom.clientHeight;



// 定义单个水管类，可以继承父类调用
class Pipe extends Rectangle{
    constructor(height, top, speed, dom){
        super(52, height, gameWidth, top, speed, 0, dom)
    }
    onMove(){
        if(this.left < -this.width){
            // 超出左边界则移除dom
            this.dom.remove();
        }
    }
}

function getRandom(min, max){
    return Math.floor( min + Math.random() * (max - min));
}

// 定义水管对类，生成水管要一次生成一对
class PipePair{
    constructor(speed){
        // 创建水管对
        this.gapHeight = Math.floor(Math.random() * 75) + 125;
        this.minHeight = 80;
        this.maxHeight = landTop - this.gapHeight - this.minHeight;
        // 创建上水管
        const upPipeDom = document.createElement('div');
        upPipeDom.className = `pipe up`;
        const upPipeHeight = getRandom(this.minHeight, this.maxHeight);
        this.upPipe = new Pipe(upPipeHeight, 0, speed, upPipeDom);
        gameDom.appendChild(upPipeDom);
        // 创建下水管
        const downPipeDom = document.createElement('div');
        downPipeDom.className = `pipe down`;
        // 下水管的高度是由上水管高度、间距决定的
        const downPipeHeight = landTop - this.gapHeight - upPipeHeight;
        const downPipeTop = landTop - downPipeHeight;
        this.downPipe = new Pipe(downPipeHeight, downPipeTop, speed, downPipeDom);
        gameDom.appendChild(downPipeDom);
    }
    // 判断水管对是否移除游戏
    get useless(){
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

// 定义一个产生水管对的类，只用来生成水管

class PipePairCreator{
    constructor(speed){
        this.speed = speed;
        this.pair = [];
        this.timer = null;
        this.tick = 2000;
        // this.startTime = new Date().getTime();
        // this.pauseTime = null;
        // this.delay = null;
    }
    startCreate(){
        if(this.timer) return;
        //setTimeout(() => {
            // this.pair.push( new PipePair(this.speed) );
            this.timer = setInterval(() => {
                this.pair.push( new PipePair(this.speed) );
                // pair数组会一直push，导致数据变多，清除push里多余的数据
                this.pair.forEach((value, index) => {
                    if(value.useless){
                        this.pair.shift();
                    }
                })
            }, this.tick);
        // }, this.tick - (this.delay % this.tick) == this.tick ? 0 : this.tick - (this.delay % this.tick));

    }
    stopCreate() {
        clearInterval(this.timer);
        this.timer = null;
        // this.pauseTime = new Date().getTime();
        // this.delay = this.pauseTime - this.startTime;
    }
}