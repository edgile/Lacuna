LacunaLevel = function(config){
	var defaultConfig = { gameId: Constants.gameId };
	
    helpers.apply(defaultConfig, this);
    helpers.apply(config, this);
};

LacunaLevel.inheritsFrom(Level);

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
