/**
*   Represents Line segment.
*   @class
*   @param {THREE.Vector2} start - Start point of the line segment.
*   @param {THREE.Vector2} end - End point of the line segment.
*/
var LineSegment = function (start, end) {
    this.setStart(start);
    this.setEnd(end);
}

/**
    Sets the starting point of the LineSegment.
    @function
    @param {THREE.Vector2} start - Start point of the line segment.
*/
LineSegment.prototype.setStart = function (start) {
    this.start = start;
}

/**
    Sets the end point of the LineSegment.
    @function
    @param {THREE.Vector2} end - End point of the line segment.
*/
LineSegment.prototype.setEnd = function (end) {
    this.end = end;
}

/**
    Gets the length of the LineSegment.
    @function
    @returns {number} Length of the line segment.
*/
LineSegment.prototype.getLength = function () {
    if (this.start && this.end) {
        return this.start.distanceTo(this.end);
    }
    return 0;
}

/**
    Gets the intersection point of the given LineSegments.
    @function
    @param {LineSegment} segment1 First LineSegment
    @param {LineSegment} segment2 Second LineSegment
    @returns {THREE.Vector2} Returns the intersection point if the LineSegments intersect otherwise returns null.
*/
LineSegment.intersect = function (segment1, segment2) {
    var denominator = (segment2.end.y - segment2.start.y) * (segment1.end.x - segment1.start.x) - (segment2.end.x - segment2.start.x) * (segment1.end.y - segment2.start.y);

    // Parallel lines
    if (denominator == 0) return null;

    var ua = ((segment2.end.x - segment2.start.x) * (segment1.start.y - segment2.start.y) - (segment2.end.y - segment2.start.y) * (segment1.start.x - segment2.start.x)) / denominator;
    var ub = ((segment1.end.x - segment1.start.x) * (segment1.start.y - segment2.start.y) - (segment1.end.y - segment1.start.y) * (segment1.start.x - segment2.start.x)) / denominator;

    // Intersection on both line segments?
    if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
        var result = new THREE.Vector2();
        result.x = segment1.start.x + ua * (segment1.end.x - segment1.start.x);
        result.y = segment1.start.y + ua * (segment1.end.y - segment1.start.y);

        return result;
    }
    return null;
}

/**
    Gets the intersection point with the given LineSegment.
    @function
    @param {LineSegment} segment LineSegment to test against
    @returns {THREE.Vector2} Returns the intersection point if the object intersects with the given LineSegment otherwise returns null.
*/
LineSegment.prototype.intersectSelf = function (segment) {
    return LineSegment.intersect(this, segment);
}