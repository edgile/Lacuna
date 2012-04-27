/**
 * Generic definition of a game level
 * @class
*/
var Level = function (config) {
    helpers.apply(config, this);
};

Level.prototype.id = null;
Level.prototype.gameId = null;
Level.prototype.name = "Level name";
Level.prototype.world = 0;
Level.prototype.level = 0;
Level.prototype.rules = [];
Level.prototype.spaceObjects = [];
Level.prototype.thumbnail = "";
Level.prototype.backgroundImage = "";

Level.prototype.addSpaceObject = function(object){
	this.spaceObjects.push(object);
}

Level.prototype.update = function (timeLapse) {
    this.removeFinishedObjects();

    var result = this.applyRules(timeLapse);
    if (result && result.length > 0) {
        this.spaceObjects = this.spaceObjects.concat(result);
    }
};

Level.prototype.applyRules = function (timeLapse) {
    if (!this.rules) return;

    var newObjects = [];
    for (var i = 0; i < this.rules.length; i++) {
        var result = this.rules[i].apply(this.spaceObjects, timeLapse);
        if (result && result.length > 0) {
            newObjects = newObjects.concat(result);
        }
    }
    return newObjects;
};

Level.prototype.removeFinishedObjects = function () {
    var newList = [];
    for (var i = 0, numberOfObjects = this.spaceObjects.length; i < numberOfObjects; i++) {
        if (!this.spaceObjects[i].isFinished()) {
            newList.push(this.spaceObjects[i]);
        }
    }
    this.spaceObjects = newList;
};
