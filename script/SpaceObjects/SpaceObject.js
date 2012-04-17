var SpaceObject = function () {
    this._className = "SpaceObject";

    this.name = "Unknown";

    this.position = null;
    this.direction = new THREE.Vector2();
    this.density = 1;
    this.mass = 1;

    this.influencedByGravity = true;
    this.canCollide = true;
}

SpaceObject.prototype.collide = function (body) {
    if (!this.canCollide || !body.canCollide) return false;

    return this.getDistance(body) < (this.getRadius() + body.getRadius());
}

SpaceObject.prototype.setRandomValues = function () {
}

SpaceObject.prototype.setPosition = function (position) {
    this.position = position;
}

SpaceObject.prototype.setDirection = function (direction) {
    this.direction = direction;
}

SpaceObject.prototype.setMass = function (mass) {
    this.mass = mass;
}

SpaceObject.prototype.setDensity = function (density) {
    this.density = density;
}

SpaceObject.prototype.getRadius = function () {
    return Math.pow(0.75 * this.getVolume() * Math.PI, 1 / 3);
}

SpaceObject.prototype.getVolume = function () {
    return this.mass / this.density;
}

SpaceObject.prototype.getVelocity = function () {
    return this.direction.length();
}

SpaceObject.prototype.getDistance = function (body) {
    return this.position.distanceTo(body.position);
}

SpaceObject.prototype.getGravitationalForce = function (body) {
    return gravitationalConstant * this.mass * body.mass * this.getDistanceGravitationFactor(this.getDistance(body));
}

/* Default but less steep than nature! */
SpaceObject.prototype.getDistanceGravitationFactor = function (distance) {
    return 1 / Math.pow(distance, 1.5);
}

/* Experiment to have gravitational force folow a gaussian curve */
SpaceObject.prototype.getDistanceGravitationFactor1 = function (distance) {
    var deviation = 25;
    var mean = 0;

    var factor1 = 1 / deviation * Math.sqrt(Math2PI);
    var factor2 = Math.pow(Math.E, (-1 / 2) * Math.pow((distance - mean) / deviation, 2));

    return factor1 * factor2;
}

SpaceObject.prototype.getAngle = function (body) {
    var result = new THREE.Vector2();
    result.sub(body.position, this.position);
    result.normalize();

    return result;
}

SpaceObject.prototype.draw = function (context2d) {
}