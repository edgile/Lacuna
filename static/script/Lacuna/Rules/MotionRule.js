function MotionRule() {
}

MotionRule.inheritsFrom(RuleBase);

MotionRule.prototype.apply = function (spaceObjects, timeLapse) {
    if (!spaceObjects) return;

    var timeInSeconds = timeLapse / 1000;

    for (var i = 0, numberOfObjects = spaceObjects.length; i < numberOfObjects; i++) {
        var object = spaceObjects[i];
        if (!object.static) {
            var movement = object.direction.clone().multiplyScalar(timeInSeconds);
            spaceObjects[i].setPosition(object.getPosition().addSelf(movement));
        }
    }
}
