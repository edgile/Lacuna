var gravitationalConstant = .01;

function GravitationRule() {
}

GravitationRule.inheritsFrom(RuleBase);

GravitationRule.prototype.apply = function (spaceObjects, timeLapse) {
    if (!spaceObjects) return;

    for (var i = 0, numberOfBodies = spaceObjects.length; i < numberOfBodies; i++) {
        var targetBody = spaceObjects[i];
        if (targetBody.influencesGravitationalField) {
            for (var j = i + 1; j < numberOfBodies; j++) {
                var sourceBody = spaceObjects[j];
                var force = this.getGravitationalForce(targetBody, sourceBody);
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
}

GravitationRule.prototype.getGravitationalForce = function (object1, object2) {
    return gravitationalConstant * object1.mass * object2.mass * this.getDistanceGravitationFactor(object1.getDistance(object2));
}

/* Default but less steep than nature! */
GravitationRule.prototype.getDistanceGravitationFactor = function (distance) {
    return 1 / Math.pow(distance, 1.5);
}

/* Experiment to have gravitational force folow a gaussian curve */
GravitationRule.prototype.getDistanceGravitationFactor1 = function (distance) {
    var deviation = 25;
    var mean = 0;

    var factor1 = 1 / deviation * Math.sqrt(Math2PI);
    var factor2 = Math.pow(Math.E, (-1 / 2) * Math.pow((distance - mean) / deviation, 2));

    return factor1 * factor2;
}