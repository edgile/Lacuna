/**
 * Base class for Lacuna levels
 * @class
 */
LacunaLevel = function(config){
	var defaultConfig = { gameId: Constants.gameId };
	
    helpers.apply(defaultConfig, this);
    helpers.apply(config, this);
};

LacunaLevel.inheritsFrom(Level);

/**
 * Gets the launch platform from the list of spaceObjects
 * @returns {LaunchPlatform} LaunchPlatform if available otherwise null.
 */
Level.prototype.getLaunchPlatform = function() {
    if (!this.spaceObjects) return null;

    if(!this.launchPlatform){
	    for (var i = 0, numberOfObjects = this.spaceObjects.length; i < numberOfObjects; i++) {
	        if (this.spaceObjects[i] instanceof LaunchPlatform) {
	        	this.launchPlatform = this.spaceObjects[i];
	        }
	    }
    }
    return this.launchPlatform;
};


/**
 * Gets all ship objects from the list of spaceObjects
 * @function
 * @public
 * @returns {Ship[]} Array of Ship
 */
Level.prototype.getShips = function() {
    if (!this.spaceObjects) return null;

    var result = [];
    var spaceObjects = this.spaceObjects;
    for (var i = 0, numberOfObjects = spaceObjects.length; i < numberOfObjects; i++) {
        if (spaceObjects[i] instanceof Ship) {
        	result.push(spaceObjects[i]);
        }
    }
    return result;
};
