var Space = function () {
    this.spaceObjects = [];
}

Space.prototype.addSpaceObject = function (spaceObject) {
    this.spaceObjects.push(spaceObject);
}

Space.prototype.addShip = function (position, direction) {
    var s = new Ship();
    s.setPosition(position);
    s.setDirection(direction);

    this.spaceObjects.push(s);
}

Space.prototype.update = function (timeLapse) {
    this.updateSpaceObjects(timeLapse);
    this.removeFinishedObjects();
    this.handleCollisions();
    this.calculateNewPositions(timeLapse);
}

Space.prototype.updateSpaceObjects = function (timeLapse) {
    for (var i = 0, numberOfObjects = this.spaceObjects.length; i < numberOfObjects; i++) {
        this.spaceObjects[i].update(timeLapse);
    }
}

Space.prototype.removeFinishedObjects = function () {
    var newList = [];
    for (var i = 0, numberOfObjects = this.spaceObjects.length; i < numberOfObjects; i++) {
        if (!this.spaceObjects[i].isFinished()) {
            newList.push(this.spaceObjects[i]);
        }
    }
    this.spaceObjects = newList;
}

Space.prototype.calculateNewPositions = function (timeLapse) {
    this.applyGavitationalForce();

    for (var i = 0, numberOfBodies = this.spaceObjects.length; i < numberOfBodies; i++) {
        this.moveToNewPosition(this.spaceObjects[i], timeLapse);
    }
}

Space.prototype.moveToNewPosition = function (body, timeLapse) {
    var timeInSeconds = timeLapse / 1000;

    var movement = body.direction.clone().multiplyScalar(timeInSeconds);
    body.setPosition(body.getPosition().addSelf(movement));
}

Space.prototype.applyGavitationalForce = function () {
    for (var i = 0, numberOfBodies = this.spaceObjects.length; i < numberOfBodies; i++) {
        var targetBody = this.spaceObjects[i];
        for (var j = i + 1; j < numberOfBodies; j++) {
            var sourceBody = this.spaceObjects[j];
            var force = targetBody.getGravitationalForce(sourceBody);
            var angleOfForce = targetBody.getAngle(sourceBody);
            var totalWeight = targetBody.mass + sourceBody.mass;

            if (targetBody.influencedByGravity) {
                var forceMassRatio = force * targetBody.mass / totalWeight;
                var delta = angleOfForce.clone().multiplyScalar(forceMassRatio);
                var newDirection = targetBody.direction.clone().addSelf(delta);

                targetBody.setDirection(newDirection);
            }

            // Force also works in the opposite direction ...
            if (sourceBody.influencedByGravity) {
                forceMassRatio = force * sourceBody.mass / totalWeight;
                delta = angleOfForce.clone().negate().multiplyScalar(forceMassRatio);
                newDirection = sourceBody.direction.clone().addSelf(delta);

                sourceBody.setDirection(newDirection);
            }
        }
    }
}

Space.prototype.handleCollisions = function () {
    var newObjects = [];
    for (var i = 0; i < this.spaceObjects.length; i++) {
        for (var j = i + 1; j < this.spaceObjects.length; j++) {
            var cd = new CollisionHandler(this.spaceObjects[i], this.spaceObjects[j]);
            var result = cd.handle();
            if (result) {
                newObjects.push(result);
            }
        }
    }
    this.spaceObjects = this.spaceObjects.concat(newObjects);
}

Space.prototype.render = function (context2d) {
    for (var i = 0; i < this.spaceObjects.length; i++) {
        this.renderSpaceObject(context2d, this.spaceObjects[i]);
    }
}

Space.prototype.renderSpaceObject = function (context2d, body) {
    body.render(context2d);
}