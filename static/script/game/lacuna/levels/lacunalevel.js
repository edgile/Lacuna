/**
 * Base class for Lacuna levels
 * @class
 */
function LacunaLevel(config) {
    this.gameId = Lacuna.gameId;
    this.score = new Score({ level: this });

    Level.call(this, config);
};

LacunaLevel.inheritsFrom(Level);

LacunaLevel.prototype.setStatus = function (status) {
    Level.call(this, status);
    if (status == Level.statusEnum.finished) {
        Lacuna.gameState.Persist();
    }
};

/**
 * Gets the launch platform from the list of spaceObjects
 * @returns {LaunchPlatform} LaunchPlatform if available otherwise null.
 */
LacunaLevel.prototype.getLaunchPlatform = function () {
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
LacunaLevel.prototype.getShips = function () {
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

Levels.types.lacunalevel = LacunaLevel;
