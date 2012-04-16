var LandingZone = SpaceObject.extend({
    width: 50,
    halfWidth: 25,
    lineSegment: null,

    init: function (position) {
        this._super();

        this._className = "LandingZone";

        this.setPosition(position);
        this.setDirection(new THREE.Vector2(1, 1));
        this.setWidth(50);
        this.influencedByGravity = false;
    },

    getRadius: function () {
        return this.width;
    },

    setWidth: function (width) {
        this.width = width;
        this.halfWidth = this.width / 2;

        this.setDirection(this.direction);
    },

    setDirection: function (direction) {
        this.direction = direction.normalize();

        var start = new THREE.Vector2();
        start.copy(this.position);
        start.addSelf(this.direction.clone().setLength(this.halfWidth));

        var end = new THREE.Vector2();
        end.copy(this.position);
        end.addSelf(this.direction.clone().negate().setLength(this.halfWidth));

        this.lineSegment = new LineSegment(start, end);
    },

    draw: function (context) {
        var grd = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.halfWidth);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "black");

        context.strokeStyle = grd;
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(this.lineSegment.start.x, this.lineSegment.start.y);
        context.lineTo(this.lineSegment.end.x, this.lineSegment.end.y);
        context.closePath();
        context.stroke();
    }
});
