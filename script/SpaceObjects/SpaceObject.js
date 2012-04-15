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
        return Math.pow(0.75 * this.getVolume() * Math.PI, 1 / 3);
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
        return gravitationalConstant * this.mass * body.mass * this.getDistanceGravitationFactor(this.getDistance(body));
    },

    /* Default but less steep than nature! */
    getDistanceGravitationFactor: function (distance) {
        return 1 / Math.pow(distance, 1.5);
    },

    /* Experiment to have gravitational force folow a gaussian curve */
    getDistanceGravitationFactor1: function (distance) {
        var deviation = 25;
        var mean = 0;

        var factor1 = 1 / deviation * Math.sqrt(Math2PI);
        var factor2 = Math.pow(Math.E, (-1 / 2) * Math.pow((distance - mean) / deviation, 2));

        return factor1 * factor2;
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