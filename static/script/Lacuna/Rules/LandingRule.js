function LandingRule() {
}

LandingRule.inheritsFrom(RuleBase);

LandingRule.prototype.apply = function (spaceObjects, timeLapse) {
    if (!spaceObjects) return;

    var landingPlatform = this.getLandingZone(spaceObjects);
    if (!landingPlatform) return;

    var ships = this.getFlyingShips(spaceObjects);
    if (!ships || ships.length == 0) return;

    for (var i = 0; i < ships.length; i++) {
        var ship = ships[i];
        var shipPreviousPosition = ship.getPreviousPosition();
        if (shipPreviousPosition) {
            var flightPath = new LineSegment(ship.position.clone(), shipPreviousPosition.clone());
            var intersectionPoint = LineSegment.intersect(landingPlatform.getLineSegment(), flightPath);
            if (intersectionPoint) {
                ship.setStatus(Ship.statusEnum.landing);
            }
        }
    }
}

LandingRule.prototype.getLandingZone = function (spaceObjects) {
    if (!spaceObjects) return;

    for (var i = 0, numberOfObjects = spaceObjects.length; i < numberOfObjects; i++) {
        if (spaceObjects[i] instanceof LandingZone) return spaceObjects[i];
    }
}

LandingRule.prototype.getFlyingShips = function (spaceObjects) {
    if (!spaceObjects) return;

    var result = [];
    for (var i = 0, numberOfObjects = spaceObjects.length; i < numberOfObjects; i++) {
        var object = spaceObjects[i];
        if (object instanceof Ship) {
            if (object.getStatus() == Ship.statusEnum.accelerating ||
                                    object.getStatus() == Ship.statusEnum.flying) {
                result.push(object);
            }
        }
    }
    return result;
}
