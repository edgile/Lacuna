var Space = Class.extend({
    init: function () {
        this.spaceObjects = [];
    },

    generateSpaceObjects: function (planetCount, starCount) {
        for (var i = 0; i < planetCount; i++) {
            var b = generateRandomPlanet();
            this.spaceObjects.push(b);
        }

        for (var i = 0; i < starCount; i++) {
            var s = generateRandomStar();
            this.spaceObjects.push(s);
        }
        this.mergeCollisions();
    },

    addShip: function (position, direction) {
        var s = new Ship();
        s.position = position;
        s.direction = direction;

        this.spaceObjects.push(s);
    },

    calculateNewPositions: function (timeLapse) {
        this.mergeCollisions();
        this.applyGavitationalForce();

        for (var i = 0, numberOfBodies = this.spaceObjects.length; i < numberOfBodies; i++) {
            this.moveToNewPosition(this.spaceObjects[i], timeLapse);
        }
    },

    moveToNewPosition: function (body, timeLapse) {
        var timeInSeconds = timeLapse / 1000;

        body.position.addSelf(body.direction.clone().multiplyScalar(timeInSeconds));
    },

    applyGavitationalForce: function () {
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

                    targetBody.direction = newDirection;
                }

                // Force also works in the oposite direction ...
                if (sourceBody.influencedByGravity) {
                    forceMassRatio = force * sourceBody.mass / totalWeight;
                    delta = angleOfForce.clone().negate().multiplyScalar(forceMassRatio);
                    newDirection = sourceBody.direction.clone().addSelf(delta);

                    sourceBody.direction = newDirection;
                }
            }
        }
    },

    mergeCollisions: function () {
        for (var i = 0; i < this.spaceObjects.length; i++) {
            var bodyUnderTest = this.spaceObjects[i];
            for (var j = i + 1; j < this.spaceObjects.length; j++) {
                if (bodyUnderTest.collide(this.spaceObjects[j])) {
                    this.spaceObjects[i] = this.mergeBodies(bodyUnderTest, this.spaceObjects[j]);
                    this.spaceObjects.splice(j, 1);
                    break;
                }
            }
        }
    },

    mergeBodies: function (body1, body2) {
        var result = body1.mass > body2.mass ? body1.clone() : body2.clone();

        result.mass = body1.mass + body2.mass;
        result.direction = this.getDirectionAfterCollission(body1, body2);

        return result;
    },

    getDirectionAfterCollission: function (body1, body2) {
        var result = new THREE.Vector2();
        var totalMass = body1.mass + body2.mass;

        result.add(body1.direction.clone().multiplyScalar(body1.mass / totalMass), body2.direction.clone().multiplyScalar(body2.mass / totalMass));

        return result;
    },

    draw: function (context2d) {
        for (var i = 0; i < this.spaceObjects.length; i++) {
            this.drawSpaceObject(context2d, this.spaceObjects[i]);
        }
    },

    drawSpaceObject: function (context2d, body) {
        body.draw(context2d);
    }
});