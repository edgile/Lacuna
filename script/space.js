﻿var Space = Class.extend({
    spaceObjects: null,

    init: function () {
        this.spaceObjects = [];
    },

    addSpaceObject: function (spaceObject) {
        this.spaceObjects.push(spaceObject);
    },

    addShip: function (position, direction) {
        var s = new Ship();
        s.setPosition(position);
        s.setDirection(direction);

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

        var newPosition = new THREE.Vector2(body.position.x, body.position.y);
        var movement = body.direction.clone().multiplyScalar(timeInSeconds);
        newPosition.addSelf(movement);

        body.setPosition(newPosition);
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

        result.setMass(body1.mass + body2.mass);
        result.setDirection(this.getDirectionAfterCollission(body1, body2));

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