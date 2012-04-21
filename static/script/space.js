var Space = function (rules) {
    this.spaceObjects = [];
    this.rules = rules;
}

Space.prototype.addSpaceObject = function (spaceObject) {
    this.spaceObjects.push(spaceObject);
}

Space.prototype.setRules = function(rules) {
    this.rules = rules;
}

Space.prototype.update = function (timeLapse) {
    this.removeFinishedObjects();
    this.applyRules(timeLapse);
}

Space.prototype.applyRules = function (timeLapse) {
    if(!this.rules) return;

    for(var i = 0; i < this.rules.length; i++){
        this.rules[i].apply(this.spaceObjects, timeLapse);
    }
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
