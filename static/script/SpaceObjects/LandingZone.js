function LandingZone(position) {
    this.width = 0;
    this.halfWidth = 0;
    this.lineSegment = null;
    this.influencedByGravity = false;

    this.setWidth(50);
    this.setPosition(position);
    this.setDirection(new THREE.Vector2(1, 1));
}

LandingZone.inheritsFrom(SpaceObject);

LandingZone.prototype.getRadius = function () {
    return this.width;
}

LandingZone.prototype.setWidth = function (width) {
    this.width = width;
    this.halfWidth = this.width / 2;

    this.setTargetLineSegment(this.position, this.direction);
}

LandingZone.prototype.setDirection = function (direction) {
    this.baseClass.setDirection.call(this, direction);

    this.setTargetLineSegment(this.position, this.direction);
}

LandingZone.prototype.setTargetLineSegment = function (position, direction){
    this.lineSegment = null;

    if(!position || !direction) return;

    var start = new THREE.Vector2();
    start.copy(this.position);
    start.addSelf(this.direction.clone().setLength(this.halfWidth));

    var end = new THREE.Vector2();
    end.copy(this.position);
    end.addSelf(this.direction.clone().negate().setLength(this.halfWidth));

    this.lineSegment = new LineSegment(start, end);
}

LandingZone.prototype.render = function (context) {
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