function UpdateRule() {
}

UpdateRule.inheritsFrom(RuleBase);

UpdateRule.prototype.apply = function (spaceObjects, timeLapse) {
    for (var i = 0, numberOfObjects = spaceObjects.length; i < numberOfObjects; i++) {
        spaceObjects[i].update(timeLapse);
    }
}
