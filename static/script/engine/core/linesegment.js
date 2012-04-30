/**
*   Represents Line segment.
*   @class
*   @param {THREE.Vector2} start - Start point of the line segment.
*   @param {THREE.Vector2} end - End point of the line segment.
*/
var LineSegment = function (start, end) {
    this.setStart(start);
    this.setEnd(end);
};

/**
    Sets the starting point of the LineSegment.
    @function
    @param {THREE.Vector2} start - Start point of the line segment.
*/
LineSegment.prototype.setStart = function (start) {
    this.start = start;
};

/**
    Sets the end point of the LineSegment.
    @function
    @param {THREE.Vector2} end - End point of the line segment.
*/
LineSegment.prototype.setEnd = function (end) {
    this.end = end;
};

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
};

/**
    Gets the intersection point of the given LineSegments.
    @function
    @param {LineSegment} segment1 First LineSegment
    @param {LineSegment} segment2 Second LineSegment
    @returns {THREE.Vector2} Returns the intersection point if the LineSegments intersect otherwise returns null.
*/
LineSegment.intersect = function (segment1, segment2) {
	var A = segment1.start;
	var B = segment1.end;
	var C = segment2.start;
	var D = segment2.end;
	
	var denominator = (B.x-A.x)*(D.y-C.y)-(B.y-A.y)*(D.x-C.x);

    // Parallel lines
    if (denominator == 0) return null;

	var r = ((A.y-C.y)*(D.x-C.x)-(A.x-C.x)*(D.y-C.y))/denominator;
	var s = ((A.y-C.y)*(B.x-A.x)-(A.x-C.x)*(B.y-A.y))/denominator;

    // Intersection on both line segments?
    if (0 <= r && r <= 1 && 0 <= s && s <= 1) {
        var result = new THREE.Vector2();
        result.x = A.x + r * (B.x-A.x);
        result.y = A.y + r * (B.y-A.y);

        return result;
    }
    return null;
};

/**
    Gets the intersection point with the given LineSegment.
    @function
    @param {LineSegment} segment LineSegment to test against
    @returns {THREE.Vector2} Returns the intersection point if the object intersects with the given LineSegment otherwise returns null.
*/
LineSegment.prototype.intersectSelf = function (segment) {
    return LineSegment.intersect(this, segment);
};