var LineSegment = Class.extend({
    start: null,
    end: null,

    /* Expects start and end to be of type THREE.Vector2() or at least have the properties x and y */
    init: function (start, end) {
        this.setStart(start);
        this.setEnd(end);
    },

    setStart: function (start) {
        this.start = start;
    },

    setEnd: function (end) {
        this.end = end;
    },

    getLength: function () {
        if (this.start && this.end) {
            return this.start.distanceTo(this.end);
        }
        return 0;
    },

    /* Return THREE.Vector2 if the LineSegments intersect otherwise returns null */
    intersect: function (segment1, segment2) {
        var denominator = (segment2.end.y - segment2.start.y) * (segment1.end.x - segment1.start.x) - (segment2.end.x - segment2.start.x) * (segment1.end.y - segment2.start.y);

        // Parallel lines
        if (denominator == 0) return null;

        var ua = ((segment2.end.x - segment2.start.x) * (segment1.start.y - segment2.start.y) - (segment2.end.y - segment2.start.y) * (segment1.start.x - segment2.start.x)) / denominator;
        var ub = ((segment1.end.x - segment1.start.x) * (segment1.start.y - segment2.start.y) - (segment1.end.y - segment1.start.y) * (segment1.start.x - segment2.start.x)) / denominator;

        // Intersection on both line segments?
        if (0 <= ua <= 1 && 0 <= ub <= 1) {
            var result = new THREE.Vector2();
            result.x = segment1.start.x + ua * (segment1.end.x - segment1.start.x);
            result.y = segment1.start.y + ua * (segment1.end.y - segment1.start.y);

            return result;
        }
        return null;
    },

    intersectSelf: function (segment) {
        return this.intersect(this, segment);
    }
});