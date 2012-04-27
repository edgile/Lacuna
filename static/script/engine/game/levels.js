var Levels = {};

Levels.register = function (gameId, levelId, level) {
    if(!Levels[gameId]) {
    	Levels[gameId] = {};
    }
    
    Levels[gameId][levelId] = level;
};

Levels.getGameLevels = function (gameId) {
    return Levels[gameId];
};

Levels.load = function (config) {
    return new Levels[config.gameId][config.levelId](config);
};