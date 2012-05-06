var Levels = {
    types: {}
};

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
    if (Levels[config.gameId][config.levelId] instanceof Function) {
        return new Levels[config.gameId][config.levelId](config);
    }
    else {
        var levelConfig = Levels[config.gameId][config.levelId].clone();
        helpers.apply(config, levelConfig);
        return new Levels.types[levelConfig.type](levelConfig);
    }
};