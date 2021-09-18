// 定义对象可能有的变量：宽度，高度，横坐标距离，纵坐标距离，横坐标速度，纵坐标速度，dom对象
const Rectangle = class{
    constructor(width, height, left, top, xSp, ySp, dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSp = xSp;
        this.ySp = ySp;
        this.dom = dom;
    }

    render(){ //渲染物体绘图坐标及尺寸
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }

    move(duration) { //计算下一步的运动的新坐标
        const disX = duration * this.xSp;
        const disY = duration * this.ySp;
        this.left += disX;
        this.top += disY;

        //可能会发生一些事
        if (this.onMove) {
            //每次移动后，渲染前，均会调用该方法
            this.onMove(); //是否存在onMove方法，如果存在，则调用
        }
        this.render();
    }

}