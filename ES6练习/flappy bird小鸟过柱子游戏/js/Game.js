class Game{
    constructor(){
        this.speed = -100
        this.sky = new Sky(this.speed);
        this.land = new Land(this.speed);
        this.bird = new Bird();
        this.pipePairCreator = new PipePairCreator(this.speed);
        this.timer = null;
        this.tick = 16; //移动时间间隔，毫秒
        this.gameOverState = false;
        this.gameStart;
        this.regKeydownEvent;
    }
    get gameStart(){
        if(this.timer) return;
        if(this.gameOverState) window.location.reload();
        this.pipePairCreator.startCreate();
        this.bird.fly();
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipePairCreator.pair.forEach(value => {
                value.move(duration);
            })
            if(this.isGameOver){
                this.gameStop;
                this.gameOverState = true;
            }
        }, this.tick);
    }

    get gameStop(){
        clearInterval(this.timer);
        this.timer = null;
        this.bird.fly();
        this.pipePairCreator.stopCreate()
    }

    get isGameOver(){
        // 鸟撞到大地
        if(this.bird.top >= this.land.top - this.bird.height){
            return true
        }
        // 撞到柱子
        for (let index = 0; index < this.pipePairCreator.pair.length; index++) {
            const pair = this.pipePairCreator.pair[index];
            if(this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)){
                return true;
            }           
        }
        return false;
    }

    isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        const centerX1 = rec1.left + rec1.width / 2;
        const centerY1 = rec1.top + rec1.height / 2;
        const centerX2 = rec2.left + rec2.width / 2;
        const centerY2 = rec2.top + rec2.height / 2;
        const disX = Math.abs(centerX1 - centerX2);
        const disY = Math.abs(centerY1 - centerY2);
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2) {
                return true
        }
        return false;
    }
    get regKeydownEvent(){
        document.addEventListener('keydown', e => {
            if(e.code === 'Space'){
                this.bird.jump()
            }
            if(e.code === 'Enter'){
                if(this.timer === null){
                    this.gameStart;
                }else{
                    this.gameStop;
                }
            }
        }, false)
    }
    get cheat(){
        this.isHit = () =>{return false;};
    }
}
const g = new Game();
