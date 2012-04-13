var Space = Class.extend({
    init: function () {
        this.bodies = [];
        this.launchPlatform = new LaunchPlatform(new THREE.Vector2(canvasWidth / 2, canvasHeight - 50));
    },

    generateBodies: function (planetCount, starCount) {
        for (var i = 0; i < planetCount; i++) {
            var b = generateRandomPlanet();
            this.bodies.push(b);
        }

        for (var i = 0; i < starCount; i++) {
            var s = generateRandomStar();
            this.bodies.push(s);
        }
        this.mergeCollisions();
    },

    addShip: function (position, direction) {
        var s = new Ship();
        s.position = position;
        s.direction = direction;

        this.bodies.push(s);
    },

    calculateNewPositions: function (timeLapse) {
        this.mergeCollisions();
        this.applyGavitationalForce();

        for (var i = 0, numberOfBodies = this.bodies.length; i < numberOfBodies; i++) {
            this.moveToNewPosition(this.bodies[i], timeLapse);
        }
    },

    moveToNewPosition: function (body, timeLapse) {
        var timeInSeconds = timeLapse / 1000;

        body.position.x += body.direction.x * timeInSeconds;
        body.position.y += body.direction.y * timeInSeconds;
    },

    applyGavitationalForce: function () {
        for (var i = 0, numberOfBodies = this.bodies.length; i < numberOfBodies; i++) {
            var targetBody = this.bodies[i];
            for (var j = i + 1; j < numberOfBodies; j++) {
                var sourceBody = this.bodies[j];
                var force = targetBody.getGravitationalForce(sourceBody);
                var angleOfForce = targetBody.getAngle(sourceBody);

                if (targetBody.influencedByGravity) {
                    var forceMassRatio = force / targetBody.mass;
                    var x = targetBody.direction.x + forceMassRatio * angleOfForce.x;
                    var y = targetBody.direction.y + forceMassRatio * angleOfForce.y;

                    targetBody.direction = { x: x, y: y };
                }

                // Force also works in the oposite direction ...
                if (sourceBody.influencedByGravity) {
                    angleOfForce.x *= -1, angleOfForce.y *= -1, angleOfForce.z *= -1;

                    forceMassRatio = force / sourceBody.mass;
                    x = sourceBody.direction.x + forceMassRatio * angleOfForce.x;
                    y = sourceBody.direction.y + forceMassRatio * angleOfForce.y;

                    sourceBody.direction = { x: x, y: y };
                }
            }
        }
    },

    mergeCollisions: function () {
        for (var i = 0; i < this.bodies.length; i++) {
            var bodyUnderTest = this.bodies[i];
            for (var j = i + 1; j < this.bodies.length; j++) {
                if (bodyUnderTest.collide(this.bodies[j])) {
                    this.bodies[j] = this.mergeBodies(bodyUnderTest, this.bodies[j]);
                    this.bodies.pop();
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
        var x = body1.direction.x + body2.direction.x;
        var y = body1.direction.y + body2.direction.y;

        return { x: x, y: y };
    },

    draw: function (context2d) {
        if (this.launchPlatform) this.launchPlatform.draw(context2d);
        for (var i = 0; i < space.bodies.length; i++) {
            this.drawSpaceObject(context2d, space.bodies[i]);
        }
    },

    drawSpaceObject: function (context2d, body) {
        body.draw(context2d);
    }
});