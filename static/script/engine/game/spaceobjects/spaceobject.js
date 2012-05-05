﻿/**
*   Represents a SpaceObject.
*   @class
*   @abstract
*/
 function SpaceObject(config) {
    this.name = "Unknown";
    this.status = SpaceObject.statusEnum.active;

    helpers.apply(config, this);

    this.setStatus(this.status);
};

SpaceObject.prototype.position = null;
SpaceObject.prototype.direction = new THREE.Vector2();
SpaceObject.prototype.density = 1;
SpaceObject.prototype.mass = 1;
SpaceObject.prototype.static = false;
SpaceObject.prototype.influencesGravitationalField = true;
SpaceObject.prototype.influencedByGravity = true;
SpaceObject.prototype.canCollide = true;

SpaceObject.statusEnum = { finished: 0, active: 1 };

SpaceObject.prototype.update = function (timeLapse) {
};

SpaceObject.prototype.setRandomValues = function () {
};

/**
 * Gets the current position of the space object
 * @function
 */
SpaceObject.prototype.getPosition = function () {
    return this.position;
};

/**
 * Sets the current position of the space object
 * @param {position} New position for the SpaceObject
 */
SpaceObject.prototype.setPosition = function (position) {
    this.position = position;
};

SpaceObject.prototype.getDirection = function () {
    return this.direction;
};

SpaceObject.prototype.setDirection = function (direction) {
    this.direction = direction;
};

SpaceObject.prototype.setMass = function (mass) {
    this.mass = mass;
};

SpaceObject.prototype.setDensity = function (density) {
    this.density = density;
};

SpaceObject.prototype.getStatus = function () {
    return this.status;
};

SpaceObject.prototype.setStatus = function (value) {
    this.status = value;
};

SpaceObject.prototype.isFinished = function () {
    return this.getStatus() === SpaceObject.statusEnum.finished;
};

SpaceObject.prototype.getRadius = function () {
    return 2.5 * Math.pow(0.75 * this.getVolume() * Math.PI, 1 / 3);
};

SpaceObject.prototype.getVolume = function () {
    return this.mass / this.density;
};

SpaceObject.prototype.getVelocity = function () {
    return this.direction.length();
};

SpaceObject.prototype.getDistance = function (body) {
    return this.position.distanceTo(body.position);
};

SpaceObject.prototype.getAngle = function (body) {
    var result = new THREE.Vector2();
    result.sub(body.position, this.position);
    result.normalize();

    return result;
};