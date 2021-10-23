class People {
    tell() {
        return this._info;
    }
    get info() {
        return this._info;
    }
    set info(newVal) {
        this._info = newVal;
    }
}
var p = new People();
p.info = [123];
alert(p.info);
