function LandingRule() {
}

LandingRule.inheritsFrom(RuleBase);

LandingRule.prototype.apply = function (spaceObjects, timeLapse) {
    if (!spaceObjects) return;

    var landingPlatform = this.getLandingZone(spaceObjects);
    if (!landingPlatform) return;

    var ships = this.getFlyingShips(spaceObjects);
    if (!ships || ships.length == 0) return;

    i = 1;
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
        if (spaceObjects[i] instanceof Ship && spaceObjects[i].getStatus() == Ship.statusEnum.flying) result.push(spaceObjects[i]);
    }
}
