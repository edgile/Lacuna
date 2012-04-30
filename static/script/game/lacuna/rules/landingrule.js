/**
 * Represents a rule to check if a ship passes a landing zone.
 * @class
 * @extends RuleBase
*/
function LandingRule(config) {
	RuleBase.call(this, config);
}

LandingRule.inheritsFrom(RuleBase);

LandingRule.prototype.apply = function (spaceObjects, timeLapse) {
    if (!spaceObjects) return;

    var landingZone = this.getLandingZone(spaceObjects);
    if (!landingZone) return;

    var allShips = this.getAllShips(spaceObjects);
    if (allShips && allShips.length > 0) {
        for (var i = 0, numberOfShips = allShips.length; i < numberOfShips; i++) {
            var ship = allShips[i];
            var shipStatus = ship.getStatus();

            if (shipStatus == Ship.statusEnum.landing) {
                this.steerShip(ship, landingZone.getPosition());
            } else if (shipStatus == Ship.statusEnum.accelerating || shipStatus == Ship.statusEnum.flying) {
                if (this.crossedLandingZone(ship, landingZone)) {
                    ship.setStatus(Ship.statusEnum.landing);
                    this.level.score.shipLanded();
                    // TODO: Points dependent on landing location
    		    	this.level.score.addPoints(300);
                }
            }
        }
    }
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

LandingRule.prototype.crossedLandingZone = function (ship, landingZone) {
    var previousPosition = ship.getPreviousPosition();
    if (previousPosition) {
        var flightPath = new LineSegment(ship.position.clone(), previousPosition.clone());
        var intersectionPoint = LineSegment.intersect(landingZone.getLineSegment(), flightPath);
        if (intersectionPoint) {
            return true;
        }
    }
    return false;
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