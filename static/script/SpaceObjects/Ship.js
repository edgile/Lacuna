var Ship = function () {
    this._className = "Ship";

    this.maxTailLength = 250;
    this.tail = new PolyLine();
    this.influencedByGravity = true;

    this.setStatus(this.statusEnum.accelerating);
    this.setMass(3000);
    this.setDensity(1);
}

Ship.prototype.statusEnum = { finished: 0, accelerating: 1, flying: 2, craching: 3, landing: 4, landed: 5 };

Ship.inheritsFrom(SpaceObject);

Ship.prototype.setPosition = function (position) {
    // add previous point to the tail.
    if (this.position) {
        this.tail.addPoint(this.position.clone());
    }

    this.baseClass.setPosition.call(this, position);

    // limit the length of the tail.
    if (this.maxTailLength > 0) {
        while (this.tail.getLength() > this.maxTailLength) {
            this.tail.removePoint(0);
        }
    }
}

Ship.prototype.update = function () {
    this.baseClass.update.call(this);

    var status = this.getStatus();
    if (status == this.statusEnum.accelerating && this.frameCounter >= 50) {
        this.setStatus(this.statusEnum.flying);
    }
    else if (status == this.statusEnum.craching && this.frameCounter >= 50) {
        this.setStatus(this.statusEnum.finished);
    }
    else if (status == this.statusEnum.landing && this.frameCounter >= 50) {
        this.setStatus(this.statusEnum.landed);
    }
}

Ship.prototype.setStatus = function (status) {
    this.baseClass.setStatus.call(this, status);

    this.frameCounter = 0;
}

Ship.prototype.getRadius = function () {
    return 4;
}

Ship.prototype.getGradient = function (context) {
    var gradient = context.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, this.getRadius());
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "yellow");

    return gradient;
}

Ship.prototype.render = function (context) {
    context.fillStyle = this.getGradient(context);
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
    context.fill();
    context.closePath();

    this.renderTail(context);
}

Ship.prototype.renderTail = function (context) {
    var localTail = this.tail;

    if (localTail.points.length < 2) return;

    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(localTail.points[0].x, localTail.points[0].y);
    for (var i = 1, numberOfPoints = localTail.points.length; i < numberOfPoints; i++) {
        context.lineTo(localTail.points[i].x, localTail.points[i].y);
    }
    context.stroke();
    context.closePath();
}