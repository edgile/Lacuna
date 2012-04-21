var LineSegment = function (start, end) {
    this.start = null;
    this.end = null;

    this.setStart(start);
    this.setEnd(end);
}

LineSegment.prototype.setStart = function (start) {
    this.start = start;
}

LineSegment.prototype.setEnd = function (end) {
    this.end = end;
}

LineSegment.prototype.getLength = function () {
    if (this.start && this.end) {
        return this.start.distanceTo(this.end);
    }
    return 0;
}

/* Return THREE.Vector2 if the LineSegments intersect otherwise returns null */
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

LineSegment.prototype.intersectSelf = function (segment) {
    return LineSegment.intersect(this, segment);
}