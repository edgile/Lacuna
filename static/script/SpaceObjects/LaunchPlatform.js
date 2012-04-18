function LaunchPlatform(position) {
    this._className = "LaunchPlatform";

    this.maxForce = 10000;
    this.timeToReachMaxForce = 1500;
    this.influencedByGravity = false;
    this.pointerLocation = null;
    this.launchForceTimer = null;
    this.forceVector = null;

    this.setPosition(position);
    this.setMass(1);
    this.setDensity(1);
}

LaunchPlatform.inheritsFrom(SpaceObject);

LaunchPlatform.prototype.start = function () {
    this.launchForceTimer = new THREE.Clock(false);
    this.launchForceTimer.start();
}

LaunchPlatform.prototype.stop = function () {
    this.launchForceTimer.stop();

    this.forceVector = this.getCurrentForceVector()
}

LaunchPlatform.prototype.getPosition = function () {
    return this.position;
}

LaunchPlatform.prototype.getLaunchForceDirection = function () {
    var forceVector = this.getLaunchForceVector();
    if (!forceVector) {
        return new THREE.Vector2();
    }
    return forceVector.normalize();
}

LaunchPlatform.prototype.getLaunchForceVector = function () {
    return this.forceVector;
}

LaunchPlatform.prototype.getCurrentForce = function () {
    if (this.launchForceTimer) {
        var forcePercentageOfMaximum = (this.launchForceTimer.getElapsedTime() * 1000 / this.timeToReachMaxForce) % 1;
        return forcePercentageOfMaximum * this.maxForce;
    }
    return 0;
}

LaunchPlatform.prototype.getCurrentForceVector = function () {
    return this.getCurrentForceDirection().setLength(this.getCurrentForce());
}

LaunchPlatform.prototype.getCurrentForceDirection = function () {
    var result = new THREE.Vector2(0, 0);
    if (!this.pointerLocation) return result;

    result.sub(this.pointerLocation, this.position).normalize();

    return result;
}

LaunchPlatform.prototype.getRadius = function () {
    return 40;
}

LaunchPlatform.prototype.setPointerLocation = function (location) {
    this.pointerLocation = location;
}

LaunchPlatform.prototype.draw = function (context) {
    context.strokeStyle = "red";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.position.x, this.position.y + 5);
    context.lineTo(this.position.x, this.position.y - 5);
    context.moveTo(this.position.x + 5, this.position.y);
    context.lineTo(this.position.x - 5, this.position.y);
    context.stroke();

    context.strokeStyle = "gray";
    context.lineWidth = 1;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
    context.closePath();
    context.stroke();

    if (this.pointerLocation) {
        context.lineWidth = 3;
        context.beginPath();
        var forceDirection = this.getCurrentForceDirection();

        var start = new THREE.Vector2();
        forceDirection.setLength(39);
        start.add(this.position, forceDirection);

        var end = new THREE.Vector2();
        forceDirection.setLength(48);
        end.add(this.position, forceDirection);

        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.closePath();
        context.stroke();
    }

    /* In the process of building force */
    if (this.pointerLocation && this.launchForceTimer && this.launchForceTimer.running) {
        var forceVector = this.getCurrentForceVector();
        var force = forceVector.length();
        forceVector.normalize().multiplyScalar(48 * force / this.maxForce);

        var endPoint = new THREE.Vector2();
        endPoint = endPoint.add(this.position, forceVector);

        var context = getContext();
        context.strokeStyle = "green";
        context.beginPath();
        context.moveTo(this.position.x, this.position.y);
        context.lineTo(endPoint.x, endPoint.y);
        context.closePath();
        context.stroke();
    }
}
