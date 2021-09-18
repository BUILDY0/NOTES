const   landDom = document.querySelector('.land'),
        landStyle = getComputedStyle(landDom),
        landWidth = parseFloat(landStyle.width),
        landHeight = parseFloat(landStyle.height),
        landTop = parseFloat(landStyle.top);


class Land extends Rectangle{
    constructor(speed){
        super(landWidth, landHeight, 0, landTop, speed, 0, landDom);
    }
    onMove(){
        if (this.left <= -landWidth/ 2) {
            this.left = 0;
        }
    }
}
