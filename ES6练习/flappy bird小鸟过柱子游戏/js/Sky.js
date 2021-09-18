const   skyDom = document.querySelector('.sky'),
        skyStyle = getComputedStyle(skyDom),
        skyWidth = parseFloat(skyStyle.width),
        skyHeight = parseFloat(skyStyle.height);


class Sky extends Rectangle{
    constructor(speed){
        super(skyWidth, skyHeight, 0, 0, speed, 0, skyDom);
    }
    onMove(){
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}
