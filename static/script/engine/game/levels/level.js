/**
 * Generic definition for a game level
 * @class
*/
var Level = function (config) {
    this.id = null;
    this.gameId = null;
    this.title = "Level name";
    this.world = 0;
    this.level = 0;
    this.thumbnail = "";
    this.backgroundImage = "";
    this.status = Level.statusEnum.playing;
    this.rules = [];
    this.spaceObjects = [];

    helpers.apply(config, this);

    for (var i = 0; i < this.rules.length; i++) {
        helpers.apply({ engine: this.engine, level: this }, this.rules[i]);
        this.rules[i] = Rules.createInstance(this.rules[i]);
    }

    for (var i = 0; i < this.spaceObjects.length; i++) {
        helpers.apply({ engine: this.engine, level: this }, this.spaceObjects[i]);
        this.spaceObjects[i] = new SpaceObjects[this.spaceObjects[i].type](this.spaceObjects[i]);
    }
};

Level.statusEnum = {finished: 0, paused: 1, playing: 2};

Level.prototype.addSpaceObject = function(object){
	this.spaceObjects.push(object);
};

Level.prototype.update = function (timeLapse) {
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

/**
 * Checks if default values are provided in the config
 * @function
 * @protected
 */
Level.prototype.getRuleConfig = function(config){
	config = config  || {};
	
	if(!config.level){
		config.level = this;
	}
	return config;
};

