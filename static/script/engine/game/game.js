/**
 * Game object
 * @class
 */
var Game = function (config) {
    helpers.apply(this, config);
};

Game.prototype.id = "identifier";
Game.prototype.name = "Name of the game";
Game.prototype.description = "Description of the game";

/**
 * Gets an array of all levels of the game
 * @function
 */
Game.prototype.getLevels = function () {
    return Levels.getGameLevels(this.id);
};

/**
 * Gets a specific level
 * @function
 */
Game.prototype.getLevel = function (levelId) {
    return Levels.getGameLevel(this.id, levelId);
};

Games = {};

Games.register = function (game) {
    Games[game.id] = game;
};