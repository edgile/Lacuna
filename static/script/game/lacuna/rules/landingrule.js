/**
 * Represents a rule to check if a ship passes a landing zone.
 * @class
 * @extends RuleBase
*/
function LandingRule(config) {
	RuleBase.call(this, config);
	
	if(!this.pointsForLanding) this.pointsForLanding = 500; 
}

LandingRule.inheritsFrom(RuleBase);

/**
 * Applies the rule to the spaceObjects
 * @param {spaceObjects} Array of spaceObjects
 * @param {timeLapse} Time that has passed since the last call.
 * @returns Array of spaceObjects
 */
LandingRule.prototype.apply = function (spaceObjects, timeLapse) {
    if (!spaceObjects) return;

    var landingZone = this.getLandingZone(spaceObjects);
    if (!landingZone) return;

    var newSpaceObjects = [];
    var allShips = this.getAllShips(spaceObjects);
    if (allShips && allShips.length > 0) {
        for (var i = 0, numberOfShips = allShips.length; i < numberOfShips; i++) {
            var ship = allShips[i];
            var shipStatus = ship.getStatus();

            if (shipStatus == Ship.statusEnum.landing) {
                this.steerShip(ship, landingZone.getPosition());
            } else if (shipStatus == Ship.statusEnum.accelerating || shipStatus == Ship.statusEnum.flying) {
            	var crossingPoint = this.crossingPoint(ship, landingZone);
                if (crossingPoint) {
                	newSpaceObjects = newSpaceObjects.concat(this.startLandingShip(ship, landingZone, crossingPoint));
                }
            }
        }
    }
    return newSpaceObjects;
};

LandingRule.prototype.startLandingShip = function (ship, landingZone, crossingPoint) {
    ship.setStatus(Ship.statusEnum.landing);
    this.level.score.shipLanded();

    var distanceFromOptimum = landingZone.getPosition().distanceTo(crossingPoint);
    var points = this.pointsForLanding + this.pointsForLanding * (landingZone.halfWidth - distanceFromOptimum) / landingZone.halfWidth;
    var text = Math.floor(points);
    if (distanceFromOptimum < 1) {
        this.engine.flow.gameState.totalPerfectLandings += 1;
        text = "Perfect landing " + text;
    }
    this.level.score.addPoints(points);

    return [new TextSpaceObject({ text: text, position: ship.getPosition().clone(), direction: ship.getDirection().clone().setLength(500) })];
};

LandingRule.prototype.steerShip = function (ship, targetPosition) {
    if (ship.getPosition().distanceTo(targetPosition) < 2) {
        ship.setPosition(targetPosition.clone());
        ship.setStatus(Ship.statusEnum.landed);
    } else {
        var directionToHome = new THREE.Vector2();
        directionToHome.copy(targetPosition);
        var brakePower = Math.max(ship.getVelocity() / 8, 100);
        directionToHome.subSelf(ship.getPosition()).setLength(brakePower);

        var newDirection = ship.getDirection().clone().addSelf(directionToHome).multiplyScalar(.95);
        ship.setDirection(newDirection);
    }
};

/**
 * Gets the crossing point of a ship over the landing zone.
 * @param {ship} ship to test for a crossing
 * @returns null if no crossing happened else coordinates of the crossing point
 */
LandingRule.prototype.crossingPoint = function (ship, landingZone) {
	var shipPosition = ship.position.clone();
	var negativeDiretion = ship.getDirection().clone().negate().setLength(10);
    var previousPosition = shipPosition.clone().addSelf(negativeDiretion);
    var flightPath = new LineSegment(ship.position.clone(), previousPosition);
    return landingZone.getLineSegment().intersectSelf(flightPath);
};

LandingRule.prototype.getLandingZone = function (spaceObjects) {
    if (!spaceObjects) return;

    for (var i = 0, numberOfObjects = spaceObjects.length; i < numberOfObjects; i++) {
        if (spaceObjects[i] instanceof LandingZone) return spaceObjects[i];
    }
};

LandingRule.prototype.getAllShips = function (spaceObjects) {
    if (!spaceObjects) return;

    var result = [];
    for (var i = 0, numberOfObjects = spaceObjects.length; i < numberOfObjects; i++) {
        var object = spaceObjects[i];
        if (object instanceof Ship) {
            result.push(object);
        }
    }
    return result;
};

Rules.register('landingrule', LandingRule);
