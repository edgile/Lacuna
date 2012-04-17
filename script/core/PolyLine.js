var PolyLine = Class.extend({
    points: null,

    init: function () {
        this.points = [];
    },

    addPoint: function (point) {
        this.points.push(point);
    },

    removePoint: function (index) {
        this.points.splice(index, 1);
    },

    getLength: function () {
        var result = 0;
        for (var i = 1, numberOfPoints = this.points.length; i < numberOfPoints; i++) {
            result += this.points[i - 1].distanceTo(this.points[i]);
        }
        return result;
    }
});