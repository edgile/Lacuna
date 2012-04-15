var SpaceObject = Class.extend({
    _className: "SpaceObject",

    name: "Unknown",

    position: new THREE.Vector2(),
    direction: new THREE.Vector2(),
    density: 1,
    mass: 1,

    influencedByGravity: true,

    init: function () {
    },

    collide: function (body) {
        return this.getDistance(body) < (this.getRadius() + body.getRadius());
    },

    getRadius: function () {
        return Math.pow(0.75 * this.getVolume() * Math.PI , 1/3);
    },

    getVolume: function () {
        return this.mass / this.density;
    },

    getVelocity: function () {
        return this.direction.length();
    },

    getDistance: function (body) {
        return this.position.distanceTo(body.position);
    },

    getGravitationalForce: function (body) {
        return gravitationalConstant * this.mass * body.mass / Math.pow(this.getDistance(body), 1.5);
    },

    getAngle: function (body) {
        var result = new THREE.Vector2();
        result.sub(body.position, this.position);
        result.normalize();

        return result;
    },

    draw: function (context2d) {
    }
});