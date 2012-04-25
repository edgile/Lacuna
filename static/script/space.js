/// <reference path="spaceobjects/spaceobject.js">

var Space = function (config) {
    helpers.apply(config, this);

    var sp = new SpaceObject();
    sp.setPosition(

    if (!this.spaceObjects) this.spaceObjects = [];
    if (!this.rules) this.rules = Space.getDefaultRules();
}

Space.getDefaultRules = function () {
    return [new UpdateRule(),
                new GravitationRule(),
                new MotionRule(),
                new CollisionRule(),
                new LandingRule()];
};

Space.prototype.addSpaceObject = function (spaceObject) {
    this.spaceObjects.push(spaceObject);
}

Space.prototype.setRules = function(rules) {
    this.rules = rules;
}

Space.prototype.update = function (timeLapse) {
    this.removeFinishedObjects();

    var result = this.applyRules(timeLapse);
    if (result && result.length > 0) {
        this.spaceObjects = this.spaceObjects.concat(result);
    }
}

Space.prototype.applyRules = function (timeLapse) {
    if (!this.rules) return;

    var newObjects = [];
    for (var i = 0; i < this.rules.length; i++) {
        var result = this.rules[i].apply(this.spaceObjects, timeLapse);
        if (result && result.length > 0) {
            newObjects = newObjects.concat(result);
        }
    }
    return newObjects;
}

Space.prototype.removeFinishedObjects = function () {
    var newList = [];
    for (var i = 0, numberOfObjects = this.spaceObjects.length; i < numberOfObjects; i++) {
        if (!this.spaceObjects[i].isFinished()) {
            newList.push(this.spaceObjects[i]);
        }
    }
    this.spaceObjects = newList;
}

Space.prototype.render = function (context) {
    for (var i = 0, numberOfObjects = this.spaceObjects.length; i < numberOfObjects; i++) {
        this.spaceObjects[i].render(context);
    }
}