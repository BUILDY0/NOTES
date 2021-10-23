class People {
    _info: number | string | number[];
    tell() {
        return this._info;
    }
    get info(): number | string | number[] {
        return this._info;
    }
    set info(newVal: number | string | number[]) {
        this._info = newVal;
    }
}

var p = new People();
p.info = [123];
alert(p.info);