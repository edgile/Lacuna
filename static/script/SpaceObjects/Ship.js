function Ship() {
    this.maxTailLength = 250;
    this.tail = new PolyLine();

    this.influencedByGravity = true;
    this.influencesGravitationalField = false;

    this.setStatus(Ship.statusEnum.accelerating);
    this.setMass(3000);
    this.setDensity(1);
}

Ship.statusEnum = { finished: 0, accelerating: 1, flying: 2, craching: 3, landing: 4, landed: 5 };
Ship.statusTimespan = { accelerating: 50, craching: 5, landing: 10 };

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

Ship.prototype.update = function (timeLapse) {
    this.baseClass.update.call(this);

    var status = this.getStatus();
    if (status == Ship.statusEnum.accelerating && this.elapsedTime >= Ship.statusTimespan.accelerating) {
        this.setStatus(Ship.statusEnum.flying);
    }
    else if (status == Ship.statusEnum.craching && this.elapsedTime >= Ship.statusTimespan.craching) {
        this.setStatus(Ship.statusEnum.finished);
    }
    else if (status == Ship.statusEnum.craching) {
        this.getDirection().setLength(((Ship.statusTimespan.craching - this.elapsedTime) / Ship.statusTimespan.craching) * this.getDirection().length());
    }
    else if (status == Ship.statusEnum.landing && this.elapsedTime >= Ship.statusTimespan.landing) {
        this.setStatus(Ship.statusEnum.landed);
    }
    this.elapsedTime += timeLapse;
}

Ship.prototype.setStatus = function (status) {
    this.baseClass.setStatus.call(this, status);

    this.influencedByGravity = status == Ship.statusEnum.flying || status == Ship.statusEnum.accelerating;
    this.canCollide = this.influencedByGravity;
    this.elapsedTime = 0;
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
    if(this.getStatus() == Ship.statusEnum.craching) {
        this.renderCrache(context);
    }
    else {
        context.fillStyle = this.getGradient(context);
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.getRadius(), 0, Math2PI, true);
        context.fill();
        context.closePath();

        this.renderTail(context);
    }
}

Ship.prototype.renderCrache = function (context) {
    context.strokeStyle = "gray";
    context.beginPath();
    context.arc(this.position.x, this.position.y, Math.max(0, Ship.statusTimespan.craching - this.elapsedTime) * 2, 0, Math2PI, true);
    context.stroke();
    context.closePath();

    context.strokeStyle = "gray";
    context.beginPath();
    context.arc(this.position.x, this.position.y, Math.max(0, (Ship.statusTimespan.craching - this.elapsedTime)), 0, Math2PI, true);
    context.stroke();
    context.closePath();

    context.strokeStyle = "white";
    context.beginPath();
    context.arc(this.position.x, this.position.y, Math.max(0, (Ship.statusTimespan.craching - this.elapsedTime) * 2 / 3), 0, Math2PI, true);
    context.stroke();
    context.closePath();
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