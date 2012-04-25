function LandingZone() {
    this.width = 0;
    this.halfWidth = 0;
    this.lineSegment = null;

    this.canCollide = false;
    this.influencedByGravity = false;
    this.influencesGravitationalField = false;
    this.static = true;

    this.setWidth(50);
    this.setPosition(new THREE.Vector2());
    this.setDirection(new THREE.Vector2());
    // Visible elements
    this.line = {type: 'line', position: {x: 0, y: 0}, width: 3, color: 'white', start: {x: 0, y: 5}, end: {x: 0, y: -5}};
    this.shapes = [this.line];
};

LandingZone.prototype = new SpaceObject();
LandingZone.prototype.baseClass = SpaceObject.prototype;

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

LandingZone.prototype.render = function (context) {
//    context.strokeStyle = "white";
//    context.lineWidth = 3;
//    context.beginPath();
//    context.moveTo(this.lineSegment.start.x, this.lineSegment.start.y);
//    context.lineTo(this.lineSegment.end.x, this.lineSegment.end.y);
//    context.closePath();
//    context.stroke();
};

//function LandingZone() {
//    this.width = 0;
//    this.halfWidth = 0;
//    this.lineSegment = null;
//
//    this.canCollide = false;
//    this.influencedByGravity = false;
//    this.influencesGravitationalField = false;
//    this.static = true;
//
//    this.setWidth(50);
//    this.setPosition(new THREE.Vector2());
//    this.setDirection(new THREE.Vector2());
//};
//
//LandingZone.inheritsFrom(SpaceObject);
//
//LandingZone.prototype.getRadius = function () {
//    return this.width;
//};
//
//LandingZone.prototype.getLineSegment = function () {
//    return this.lineSegment;
//};
//
//LandingZone.prototype.setWidth = function (width) {
//    this.width = width;
//    this.halfWidth = this.width / 2;
//
//    this.setTargetLineSegment(this.position, this.direction);
//};
//
//LandingZone.prototype.setPosition = function (position) {
//    this.baseClass.setPosition.call(this, position);
//
//    this.setTargetLineSegment(this.position, this.direction);
//};
//
//LandingZone.prototype.setDirection = function (direction) {
//    this.baseClass.setDirection.call(this, direction);
//
//    this.setTargetLineSegment(this.position, this.direction);
//};
//
//LandingZone.prototype.setTargetLineSegment = function (position, direction) {
//    this.lineSegment = null;
//
//    if (!position || !direction) return;
//
//    var start = new THREE.Vector2();
//    start.copy(this.position);
//    start.addSelf(this.direction.clone().setLength(this.halfWidth));
//
//    var end = new THREE.Vector2();
//    end.copy(this.position);
//    end.addSelf(this.direction.clone().negate().setLength(this.halfWidth));
//
//    this.lineSegment = new LineSegment(start, end);
//};
//
//LandingZone.prototype.render = function (context) {
//    context.strokeStyle = "white";
//    context.lineWidth = 3;
//    context.beginPath();
//    context.moveTo(this.lineSegment.start.x, this.lineSegment.start.y);
//    context.lineTo(this.lineSegment.end.x, this.lineSegment.end.y);
//    context.closePath();
//    context.stroke();
//};