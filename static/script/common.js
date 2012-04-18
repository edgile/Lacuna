var gravitationalConstant = .01;

var canvasWidth;
var canvasHeight;
var Math2PI = Math.PI * 2;

Object.prototype.clone = function () {
    var newObj = (this instanceof Array) ? [] : {};
    for (i in this) {
        if (i == 'clone') continue;
        if (this[i] && typeof this[i] == "object") {
            newObj[i] = this[i].clone();
        } else newObj[i] = this[i]
    } return newObj;
};

Function.prototype.inheritsFrom = function( parentClassOrObject ) {
    if (parentClassOrObject.constructor == Function ) { //Normal Inheritance
        this.prototype = new parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.baseClass = parentClassOrObject.prototype;
    }
    else { //Pure Virtual Inheritance
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.baseClass = parentClassOrObject;
    }
    return this;
}