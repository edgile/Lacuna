function MotionRule() {
}

MotionRule.inheritsFrom(RuleBase);

MotionRule.prototype.apply = function (spaceObjects, timeLapse) {
    if (!spaceObjects) return;

    var timeInSeconds = timeLapse / 1000;

    for (var i = 0, numberOfObjects = spaceObjects.length; i < numberOfObjects; i++) {
        var movement = spaceObjects[i].direction.clone().multiplyScalar(timeInSeconds);

        spaceObjects[i].setPosition(spaceObjects[i].getPosition().addSelf(movement));
    }
}
