/**
    Represents a PolyLine.
    @class
*/
var PolyLine = function () {
    this.points = [];
}

/**
    Gets the requested point
    @function
    @param {integer} index - Index of the item to remove from the list of points.
*/
PolyLine.prototype.getPoint = function (index) {
    return this.points[index];
}

/**
    Adds a point to the poly line
    @function
    @param {THREE.Vector2} point - Point to add to the PolyLine.
*/
PolyLine.prototype.addPoint = function (point) {
    this.points.push(point);
}

/**
    Removes a point from the PolyLine
    @function
    @param {integer} index - Index of the point to remove from the PolyLine.
*/
PolyLine.prototype.removePoint = function (index) {
    this.points.splice(index, 1);
}

/**
    Gets the total length of the PolyLine
    @function
    @returns {number} Total length of the PolyLine.
*/
PolyLine.prototype.getLength = function () {
    var result = 0;
    for (var i = 1, numberOfPoints = this.points.length; i < numberOfPoints; i++) {
        result += this.points[i - 1].distanceTo(this.points[i]);
    }
    return result;
}