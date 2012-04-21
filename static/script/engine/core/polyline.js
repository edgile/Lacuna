var PolyLine = function () {
    this.points = [];
};

PolyLine.prototype.addPoint = function (point) {
    this.points.push(point);
};

PolyLine.prototype.removePoint = function (index) {
    this.points.splice(index, 1);
};

PolyLine.prototype.getLength = function () {
    var result = 0;
    for (var i = 1, numberOfPoints = this.points.length; i < numberOfPoints; i++) {
        result += this.points[i - 1].distanceTo(this.points[i]);
    }
    return result;
};