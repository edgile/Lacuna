/**
*   Represents a SpaceObject.
*   @class
*   @abstract
*/
function SpaceObject(config) {
    config = config || {};
    helpers.applyIf(SpaceObject.defaultConfig, config);
    helpers.apply(config, this);

    this.initialize();

};

SpaceObject.statusEnum = { finished: 0, active: 1 };

SpaceObject.defaultConfig = {
    name: '',
    position: {x: 0, y: 0},
    direction: {x: 0, y: 0},
    density: 1,
    mass: 1,
    static: false,
    canCollide: true,
    influencesGravitationalField: true,
    influencedByGravity: true,
    status: SpaceObject.statusEnum.active
};

SpaceObject.prototype.initialize = function () {
    if (!(this.direction instanceof THREE.Vector2)) {
        this.setDirection(new THREE.Vector2(this.direction.x, this.direction.y));
    } else {
        this.setDirection(this.direction);
    }

    if (!(this.position instanceof THREE.Vector2)) {
        this.setPosition(new THREE.Vector2(this.position.x, this.position.y));
    } else {
        this.setPosition(this.position);
    }

    this.setStatus(this.status);
};

SpaceObject.prototype.position = null;
SpaceObject.prototype.direction = new THREE.Vector2(0, 0);
SpaceObject.prototype.density = 1;
SpaceObject.prototype.mass = 1;
SpaceObject.prototype.static = false;
SpaceObject.prototype.influencesGravitationalField = true;
SpaceObject.prototype.influencedByGravity = true;
SpaceObject.prototype.canCollide = true;

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
    return Math.ceil(2.5 * Math.pow(0.75 * this.getVolume() * Math.PI, 1 / 3));
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
