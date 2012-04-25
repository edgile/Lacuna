﻿var Level = function (config) {
    helpers.apply(config, this);
};

Level.prototype.identifier = null;
Level.prototype.name = "Level name";
Level.prototype.world = 0;
Level.prototype.level = 0;
Level.prototype.space = null;
Level.prototype.thumbnail = "";
Level.prototype.backgroundImage = "";

Level.prototype.getLaunchPlatform = function () {
    if (!(this.space && this.space.spaceObjects)) return null;

    var spaceObjects = this.space.spaceObjects;
    for (var i = 0, numberOfObjects = spaceObjects.length; i < numberOfObjects; i++) {
        var object = spaceObjects[i];
        if (object instanceof LaunchPlatform) {
            return object;
        }
    }
    return null;
};

Level.prototype.reset = function () {
    helpers.apply(this.initialConfig.clone(), this);
};

Level.prototype.render = function (context2d) {

};