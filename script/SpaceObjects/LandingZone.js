var LandingZone = SpaceObject.extend({
    width: 50,
    halfWidth: 25,
    start: null,
    end: null,

    init: function (position) {
        this._super();

        this._className = "LandingZone";

        this.position = position;
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

        this.start = new THREE.Vector2();
        this.start.copy(this.position);
        this.start.addSelf(this.direction.clone().setLength(this.halfWidth));

        this.end = new THREE.Vector2();
        this.end.copy(this.position);
        this.end.addSelf(this.direction.clone().negate().setLength(this.halfWidth));
    },

    draw: function (context) {

        var grd = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.halfWidth);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "black");

        context.strokeStyle = grd;
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(this.start.x, this.start.y + 5);
        context.lineTo(this.end.x, this.end.y);
        context.closePath();
        context.stroke();
    }
});
