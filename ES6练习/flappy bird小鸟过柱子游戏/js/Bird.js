const   birdDom = document.querySelector('.bird');
        birdStyle = getComputedStyle(birdDom),
        birdWidth = parseFloat(birdStyle.width),
        birdHeight = parseFloat(birdStyle.height);


class Bird extends Rectangle{
    constructor(){
        super(birdWidth, birdHeight, 100, 100, 0, 50, birdDom);
        // 重力加速度g
        this.g = 9.8;
        this.flyStatus = 1;
    }
    move(duration){
        super.move(duration)
        if(this.top < (landTop - birdHeight)){
            this.ySp += this.g;
        }
    }
    onMove(){
        if(this.top < 0){//如果top超出上边界，则top属性值变为0
            this.top = 0;
        }else if(this.top > (landTop - birdHeight)){//如果top超出下边界，则top属性值为landtop - birdHeight
            this.top = landTop - birdHeight;
        }
    }
    jump(){
        this.ySp = -300;
        this.render();
    }
    fly(){
        this.dom.classList.toggle('fly');
    }
}
