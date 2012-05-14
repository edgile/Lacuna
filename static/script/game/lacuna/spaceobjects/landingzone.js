/**
*   Represents a landing zone for ships.
*   @class
*   @extends SpaceObject
*/
function LandingZone(config) {
    helpers.applyIf(LandingZone.defaultConfig, config);
    SpaceObject.call(this, config);

    this.halfWidth = this.width / 2;
    this.lineSegment = null;
    this.setWidth(this.width);

    // Visible elements
    this.line = {type: 'line', position: {x: 0, y: 0}, width: 3, color: 'white', start: {x: 0, y: 5}, end: {x: 0, y: -5}};
    this.shapes = [this.line];
};

LandingZone.inheritsFrom(SpaceObject);

LandingZone.defaultConfig = {
    type: 'landingzone',
    name: 'Landing zone',
    width: 50,
    position: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    static: true,
    canCollide: false,
    influencesGravitationalField: false,
    influencedByGravity: false,
    status: SpaceObject.statusEnum.active,
    editor: { visible: true }
};

LandingZone.prototype.getRadius = function () {
    return this.width;
};

LandingZone.prototype.getLineSegment = function () {
    return this.lineSegment;
};

LandingZone.prototype.setWidth = function (width) {
    this.width = width;
    this.halfWidth = this.width / 2;

    this.setTargetLineSegment(this.position, this.direction);
};

LandingZone.prototype.setPosition = function (position) {
    this.baseClass.setPosition.call(this, position);

    this.setTargetLineSegment(this.position, this.direction);
};

LandingZone.prototype.setDirection = function (direction) {
    this.baseClass.setDirection.call(this, direction);

    this.setTargetLineSegment(this.position, this.direction);
};

LandingZone.prototype.setTargetLineSegment = function (position, direction) {
    this.lineSegment = null;

    if (!position || !direction) return;

    var start = new THREE.Vector2();
    start.copy(this.position);
    start.addSelf(this.direction.clone().setLength(this.halfWidth));

    var end = new THREE.Vector2();
    end.copy(this.position);
    end.addSelf(this.direction.clone().negate().setLength(this.halfWidth));

    this.lineSegment = new LineSegment(start, end);
};

LandingZone.prototype.update = function (timeLapse) {
	this.line.start = this.lineSegment.start.clone();
	this.line.end = this.lineSegment.end.clone();
};

SpaceObjects.landingzone = LandingZone;
